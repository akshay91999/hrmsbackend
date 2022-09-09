const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Academic = db.define('academic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
       
      
    },
    institution_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    programme: {
        type: Sequelize.STRING,
        allowNull: false
    },
    board: {
        type: Sequelize.STRING,
        allowNull: false
    },
    branch: {
        type: Sequelize.STRING,
        allowNull: false
    },
    course_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    certificate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    course: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
   },
     
);

module.exports = Academic;