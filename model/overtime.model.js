const Sequelize = require('sequelize');
const db = require('../config/database');

const Overtime = db.define('overtime', {
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
    from:{
        type: Sequelize.TIME
    },
    to:{
        type: Sequelize.TIME
    },
    employeename:{
        type:Sequelize.STRING
    }

},
{
    alter:true
}
);

module.exports = Overtime;