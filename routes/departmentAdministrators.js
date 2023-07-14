// routes/departmentAdministrator.js

const express = require('express');
const router = express.Router();
const DepartmentAdministrators = require('../models/DepartmentAdministrator');

// Get all department administrators
router.get('/', async (req, res) => {
    try {
        const administrators = await DepartmentAdministrators.findAll();
        res.json(administrators);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving department administrators' });
    }
});

// Get a single department administrator by ID
router.get('/:id', async (req, res) => {
    try {
        const administrator = await DepartmentAdministrators.findByPk(req.params.id);
        if (!administrator) {
            return res.status(404).json({ message: 'Department administrator not found' });
        }
        res.json(administrator);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving department administrator' });
    }
});

// Create a new department administrator
router.post('/', async (req, res) => {
    try {
        const administrator = await DepartmentAdministrators.create(req.body);
        res.status(201).json(administrator);
    } catch (error) {
        res.status(500).json({ message: 'Error creating department administrator' });
    }
});

// Update a department administrator
router.put('/:id', async (req, res) => {
    try {
        const administrator = await DepartmentAdministrators.findByPk(req.params.id);
        if (!administrator) {
            return res.status(404).json({ message: 'Department administrator not found' });
        }
        await administrator.update(req.body);
        res.json(administrator);
    } catch (error) {
        res.status(500).json({ message: 'Error updating department administrator' });
    }
});

// Delete a department administrator
router.delete('/:id', async (req, res) => {
    try {
        const administrator = await DepartmentAdministrators.findByPk(req.params.id);
        if (!administrator) {
            return res.status(404).json({ message: 'Department administrator not found' });
        }
        await administrator.destroy();
        res.json({ message: 'Department administrator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting department administrator' });
    }
});

module.exports = router;
