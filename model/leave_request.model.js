const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Request = db.define('request', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    basic_id: {
        type: Sequelize.INTEGER, 
    },
   
    leave_from: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    leave_to: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    no_days: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    leave_type: {
        type: Sequelize.STRING,
        allowNull:false
    },
    status: {
    type: Sequelize.STRING,
    defaultValue:"pending",
    allowNull:false
    },   
    deletedat: {
        type: Sequelize.DATE,
        allowNull:true
    }
}
);

module.exports = Request;