const Sequelize = require('sequelize');
const db = require('../config/database');

const Candidate = db.define('candidate', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    candidatename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dp_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ds_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail:true
        } 
    },
    cv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
           is:/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
        }
    },   
    yoe: {
        type: Sequelize.INTEGER,
        allowNull: false
             
    },
    selection:{
        type:Sequelize.BOOLEAN,
        allowNull: true
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:"pending"
    },
    deletedat: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
{
    alter:true
    // force:true

});


module.exports = Candidate;