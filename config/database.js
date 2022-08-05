const { Sequelize } = require('sequelize');
const transaction = require("transaction")
const db = new Sequelize('bheema_db', 'postgres', 'vrinda@666', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;