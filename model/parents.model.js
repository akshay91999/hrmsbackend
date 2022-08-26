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
        allowNull: false,
        validate:{
            is:/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
         }
    },
    mothername: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mcontactnumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            is:/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
         }  
    },
    maritalstatus: {
        type: Sequelize.STRING,
        allowNull: false      
    }, 
    spousename: {
        type: Sequelize.STRING,
        
    }, 
    scontactnumber: {
        type: Sequelize.STRING,
        validate:{
            is:/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
         }  
              
    }, 
    deletedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
},{
     alter:true
    // force:true
});

module.exports = Parent;