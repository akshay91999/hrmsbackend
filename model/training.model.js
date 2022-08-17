const Sequelize = require('sequelize');
const db = require('../config/database');

const Training = db.define('Training', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // emp_id: {
    //     type: Sequelize.INTEGER
    // },
    dp_id:{
        type:Sequelize.INTEGER
    },
    ds_id:{
        type:Sequelize.INTEGER
    },
    training_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trainer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time_schedule: {
        type: Sequelize.STRING,
        allowNull: false
    },
    training_date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    

},
{
    alter:true
}
);

module.exports = Training;