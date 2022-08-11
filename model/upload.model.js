const Sequelize = require('sequelize');
const db = require('../config/database');

const Upload = db.define('Upload', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    basic_id: {
        type: Sequelize.INTEGER
    },
    document: {
        type: Sequelize.STRING,
        allowNull: false
    },
    doc_type: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    alter:true
    //force:true
}
);

module.exports = Upload;