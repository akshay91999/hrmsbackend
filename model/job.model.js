const Sequelize = require('sequelize');
const db = require('../config/database');

const Job = db.define('Job', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        unique:true
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    package: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    jobtype: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doj: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        
    }
},
{
    alter:true
}
);

module.exports = Job;