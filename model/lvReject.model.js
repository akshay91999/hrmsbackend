const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Rejectedlv = db.define('leav_reject', {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
         autoIncrement: true
     },
    lv_id: {
        type: Sequelize.INTEGER, 
    },
    rejectreason: {
        type: Sequelize.STRING,
        allowNull: true
    }   
},{
    alter :true
}
);

module.exports = Rejectedlv;