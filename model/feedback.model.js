const Sequelize = require('sequelize');
const db = require('../config/database');

const Feedback = db.define('feedback', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    deletedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
    
    

},
{
    alter:true
}
);

module.exports = Feedback;