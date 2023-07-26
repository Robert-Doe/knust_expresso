// routes/lecturer.js

const express = require('express');
const router = express.Router();
const Lecturer = require('../models/Lecturer');
const LecturerAuth = require('../models/LecturerAuth');
const jwt = require("jsonwebtoken");
const DepartmentAuth = require("../models/DepartmentAuth");



const secretKey = process.env.LECTURER_ACCESS_TOKEN_SECRET;

function generateToken(lecturer) {
    const payload = {id: lecturer.id, role: 'lecturer'};
    const options = {expiresIn: '300d'};
    return jwt.sign(payload, secretKey, options);
}

// Define the route for pushing JSON data to the database
router.get('/push', async (req, res) => {
    try {
        const lecturers = require('../config/lecturers');

        await Lecturer.bulkCreate(lecturers)

        res.send('Data successfully pushed to the database.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error pushing data to the database.');
    }
});


router.post('/lecturer-auths',async (req, res) => {

    const lecturerAuths = await LecturerAuth.bulkCreate(req.body.auths)
    res.json(lecturerAuths)

})


router.post('/login',async (req,res)=>{
    const {passKey,staffId}=req.body
    const lecturerAuth=await LecturerAuth.findByPk(staffId)

    if(!lecturerAuth){
        res.json({msg:"Account does not exist"})
    }else{
        if(passKey===lecturerAuth.password){
            const lecturer= await Lecturer.findByPk(staffId)
            const token=generateToken({id:lecturerAuth.staffId})
            res.json({msg:"Login Successful", token,lecturer})
        }else{
            res.json({msg:"Login failed: Password Incorrect"})
        }
    }

})


// Get all lecturers
router.get('/', async (req, res) => {
    try {
        const lecturers = await Lecturer.findAll();
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lecturers' });
    }
});

// Get a single lecturer by ID
router.get('/:id', async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        res.json(lecturer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lecturer' });
    }
});

// Create a new lecturer
router.post('/', async (req, res) => {
    try {
        const lecturer = await Lecturer.create(req.body);
        res.status(201).json(lecturer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating lecturer' });
    }
});

// Update a lecturer
router.put('/:id', async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        await lecturer.update(req.body);
        res.json(lecturer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lecturer' });
    }
});

// Delete a lecturer
router.delete('/:id', async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        await lecturer.destroy();
        res.json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lecturer' });
    }
});

module.exports = router;
