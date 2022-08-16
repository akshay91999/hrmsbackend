// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
const Training = require('../model/training.model')
var trainingService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(tn,res,pid) {
    const t = await db.transaction();
    try{
        let pp = tn;
        //const basic = await Basic.create({...pp},{transaction:t});
        const training = await Training.create({...pp},{transaction:t});
        t.commit();
        return res.status(200).json({training})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

function findAll() {
    return Training.findAll();
}

async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const tn = await Training.findByPk(pkid , { transaction: t })
        const tn1 = await Training.findAll({where: {dept_id:pkid}},{transaction:t}) 
        t.commit();
        return res.status(200).json({tn1})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
function deleteById(id) {
    return Training.destroy({ where: { id: id } });
}

async function update(up,id,res) {
    const t = await db.transaction();
    try {
        let pp = up;

        
        const training = await Training.update({...pp }, { where: { basic_id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = trainingService;