const Sequelize = require('sequelize');
const db = require('../config/database');

const Login = db.define('login_status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true
    },
    p_change: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
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
module.exports = Login;