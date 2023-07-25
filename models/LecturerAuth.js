// models/DepartmentAdministratorAuth.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const LecturerAuth = db.define('LecturerAuth', {
    staffId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = LecturerAuth;
