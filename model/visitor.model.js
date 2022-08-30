const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Visitor = db.define('Visitor', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
   idproof_no: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
   
    time_in: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    time_out: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    contact_person: {
        type: Sequelize.STRING,
        allowNull:false
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull:false
    },
    status: {
        type: Sequelize.STRING,
        allowNull:false,
        default:'checkin'
    },
 
    
},
);

module.exports = Visitor;