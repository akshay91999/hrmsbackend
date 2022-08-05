const Sequelize = require('sequelize');
const db = require('../config/database');

const Basic = db.define('Basic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passwd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userList_id: {
        type: Sequelize.INTEGER,
        // allowNull: false
             
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
{
    // alter:true
    // force:true
});

module.exports = Basic;