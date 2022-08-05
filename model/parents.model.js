const Sequelize = require('sequelize');
const db = require('../config/database');

const Parent = db.define('Parent', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false
             
    },
    fathername: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fcontactnumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mothername: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mcontactnumber: {
        type: Sequelize.STRING,
        allowNull: false
       
    },
    maritalstatus: {
        type: Sequelize.STRING,
        allowNull: false
       
    },
    
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},{
    // alter:true
    // force:true
});

module.exports = Parent;