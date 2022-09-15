const Sequelize = require('sequelize');
const db = require('../config/database');

const Shift = db.define('shift', {
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
    date:{
        type: Sequelize.DATEONLY
    },
    shift:{
        type: Sequelize.STRING
    },
    employeename:{
        type:Sequelize.STRING
    }

},
{
    alter:true
}
);

module.exports = Shift;