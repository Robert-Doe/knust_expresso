// models/Submission.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Submission = db.define('Submission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
    },
    requestId: {
        type: DataTypes.UUID, // Assuming requestId is a UUID
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => new Date().toLocaleDateString("en-GB"),
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Submission;
