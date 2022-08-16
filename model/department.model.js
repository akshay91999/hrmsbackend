const Sequelize = require('sequelize');
const db = require('../config/database');

const depart = db.define('department', {
    dp_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    }
},
    {
        alter: true
    }
);
module.exports = depart;