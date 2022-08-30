const Sequelize = require('sequelize');
const db = require('../config/database');

const view = db.define('Empview', {
    basic_id: {
        type: Sequelize.INTEGER,
        
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    contactnumber: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false,
        
    }
},
    {
        alter: true
    }
);
module.exports = view;