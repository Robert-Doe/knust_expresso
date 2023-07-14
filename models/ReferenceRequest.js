// models/ReferenceRequest.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ReferenceRequest = db.define('ReferenceRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    comments: {
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
