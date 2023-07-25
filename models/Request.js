// models/Request.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');
const {v4: uuidv4} = require("uuid");

const Request = db.define('Request', {
    id: {
        type: DataTypes.UUID, // Use UUID data type
        defaultValue: () => uuidv4(), // Set a default value to generate UUID on creation
        primaryKey: true,
    },
    requestType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    requestId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentId:{
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Request;
