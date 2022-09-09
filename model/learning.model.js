const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Learning = db.define('learning', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deletedat: {                       //Status of deleted learning 
        type: Sequelize.DATE,
        allowNull: true
    }

},

);

module.exports = Learning;