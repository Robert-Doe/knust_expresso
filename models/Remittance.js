// models/Remittance.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Remittance = db.define('Remittance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    withdrawerType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    withdrawerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    requestDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    grantDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = Remittance;
