// routes/referenceRequest.js
const express = require('express');
const router = express.Router();
const ReferenceRequest = require('../models/ReferenceRequest');
const Request = require('../models/Request');
const Lecturer = require('../models/Lecturer');
const multer = require('multer'); // Middleware for handling file uploads
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');

const API_KEY = 'Nk3SqCe3G3FFXaAlZDKxaxvv5 '; // Replace with your mNotify API key
const SENDER_ID = 'Xpresso'; // Replace with your mNotify sender ID

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



async function sendSMS(recipient, message) {
    try {
        const apiUrl = 'https://apps.mnotify.net/smsapi';
        const params = {
            key: API_KEY,
            to: recipient,
            msg: message,
            sender_id: SENDER_ID,
        };

        const response = await axios.get(apiUrl, { params });

        if (response.data.status === 'success') {
            console.log('SMS sent successfully.');
            return true;
        } else {
            console.error('Failed to send SMS:', response.data);
            return false;
        }
    } catch (error) {
        console.error('Error sending SMS:', error);
        return false;
    }
}



// Function to send an email using NodeMailer
const sendEmail = async (lecturerEmail, subject, text) => {
    try {
        // Create a transporter object using your email service provider's SMTP settings
        const transporter = nodemailer.createTransport({
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
            to: lecturerEmail,
            subject,
            text,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


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

        const transcriptUrl = req.files['transcriptFile'][0] ? `https://knustexpresso.codeden.org/${uploadDirectory}/${req.files['transcriptFile'][0].filename}` : ''
        const resumeUrl = req.files['transcriptFile'][0] ? `https://knustexpresso.codeden.org/${uploadDirectory}/${req.files['cvFile'][0].filename}` : ''

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

        const lecturer = await Lecturer.findByPk(lecturerId)
        // After successfully creating the reference request, send an SMS notification to the lecturer
        const lecturerPhoneNumber = lecturer.phoneNumber; // Replace with the lecturer's phone number
        const message = `Hello, you have a new request for a recommendation letter. Please check your dashboard for details.\nReference Request ID: ${referenceRequest.id}\nStudent ID: ${studentId}`; // Customize the SMS message as needed
        await sendSMS(lecturerPhoneNumber, message);

        // After successfully creating the reference request, send an email to the lecturer
        const lecturerEmail = lecturer.email; // Replace with the lecturer's email address
        const subject = 'New Request for Recommendation Letter';
        const messageEmail = `Hello,\n\nYou have a new request for a recommendation letter. Please check your dashboard for details.\n\nReference Request ID: ${referenceRequest.id}\nStudent ID: ${studentId}`; // Customize the email message as needed

        await sendEmail(lecturerEmail, subject, messageEmail);


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
        const orderOption = [
            ['createdAt', 'DESC'], // For example, columnName = 'createdAt' and sortOrder = 'DESC'
        ];
        const referenceRequests = await ReferenceRequest.findAll({order:orderOption});
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


