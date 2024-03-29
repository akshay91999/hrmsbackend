
const Sequelize = require('sequelize');
const db = require('../config/database');

const Address = db.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false
             
    },
    e_address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pincode: {
        type: Sequelize.STRING,
        allowNull: false,       
    },
    currentaddress: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentstate: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentcountry: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentpincode: {
        type: Sequelize.STRING,
        allowNull: true,       
    },
    deletedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
    
},
{

    alter:true
  //force:true

 

});

module.exports = Address;