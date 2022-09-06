const Sequelize = require('sequelize');
const db = require('../config/database');


const VacancyList = db.define('vacancy', {
    v_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vacancynumber: {           //no of vacancy
        type: Sequelize.INTEGER,
        allowNull: false
    },
    yoeneeded: {                       //year of experience needed
        type: Sequelize.INTEGER,
        allowNull: false
    },
    neededwithin: {                   //the employee need to be selected  with in the date....
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: "false"
    },
    deletedAt: {                   //Status of deleted vaccancy
        type: Sequelize.DATEONLY
    },

});
module.exports = VacancyList;