const Sequelize = require('sequelize');
const db = require('../config/database');

const Usertype = db.define('usertype', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_type: {
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = Usertype;