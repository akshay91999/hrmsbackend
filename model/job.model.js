const Sequelize = require('sequelize');
const db = require('../config/database');

const Job = db.define('Job', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER
    },
    ds_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    branch: {
        type: Sequelize.STRING,
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