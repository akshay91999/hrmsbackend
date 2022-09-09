const Sequelize = require('sequelize');
const db = require('../config/database');

const Skill = db.define('skill', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER
    },
    hardskills: {
        type: Sequelize.STRING,
        allowNull: false
    },
    softskills: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deletedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
{
    alter:true
}
);

module.exports = Skill;