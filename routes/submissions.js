const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const Submission = require('../models/Submission')
const {createTransport} = require("nodemailer");

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

const sendEmailWithAttachment = async (studentEmail, subject, text, attachmentPath) => {
    try {
        // Create a transporter object using your email service provider's SMTP settings
        const transporter = createTransport({
            host: 'smtp.titan.email',
            port: 587,
            secure: false,
            auth: {
                user: 'knustexpresso@codeden.org',
                pass: 'bob@Cumulus#4717'
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'KNUST Xpresso <knustexpresso@codeden.org>',
            to: studentEmail,
            subject,
            text,
            attachments: [
                {
                    filename: 'attachment_filename.pdf', // Customize the attachment filename as needed
                    path: attachmentPath, // Path to the file you want to attach
                },
            ],
        };

        // Send the email with the attachment
        await transporter.sendMail(mailOptions);

        console.log('Email with attachment sent successfully.');
    } catch (error) {
        console.error('Error sending email with attachment:', error);
    }
};



const ReferenceRequest = require('../models/ReferenceRequest');
const Student = require('../models/Student'); // Import the Student model

router.post('/upload-recommendation', upload.single('file'), async (req, res) => {
    try {
        // Access the uploaded file through req.file
        const recommendationFilePath = req.file.path;

        // Retrieve the ReferenceRequest based on the requestId
        const referenceRequest = await ReferenceRequest.findByPk(req.body.requestId);
        if (!referenceRequest) {
            return res.status(404).json({ message: 'Recommendation request not found.' });
        }

        // Retrieve the student's email based on the studentId in the ReferenceRequest
        const student = await Student.findByPk(referenceRequest.studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Send the email to the student's email
        await sendEmailWithAttachment(student.email, "Recommendation Letter", "We are done with your recommendation letter", recommendationFilePath);

        // Process the file as needed (e.g., save the file path to a database, etc.)
        // Save the URL to the database
        const submission = await Submission.create({
            requestId: req.body.requestId,
            date: new Date().toLocaleDateString('en-GB'),
            url: recommendationFilePath,
        });

        // Return a response to the client
        res.json({ message: 'File uploaded successfully.', submission });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'An error occurred while uploading the file. Please try again later.' });
    }
});


module.exports = router;
