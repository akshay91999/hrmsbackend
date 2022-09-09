const Sequelize = require('sequelize');
const db = require('../config/database');

const Training = db.define('training', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dp_id:{
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
},
{
    alter:true
}
);

module.exports = Training;