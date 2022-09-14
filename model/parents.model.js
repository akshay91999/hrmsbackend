const Sequelize = require('sequelize');
const db = require('../config/database');

const Parent = db.define('parent', {
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
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    mothername: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mcontactnumber: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    maritalstatus: {
        type: Sequelize.STRING,
        allowNull: false      
    }, 
    spousename: {
        type: Sequelize.STRING,
        allowNull:true
    }, 
    scontactnumber: {
        type: Sequelize.DOUBLE,
         allowNull:true     
    }, 
    deletedat: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
},{
     alter:true
    // force:true
});

module.exports = Parent;