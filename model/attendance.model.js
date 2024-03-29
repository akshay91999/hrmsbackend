const Sequelize = require('sequelize');
const db = require('../config/database');

const Attendance = db.define('attendance', {
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
    checkin:{
        type: Sequelize.INTEGER
    },
    checkout:{
        type: Sequelize.INTEGER
    },
    status:{
        type: Sequelize.STRING,
        defaultValue:"ontime"
    },
    shift:{
        type:Sequelize.STRING,
        
    }
},
{
    alter:true
}
);

module.exports = Attendance;