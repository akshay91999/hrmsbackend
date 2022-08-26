const Sequelize = require('sequelize');
const db = require('../config/database');

const Task = db.define('Task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emp_id: {
        type: Sequelize.INTEGER
    },
    taskname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assigndate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    completed_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    
    

},
{
    alter:true
}
);

module.exports = Task;