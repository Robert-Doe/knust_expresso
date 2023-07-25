// models/Department.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Department = db.define('Department', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    college: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Department;
