const express = require('express');
const multer = require('multer'); // Middleware for handling file uploads
const fs = require('fs');
const path = require('path');
const router = express.Router();
const ProficiencyRequest = require('../models/ProficiencyRequest');
const Request = require('../models/Request');

const uploadDirectory = 'uploads/proficiency';

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, 'transcript-' + uniqueSuffix + ext);
    },
});

const upload = multer({ storage });

// Get all proficiency requests
router.get('/', async (req, res) => {
    try {
        const orderOption = [
            ['createdAt', 'DESC'], // For example, columnName = 'createdAt' and sortOrder = 'DESC'
        ];
        const proficiencyRequests = await ProficiencyRequest.findAll({order:orderOption});
        res.status(200).json(proficiencyRequests);
    } catch (error) {
        console.error('Error fetching proficiency requests:', error);
        res.status(500).json({ message: 'Error fetching proficiency requests!' });
    }
});

// Get a specific proficiency request by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const proficiencyRequest = await ProficiencyRequest.findByPk(id);
        if (!proficiencyRequest) {
            return res.status(404).json({ message: 'Proficiency request not found!' });
        }
        res.status(200).json(proficiencyRequest);
    } catch (error) {
        console.error('Error fetching proficiency request:', error);
        res.status(500).json({ message: 'Error fetching proficiency request!' });
    }
});

// Create a new proficiency request
router.post('/', upload.single('transcript'), async (req, res) => {
    try {
        // Extract studentId from request body
        const { studentId } = req.body;

        // Generate the transcript URL based on the uploaded file
        const transcriptUrl = req.file ? req.file.filename : null;

        // Create a new ProficiencyRequest object with the extracted data
        const proficiencyRequest = new ProficiencyRequest({
            studentId,
            transcriptUrl: `https://knustexpresso.codeden.org/${uploadDirectory}/${transcriptUrl}`,
        });

        // Save the proficiencyRequest to the database
     const request=   await proficiencyRequest.save();


        const dummyRequest = {
            id:request.id,
            requestType: 'PROFICIENCY',
            requestId: request.id,
            date: new Date().toLocaleDateString('en-GB'),
            paymentStatus: 'NOT-PAID',
            status: 'PENDING',
            studentId: studentId,
        };

        const createdRequest = await Request.create(dummyRequest);

        res.status(200).json({message: 'Form submitted successfully!', createdRequest});

    } catch (error) {
        console.error('Error uploading transcript:', error);
        res.status(500).json({ message: 'Transcript upload failed!' });
    }
});

// Update an existing proficiency request
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const proficiencyRequest = await ProficiencyRequest.findByPk(id);
        if (!proficiencyRequest) {
            return res.status(404).json({ message: 'Proficiency request not found!' });
        }

        // Update the proficiencyRequest with the request body data
        proficiencyRequest.studentId = req.body.studentId || proficiencyRequest.studentId;
        proficiencyRequest.transcriptUrl = req.body.transcriptUrl || proficiencyRequest.transcriptUrl;

        // Save the updated proficiencyRequest to the database
        await proficiencyRequest.save();

        res.status(200).json({ message: 'Proficiency request updated successfully!' });
    } catch (error) {
        console.error('Error updating proficiency request:', error);
        res.status(500).json({ message: 'Error updating proficiency request!' });
    }
});

// Delete a proficiency request
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const proficiencyRequest = await ProficiencyRequest.findByPk(id);
        if (!proficiencyRequest) {
            return res.status(404).json({ message: 'Proficiency request not found!' });
        }

        // Delete the proficiencyRequest from the database
        await proficiencyRequest.destroy();

        res.status(200).json({ message: 'Proficiency request deleted successfully!' });
    } catch (error) {
        console.error('Error deleting proficiency request:', error);
        res.status(500).json({ message: 'Error deleting proficiency request!' });
    }
});

module.exports = router;
