// routes/payment.js

const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Get all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new payment
router.post('/', async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            res.json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a payment
router.put('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            await payment.update(req.body);
            res.json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            await payment.destroy();
            res.json({ message: 'Payment deleted' });
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
