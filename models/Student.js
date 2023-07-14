/*
// models/Student.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Student = db.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    graduationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Student;
*/


const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Student = db.define('Student', {
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admissionYear: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gradType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    graduationYear: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    indexNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    programme: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Student;
