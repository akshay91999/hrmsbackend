const Sequelize = require('sequelize');
const db = require('../config/database');

const Retire = db.define('retirement', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    applydate:{
        type: Sequelize.DATE,
        allowNull:false
    },
    resigndate:{
        type: Sequelize.DATEONLY,
        allowNull:true
    },
    reason:{
        type: Sequelize.STRING,
        allowNull:false
    }
},
{
    alter:true
}
);

module.exports = Retire;