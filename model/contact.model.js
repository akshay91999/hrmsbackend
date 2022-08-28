const Sequelize = require('sequelize');
const db = require('../config/database');

const Contact = db.define('Contact', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false     
    },
    contactnumber: {
        type: Sequelize.STRING,
        allowNull: false,
        },
    altcontactnumber: {
        type: Sequelize.STRING,
        allowNull: true,
     },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    altemail: {
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
            isEmail:true
        },
        unique:true
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
    
},
{
 alter:true
  //force:true
});

module.exports = Contact;