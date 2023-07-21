// routes/request.js

const express = require('express');
const router = express.Router();
const Request = require('../models/Request');
const ReferenceRequest = require('../models/ReferenceRequest');





// Get all requests
router.get('/', async (req, res) => {
    try {
        const requests = await Request.findAll();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new request
router.post('/', async (req, res) => {
    try {
        const request = await Request.create(req.body);
        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a request by ID
router.get('/:id', async (req, res) => {
    try {
        const request = await Request.findByPk(req.params.id);
        if (request) {
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a request
router.put('/:id', async (req, res) => {
    try {
        const request = await Request.findByPk(req.params.id);
        if (request) {
            await request.update(req.body);
            res.json(request);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a request
router.delete('/:id', async (req, res) => {
    try {
        const request = await Request.findByPk(req.params.id);
        if (request) {
            await request.destroy();
            res.json({ message: 'Request deleted' });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
