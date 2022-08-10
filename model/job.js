const Sequelize = require('sequelize');
const db = require('../config/database');

const Skill = db.define('skill', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
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
    typeid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doj: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
},
{
    force:true
}
);

module.exports = Skill;