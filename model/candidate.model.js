const Sequelize = require('sequelize');
const db = require('../config/database');

const Candidate = db.define('Candidate', {
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
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
           is:/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
        }
    },
    highestqualification: {
        type: Sequelize.STRING,
        allowNull: false,
        
    },
    yoe: {
        type: Sequelize.INTEGER,
        allowNull: false
             
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:"pending"
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
},
{
    alter:true
    // force:true

});


module.exports = Candidate;