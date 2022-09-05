// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
const Dept = require('../model/department.model')
const Desig = require('../model/designation.model')
const Training = require('../model/training.model')
var trainingService = {
    add: add,
    findAll: findAll,
    //find: find,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(tn,tnid,res) {
    const t = await db.transaction();
    try{
        let pp = tn;
        
        
        const training = await Training.create({...pp,dp_id:tnid},{transaction:t});
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

// async function findById(id, res) {
//     const t = await db.transaction();
//     try {
//         let pkid = id;
//         //const tn = await Training.findByPk(pkid , { transaction: t })
//         const tn1 = await Training.findAll({where: {dp_id:pkid}},{transaction:t}) 
//         t.commit();
//         return res.status(200).json({tn1})
//     }
//     catch (error) {
//         console.log(error);
//         t.rollback();
//     }

// }
async function findById(tn,dept, res) {
    const t = await db.transaction();
    try {
        let pkid = tn;
        //const tn = await Training.findByPk(pkid , { transaction: t })
        const dept1 = await Dept.findOne({where:{dp_id:dept.dp_id}},{transaction:t})
        const tn2 = await Training.findAll({where: {dp_id:dept1.dp_id}},{transaction:t}) 
        t.commit();
        return res.status(200).json({tn2})
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

        
        const training = await Training.update({...pp }, { where: { id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = trainingService;