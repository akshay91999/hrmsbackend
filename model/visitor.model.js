const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Visitor = db.define('visitor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    address: {
        type: Sequelize.STRING,
        allowNull: false
    },

    phoneno: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    time_in: {
        type: Sequelize.TIME,
        allowNull: false
    },
    time_out: {
        type: Sequelize.TIME,
        allowNull: false
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false
    },

    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "checkin"
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
}
);

module.exports = Visitor;