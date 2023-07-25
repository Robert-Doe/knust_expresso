const { DataTypes } = require('sequelize');
const db = require('../config/db');
const {v4: uuidv4} = require("uuid");

const ProficiencyRequest = db.define('ProficiencyRequest', {
    id: {
        type: DataTypes.UUID, // Use UUID data type
        defaultValue: () => uuidv4(), // Set a default value to generate UUID on creation
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transcriptUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ProficiencyRequest;
