const Sequelize = require('sequelize');
const db = require('../config/database');
//const Basic = require('./basic')
const Exp = db.define('experience', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    basic_id: {
        type: Sequelize.INTEGER,
    },
    employeeid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employeetype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    durationfrom: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        isDate:true
    },
    durationto: {
        type: Sequelize.DATEONLY,
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