// models/DepartmentAdministratorAuth.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ProficiencyAuth = db.define('ProficiencyAuth', {
    proficiencyId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = ProficiencyAuth;
