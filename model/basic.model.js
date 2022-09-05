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
       deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
{

    alter:true,
});


module.exports = Basic;