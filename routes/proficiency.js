// routes/Proficiency.js

const express = require('express');
const router = express.Router();
const Proficiency = require('../models/Proficiency');
const LecturerAuth = require("../models/LecturerAuth");
const jwt = require("jsonwebtoken");
const ProficiencyAuth = require("../models/ProficiencyAuth");

const secretKey = process.env.PROFICIENCY_ACCESS_TOKEN_SECRET;

function generateToken(proficiency) {
    const payload = {id: proficiency.departmentId, role: 'proficiency'};
    const options = {expiresIn: '300d'};
    return jwt.sign(payload, secretKey, options);
}

router.post('/login',async (req,res)=>{
    const {passKey,proficiencyId}=req.body;

    console.log(passKey,proficiencyId)
    const proficiencyAuth=await ProficiencyAuth.findByPk(proficiencyId)

    if(!proficiencyAuth){
        console.log("Account Invalid")
        res.json({msg:"Account does not exist"})
    }else{
        if(passKey===proficiencyAuth.password){
            console.log("Account Valid")
            const token=generateToken({id:proficiencyAuth.proficiencyId})
            res.json({msg:"Login Successful", token})
        }else{
            res.json({msg:"Login failed: Password Incorrect"})
        }
    }

})

router.post('/proficiency-auths',async (req, res) => {
    const proficiencyAuth = await ProficiencyAuth.bulkCreate(req.body.auths)
    res.json(proficiencyAuth)
})

// Get all proficiency office auths
router.get('/', async (req, res) => {
    try {
        const auths = await Proficiency.findAll();
        res.json(auths);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving proficiency office auths' });
    }
});

// Get a single proficiency office auth by ID
router.get('/:id', async (req, res) => {
    try {
        const auth = await Proficiency.findByPk(req.params.id);
        if (!auth) {
            return res.status(404).json({ message: 'Proficiency office auth not found' });
        }
        res.json(auth);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving proficiency office auth' });
    }
});

// Create a new proficiency office auth
router.post('/', async (req, res) => {
    try {
        const auth = await Proficiency.create(req.body);
        res.status(201).json(auth);
    } catch (error) {
        res.status(500).json({ message: 'Error creating proficiency office auth' });
    }
});

// Update a proficiency office auth
router.put('/:id', async (req, res) => {
    try {
        const auth = await Proficiency.findByPk(req.params.id);
        if (!auth) {
            return res.status(404).json({ message: 'Proficiency office auth not found' });
        }
        await auth.update(req.body);
        res.json(auth);
    } catch (error) {
        res.status(500).json({ message: 'Error updating proficiency office auth' });
    }
});

// Delete a proficiency office auth
router.delete('/:id', async (req, res) => {
    try {
        const auth = await Proficiency.findByPk(req.params.id);
        if (!auth) {
            return res.status(404).json({ message: 'Proficiency office auth not found' });
        }
        await auth.destroy();
        res.json({ message: 'Proficiency office auth deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting proficiency office auth' });
    }
});

module.exports = router;
