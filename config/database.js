const { Sequelize } = require('sequelize');
const transaction = require("transaction")
const db = new Sequelize('bheema_db', 'postgres', 'prasoon666', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 500,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});

module.exports = db;