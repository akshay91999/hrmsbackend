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
    force:true
}
);

module.exports = Skill;