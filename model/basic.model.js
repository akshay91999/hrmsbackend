const Sequelize = require('sequelize');
const db = require('../config/database');


const Basic = db.define('basic', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        
        
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        
    },
       deletedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
{

    alter:true,
});


module.exports = Basic;