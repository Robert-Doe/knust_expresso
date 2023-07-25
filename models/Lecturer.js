// models/Lecturer.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Lecturer = db.define('Lecturer', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'Dr.'
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profileLink: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageSrc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Lecturer.sync().then(()=>console.log('Table Modified'))

module.exports = Lecturer;
