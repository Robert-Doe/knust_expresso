// routes/remittance.js

const express = require('express');
const router = express.Router();
const Remittance = require('../models/Remittance');

// Get all remittances
router.get('/', async (req, res) => {
    try {
        const remittances = await Remittance.findAll();
        res.json(remittances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new remittance
router.post('/', async (req, res) => {
    try {
        const remittance = await Remittance.create(req.body);
        res.status(201).json(remittance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a remittance by ID
router.get('/:id', async (req, res) => {
    try {
        const remittance = await Remittance.findByPk(req.params.id);
        if (remittance) {
            res.json(remittance);
        } else {
            res.status(404).json({ message: 'Remittance not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a remittance
router.put('/:id', async (req, res) => {
    try {
        const remittance = await Remittance.findByPk(req.params.id);
        if (remittance) {
            await remittance.update(req.body);
            res.json(remittance);
        } else {
            res.status(404).json({ message: 'Remittance not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a remittance
router.delete('/:id', async (req, res) => {
    try {
        const remittance = await Remittance.findByPk(req.params.id);
        if (remittance) {
            await remittance.destroy();
            res.json({ message: 'Remittance deleted' });
        } else {
            res.status(404).json({ message: 'Remittance not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
