// routes/internshipRequest.js

const express = require('express');
const router = express.Router();
const InternshipRequest = require('../models/InternshipRequest');

// Get all internship requests
router.get('/', async (req, res) => {
    try {
        const internshipRequests = await InternshipRequest.findAll();
        res.json(internshipRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new internship request
router.post('/', async (req, res) => {
    try {
        const internshipRequest = await InternshipRequest.create(req.body);
        res.status(201).json(internshipRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get an internship request by ID
router.get('/:id', async (req, res) => {
    try {
        const internshipRequest = await InternshipRequest.findByPk(req.params.id);
        if (internshipRequest) {
            res.json(internshipRequest);
        } else {
            res.status(404).json({ message: 'Internship request not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an internship request
router.put('/:id', async (req, res) => {
    try {
        const internshipRequest = await InternshipRequest.findByPk(req.params.id);
        if (internshipRequest) {
            await internshipRequest.update(req.body);
            res.json(internshipRequest);
        } else {
            res.status(404).json({ message: 'Internship request not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an internship request
router.delete('/:id', async (req, res) => {
    try {
        const internshipRequest = await InternshipRequest.findByPk(req.params.id);
        if (internshipRequest) {
            await internshipRequest.destroy();
            res.json({ message: 'Internship request deleted' });
        } else {
            res.status(404).json({ message: 'Internship request not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
