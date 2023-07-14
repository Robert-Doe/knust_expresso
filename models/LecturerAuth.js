// models/LecturerAuth.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const LecturerAuth = db.define('LecturerAuth', {
    lecturerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    keyHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = LecturerAuth;
