const Sequelize = require('sequelize');
const db = require('../config/database');

const Address = db.define('Address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false
             
    },
    e_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pincode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
    
},
{
//  alter:true
//  force:true
});

module.exports = Address;