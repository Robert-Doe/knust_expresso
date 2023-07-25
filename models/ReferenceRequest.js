// models/ReferenceRequest.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const ReferenceRequest = db.define('ReferenceRequest', {
        id: {
            type: DataTypes.UUID, // Use UUID data type
            defaultValue: () => uuidv4(), // Set a default value to generate UUID on creation
            primaryKey: true,
        },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lecturerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    schoolAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    purpose: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    transcriptUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    schoolEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ReferenceRequest;
