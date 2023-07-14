// models/Request.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Request = db.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
});

module.exports = Request;
