const Sequelize = require('sequelize');
const db = require('../config/database');

const Attendance = db.define('Attendance', {
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
        type: Sequelize.DATE
    },
    checkout:{
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.STRING
    },
    shift:{
        type: Sequelize.STRING
    }

},
{
    alter:true
}
);

module.exports = Attendance;