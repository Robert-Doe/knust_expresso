const Sequelize = require('sequelize')
const db = require('../config/db')

const User = db.define('User', {
    id: {
        primaryKey:true,
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    departmentId: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User