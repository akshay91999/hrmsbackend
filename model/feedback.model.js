const Sequelize = require('sequelize');
const db = require('../config/database');

const Feedback = db.define('Feedback', {
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
    basic_id:{
        type:Sequelize.INTEGER
    },
    training_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    feedback: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    
    

},
{
    alter:true
}
);

module.exports = Feedback;