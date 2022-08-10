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
    }
},
{
    alter:true
}
);

module.exports = Skill;