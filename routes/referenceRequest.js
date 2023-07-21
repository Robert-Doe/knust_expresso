// routes/referenceRequest.js
const express = require('express');
const router = express.Router();
const ReferenceRequest = require('../models/ReferenceRequest');
const Request = require('../models/Request');
const multer = require('multer'); // Middleware for handling file uploads
const fs = require('fs');
const path = require('path');

const uploadDirectory = 'uploads/reference';

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    }, filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

router.get('/lecturer-reference/:lecturerId', async (req, res) => {

    const lecturerId = req.params.lecturerId

    // Find all reference requests associated with the lecturer's ID
    const referenceRequests = await ReferenceRequest.findAll({
        where: {lecturerId: lecturerId},
    })
    res.json(referenceRequests)
})


const upload = multer({storage});

// POST request to create a new reference request
router.post('/', upload.fields([{name: 'cvFile'}, {name: 'transcriptFile'}]), async (req, res) => {
    try {
        // Extract form data from request body
        const {
            studentId, departmentId, lecturerId, schoolName, schoolAddress, purpose, schoolEmail,
        } = req.body;

        const transcriptUrl = req.files['transcriptFile'][0] ? `https://knustexpresso.codeden.org/${uploadDirectory}${req.files['transcriptFile'][0].filename}` : ''
        const resumeUrl = req.files['transcriptFile'][0] ? `https://knustexpresso.codeden.org/${uploadDirectory}${req.files['cvFile'][0].filename}` : ''

        // Create a new ReferenceRequest object with the extracted form data
        const referenceRequest = new ReferenceRequest({
            studentId,
            departmentId,
            lecturerId,
            schoolName,
            schoolAddress,
            purpose,
            schoolEmail,
            transcriptUrl,
            resumeUrl
        });

        // Save the referenceRequest to the database
        const request = await referenceRequest.save();
        const dummyRequest = {
            id:request.id,
            requestType: 'REFERENCE',
            requestId: request.id,
            date: new Date().toLocaleDateString('en-GB'),
            paymentStatus: 'NOT-PAID',
            status: 'PENDING',
            studentId: studentId,
        };

        const createdRequest = await Request.create(dummyRequest);

        res.status(200).json({message: 'Form submitted successfully!', createdRequest});
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({message: 'Form submission failed!'});
    }
});


// Get all reference requests
router.get('/', async (req, res) => {
    try {
        const referenceRequests = await ReferenceRequest.findAll();
        res.json(referenceRequests);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Get a reference request by ID
router.get('/:id', async (req, res) => {
    try {
        const referenceRequest = await ReferenceRequest.findByPk(req.params.id);
        if (referenceRequest) {
            res.json(referenceRequest);
        } else {
            res.status(404).json({message: 'Reference request not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Update a reference request
router.put('/:id', async (req, res) => {
    try {
        const referenceRequest = await ReferenceRequest.findByPk(req.params.id);
        if (referenceRequest) {
            await referenceRequest.update(req.body);
            res.json(referenceRequest);
        } else {
            res.status(404).json({message: 'Reference request not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// Delete a reference request
router.delete('/:id', async (req, res) => {
    try {
        const referenceRequest = await ReferenceRequest.findByPk(req.params.id);
        if (referenceRequest) {
            await referenceRequest.destroy();
            res.json({message: 'Reference request deleted'});
        } else {
            res.status(404).json({message: 'Reference request not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;


