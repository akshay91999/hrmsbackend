const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Grievance = db.define('grievance', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
     basic_id: {
        type: Sequelize.INTEGER,
       
         
     },
     dp_id:{
        type:Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    grievance: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    solution: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
   status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
},
);

module.exports = Grievance;