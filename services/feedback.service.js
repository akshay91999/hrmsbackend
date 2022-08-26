// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
const EmpTraining = require('../model/emptraining.model')
const Dept = require('../model/department.model')
const Feedback = require('../model/feedback.model')
const Training = require('../model/emptraining.model')
var feedbackService = {
    add: add,
    findAll: findAll,
    find: find,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(tn,tnid,dept,res) {
    const t = await db.transaction();
    try{
        let pp = tn;
        
        const dp = await EmpTraining.findOne({where:{dp_id:dept.dp_id}},{transaction:t})
        const feedback = await Feedback.create({...pp,basic_id:tnid,dp_id:dp.dp_id},{transaction:t});
        t.commit();
        return res.status(200).json({feedback})
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
async function findById(id,tn,trn,dept, res) {
    const t = await db.transaction();
    try {
        
        //const tn = await Training.findByPk(pkid , { transaction: t })
        const dpt = await Dept.findOne({where:{dp_id:id}})
        const trng = await Training.findOne({where:{training_name:tn.training_name}})
        const feed = await Feedback.findAll({where: {dp_id:dpt.dp_id,training_name:trng.training_name}},{transaction:t}) 
        t.commit();
        return res.status(200).json({feed})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function find(tn,dept, res) {
    const t = await db.transaction();
    try {
        
        //const tn = await Training.findByPk(pkid , { transaction: t })
        const dpt = await Dept.findOne({where:{dp_id:dept.dp_id}})
        //const trng = await Training.findOne({where:{training_name:tn.training_name}})
        const feed = await Feedback.findAll({where: {dp_id:dpt.dp_id,training_name:tn.training_name}},{transaction:t}) 
        t.commit();
        return res.status(200).json({feed})
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

module.exports = feedbackService;