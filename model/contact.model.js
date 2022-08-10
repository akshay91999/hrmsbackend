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
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    altcontactnumber: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    altemail: {
        type: Sequelize.STRING,
        allowNull: true,
       
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