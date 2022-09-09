const Sequelize = require('sequelize');
const db = require('../config/database');

const Travel = db.define('travel', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,

    },  
    time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    trip_for: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
    type: Sequelize.STRING,
    defaultValue:"pending",
    allowNull:false
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
module.exports = Travel;