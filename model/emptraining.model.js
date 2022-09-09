const Sequelize = require('sequelize');
const db = require('../config/database');

const Training = db.define('emptraining', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dp_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    training_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trainer: {
        type: Sequelize.STRING,
        allowNull: true
    },
    time_schedule: {
        type: Sequelize.STRING,
        allowNull: true
    },
    training_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    checkin: {
        type: Sequelize.STRING,
        allowNull: true
    },
    checkout: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
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

module.exports = Training;