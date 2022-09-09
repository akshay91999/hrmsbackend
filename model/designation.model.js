const Sequelize = require('sequelize');
const db = require('../config/database');

const designation = db.define('designation', {
    ds_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dp_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deletedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
    {
        alter: true
    }
);
module.exports = designation;