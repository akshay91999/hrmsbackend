const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Academic = db.define('academic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
       
      
    },
    school: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    board: {
        type: Sequelize.STRING,
        allowNull: false
    },
    courseid: {
         type: Sequelize.STRING,
        allowNull: false
     },
    branchid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coursetype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
    durtnfrm: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    durtnto: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
   
   },
     
);

module.exports = Academic;