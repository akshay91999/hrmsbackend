const Sequelize = require('sequelize');
const db = require('../config/database');

const Job = db.define('job', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    department: {
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
    }
},
{
    alter:true
}
);

module.exports = Job;