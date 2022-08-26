const Sequelize = require('sequelize');
const db = require('../config/database');

const Task = db.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER
    },
    dp_id:{
        type: Sequelize.INTEGER
    },
    ds_id:{
        type: Sequelize.INTEGER
    },
    projectname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taskname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assigndate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    due_date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    completed_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true
    }
    

},
{
    alter:true
}
);

module.exports = Task;