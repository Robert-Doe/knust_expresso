// routes/lecturer.js

const express = require('express');
const router = express.Router();
const Lecturer = require('../models/Lecturer');


// Define the route for pushing JSON data to the database
router.get('/push', async (req, res) => {
    try {
        const lecturers = require('../config/lecturers');

        // Loop through the lecturers array and create records in the database
       /* for (const lecturerData of lecturers) {
            // Extract the properties from the JSON object
            const {
                firstName,
                lastName,
                gender,
                email,
                phoneNumber,
                departmentId,
                position,
                profileLink,
                imageSrc
            } = lecturerData;

            // Create a lecturer record in the database
            await Lecturer.create({
                firstName,
                lastName,
                gender,
                email,
                phoneNumber,
                departmentId,
                position,
                profileLink,
                imageSrc
            });
        }*/
        await Lecturer.bulkCreate(lecturers)

        res.send('Data successfully pushed to the database.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error pushing data to the database.');
    }
});




// Get all lecturers
router.get('/', async (req, res) => {
    try {
        const lecturers = await Lecturer.findAll();
        res.json(lecturers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lecturers' });
    }
});

// Get a single lecturer by ID
router.get('/:id', async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        res.json(lecturer);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving lecturer' });
    }
});

// Create a new lecturer
router.post('/', async (req, res) => {
    try {
        const lecturer = await Lecturer.create(req.body);
        res.status(201).json(lecturer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating lecturer' });
    }
});

// Update a lecturer
router.put('/:id', async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        await lecturer.update(req.body);
        res.json(lecturer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating lecturer' });
    }
});

// Delete a lecturer
router.delete('/:id', async (req, res) => {
    try {
        const lecturer = await Lecturer.findByPk(req.params.id);
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found' });
        }
        await lecturer.destroy();
        res.json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lecturer' });
    }
});

module.exports = router;
