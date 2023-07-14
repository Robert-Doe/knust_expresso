// routes/proficiencyOfficeAdministrator.js

const express = require('express');
const router = express.Router();
const ProficiencyOfficeAdministrator = require('../models/ProficiencyOfficeAdministrator');

// Get all proficiency office administrators
router.get('/', async (req, res) => {
    try {
        const administrators = await ProficiencyOfficeAdministrator.findAll();
        res.json(administrators);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving proficiency office administrators' });
    }
});

// Get a single proficiency office administrator by ID
router.get('/:id', async (req, res) => {
    try {
        const administrator = await ProficiencyOfficeAdministrator.findByPk(req.params.id);
        if (!administrator) {
            return res.status(404).json({ message: 'Proficiency office administrator not found' });
        }
        res.json(administrator);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving proficiency office administrator' });
    }
});

// Create a new proficiency office administrator
router.post('/', async (req, res) => {
    try {
        const administrator = await ProficiencyOfficeAdministrator.create(req.body);
        res.status(201).json(administrator);
    } catch (error) {
        res.status(500).json({ message: 'Error creating proficiency office administrator' });
    }
});

// Update a proficiency office administrator
router.put('/:id', async (req, res) => {
    try {
        const administrator = await ProficiencyOfficeAdministrator.findByPk(req.params.id);
        if (!administrator) {
            return res.status(404).json({ message: 'Proficiency office administrator not found' });
        }
        await administrator.update(req.body);
        res.json(administrator);
    } catch (error) {
        res.status(500).json({ message: 'Error updating proficiency office administrator' });
    }
});

// Delete a proficiency office administrator
router.delete('/:id', async (req, res) => {
    try {
        const administrator = await ProficiencyOfficeAdministrator.findByPk(req.params.id);
        if (!administrator) {
            return res.status(404).json({ message: 'Proficiency office administrator not found' });
        }
        await administrator.destroy();
        res.json({ message: 'Proficiency office administrator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting proficiency office administrator' });
    }
});

module.exports = router;
