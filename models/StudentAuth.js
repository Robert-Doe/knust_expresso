// models/StudentAuth.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudentAuth = sequelize.define('StudentAuth', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    keyHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verificationToken:{
        type:DataTypes.STRING,
        allowNull: true
    },
    isEmailVerified:{
        type:DataTypes.STRING,
        allowNull: false
    }
});

module.exports = StudentAuth;
