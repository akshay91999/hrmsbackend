const Sequelize = require('sequelize');
const db = require('../config/database');


const Userlist = db.define('UserList', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   
 user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        
    },
   
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    usertype: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports =Userlist;