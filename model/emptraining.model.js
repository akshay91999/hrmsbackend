const Sequelize = require('sequelize');
const db = require('../config/database');

const Training = db.define('EmpTraining', {
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