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
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
           is:/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        },
        unique:true

    },

        

    altcontactnumber: {
        type: Sequelize.STRING,
        allowNull: true,
        validate:{
           is:/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        },
        unique:true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,

        

        validate:{
            isEmail:true
        },
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