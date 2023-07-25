const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");

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
router.post('/upload-recommendation', upload.single('file'), (req, res) => {
    // Access the uploaded file through req.file
    const recommendationFilePath = req.file.path;
    // Process the file as needed (e.g., save the file path to a database, etc.)
    // Return a response to the client
    res.json({ message: 'File uploaded successfully.', filePath: recommendationFilePath });
});

module.exports = router;
