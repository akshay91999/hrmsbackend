const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Request = db.define('Request', {
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
    
    no_leave: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
   
    reason: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    leave_type: {
        type: Sequelize.STRING,
        enum: ['MEDICAL', 'FAMILY', 'OTHERS'],
        default: 'OTHERS'
    },
    status: {
    type: Sequelize.STRING,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
    },
   
 
    
},
);

module.exports = Request;