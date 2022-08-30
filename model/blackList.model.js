const Sequelize = require('sequelize');
const db = require('../config/database');

const BlackList = db.define('Can_Blacklist', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    c_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
    {
        alter: true
    }
);
module.exports = BlackList;