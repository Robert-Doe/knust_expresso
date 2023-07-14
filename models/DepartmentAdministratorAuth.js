// models/DepartmentAdministratorAuth.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DepartmentAdministratorAuth = db.define('DepartmentAdministratorAuth', {
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

module.exports = DepartmentAdministratorAuth;
