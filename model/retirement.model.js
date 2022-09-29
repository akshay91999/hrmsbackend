const Sequelize = require('sequelize');
const db = require('../config/database');

const Shift = db.define('retirement', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER
    },
    applydate:{
        type: Sequelize.DATEONLY
    },
    resigndate:{
        type: Sequelize.DATEONLY
    },
    reason:{
        type: Sequelize.STRING
    }
},
{
    alter:true
}
);

module.exports = Shift;