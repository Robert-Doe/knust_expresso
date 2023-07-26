const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const Submission = require('../models/Submission')

// Specify the destination folder for file uploads
const uploadFolder = 'uploads/submissions';

// Create the folder if it does not exist
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Set up multer storage to specify where to save the uploaded file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); // Replace with the desired upload directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Create a multer upload instance with the specified storage configuration
const upload = multer({ storage: storage });

// Route to handle the file upload
// Route to handle the file upload
router.post('/upload-recommendation', upload.single('file'), async (req, res) => {
    try {
        // Access the uploaded file through req.file
        const recommendationFilePath = req.file.path;

        // Process the file as needed (e.g., save the file path to a database, etc.)
        // Save the URL to the database
        const submission = await Submission.create({
            requestId: req.body.requestId, // Assuming the requestId is sent in the request body
            date: new Date().toLocaleDateString('en-GB'), // The current date in the format "28-01-2023"
            url: recommendationFilePath, // Save the file path as the URL
        });

        // Return a response to the client
        res.json({ message: 'File uploaded successfully.', submission });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'An error occurred while uploading the file. Please try again later.' });
    }
});

module.exports = router;
