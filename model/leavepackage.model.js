const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Leave = db.define('Leave', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    
   
    
    total_paid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total_unpaid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
   
   
   
 
    
},
);

module.exports = Leave;