// models/Department.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Proficiency = db.define('Proficiency', {
    proficiencyId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Proficiency;
