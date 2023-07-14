const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ProficiencyRequest = db.define('ProficiencyRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
