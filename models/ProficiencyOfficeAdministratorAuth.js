// models/ProficiencyOfficeAdministratorAuth.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ProficiencyOfficeAdministratorAuth = db.define('ProficiencyOfficeAdministratorAuth', {
    administratorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    keyHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ProficiencyOfficeAdministratorAuth;
