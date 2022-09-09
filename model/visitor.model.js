const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Visitor = db.define('visitor', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    
    photo: {
        type: Sequelize.STRING,
        allowNull: true
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
        type: Sequelize.STRING,
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
    dp_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    status: {
        type: Sequelize.STRING,
        allowNull:false,
        
    },
 
    
},
);

module.exports = Visitor;