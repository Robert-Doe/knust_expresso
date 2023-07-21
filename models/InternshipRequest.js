// models/InternshipRequest.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');
const {v4: uuidv4} = require("uuid");

const InternshipRequest = db.define('InternshipRequest', {
    id: {
        type: DataTypes.UUID, // Use UUID data type
        defaultValue: () => uuidv4(), // Set a default value to generate UUID on creation
        primaryKey: true,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pointOfContact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = InternshipRequest;
