const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Visitor = db.define('visitor', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
   phoneno: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
   
    time_in: {
        type: Sequelize.STRING,
        allowNull:false
    },
    time_out: {
        type: Sequelize.STRING,
        allowNull:true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    }, 
    date:{
        type: Sequelize.DATEONLY,
        allowNull:false
    } 
}
);

module.exports = Visitor;