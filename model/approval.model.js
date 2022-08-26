const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Approval = db.define('Approval', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    basic_id: {
        type: Sequelize.INTEGER, 
    },
   
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false
    },
    leave_from: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    leave_type: {
        type: Sequelize.STRING,
        allowNull:false
    },
    no_days: {
         type: Sequelize.INTEGER,
         allowNull:false
    },
   
 
    
},
);

module.exports = Request;