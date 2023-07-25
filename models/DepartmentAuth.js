// models/DepartmentAdministratorAuth.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const DepartmentAuth = db.define('DepartmentAuth', {
    departmentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = DepartmentAuth;
