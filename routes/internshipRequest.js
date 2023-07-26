// routes/internshipRequest.js
const express = require('express');
const router = express.Router();
const InternshipRequest = require('../models/InternshipRequest');
const Request = require('../models/Request');

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
       // console.log(internshipRequest)

        const dummyRequest = {
            id:internshipRequest.id,
            requestType: 'INTERNSHIP',
            requestId: internshipRequest.id,
            date: new Date().toLocaleDateString('en-GB'),
            paymentStatus: 'NOT-PAID',
            status: 'PENDING',
            studentId: internshipRequest.studentId,
        };

        const createdRequest = await Request.create(dummyRequest);

        console.log(createdRequest)

        res.status(200).json({message: 'Form submitted successfully!', createdRequest});

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
