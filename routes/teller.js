// routes/student.js

const express = require('express');
const axios = require('axios');
const router = express.Router();
const Student = require('../models/Student');
const StudentAuth = require('../models/StudentAuth')
const {v4: uuidv4} = require('uuid');
const nodemailer = require('nodemailer');
const PAYSTACK_SECRET_KEY = 'sk_live_20a17270c56f71eeb3b8dced173f3c31dc49accd';

const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


// Endpoint for creating a payment request
router.post('/create-payment', async (req, res) => {
    const { amount, email, callbackUrl,orderId,originUrl } = req.body;
    logger.info(req.body)

    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                amount,
                email,
                callback_url: callbackUrl,
                metadata: {
                    order_id: orderId, // Include the order ID in the metadata
                    origin_url:originUrl
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const { data } = response;
        res.json({ paymentUrl: data.data.authorization_url });
    } catch (error) {
        console.error('Error creating payment request:', error.message);
        res.status(500).json({ error: 'Failed to create payment request' });
    }
});


// Endpoint for creating a payment request
router.post('/callback', async (req, res) => {
    console.log(req.body)
    console.log(req)
    logger.info(req.body)
    logger.info("FROM POST")
    const transactionDetails = req.body; // Retrieve the callback data from the request body
    const originUrl = transactionDetails.message.data.metadata.origin_url;
    //res.redirect(originUrl)
    //res.json(req.body)
    res.send("Received POST REQUEST");
});

// Endpoint for creating a payment request
router.get('/callback', async (req, res) => {
     console.log(req.body)
     console.log(req)
    logger.info("FROM GET")
    res.send("Received GET REQUEST");
});




module.exports = router;
