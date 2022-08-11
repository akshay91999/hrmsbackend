const Sequelize = require('sequelize');
const db = require('../config/database');
//const Basic = require('./basic')
const Exp = db.define('Experience', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    basic_id: {
        type: Sequelize.INTEGER,
    },
    employeeid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    employeetype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    durationfrom: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate:true
    },
    durationto: {
        type: Sequelize.DATE,
        allowNull: false,
        isDate:true
    },
    designation: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    annualsalary: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    
}

);



module.exports = Exp;