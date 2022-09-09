const Sequelize = require('sequelize');
const db = require('../config/database');

const Job = db.define('job', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        unique:true
    },
    ds_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dp_id: {
        type: Sequelize.INTEGER,
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
    deletedat: {
        type: Sequelize.DATE,
        allowNull: true,
        
    }
},
{
    alter:true
}
);

module.exports = Job;