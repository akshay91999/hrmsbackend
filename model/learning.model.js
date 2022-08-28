const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Learning = db.define('Learning', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
       
      
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    department: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    
   },
     
);

module.exports = Learning;