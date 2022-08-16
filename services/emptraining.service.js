const sequelize = require('sequelize')
const db = require('../config/database')

const EmpTraining = require('../model/emptraining.model')
const Job = require('../model/job.model')
var EmpTrnService = {
    add: add,
    
    findById: findById,
    update: update,
    
}

async function add(emptrn,res,pid) {
    const t = await db.transaction();
    try{
        let pp = emptrn;
        //const basic = await Basic.create({...pp},{transaction:t});
        const dept = await Job.findById(pid,{transaction:t})
        const EmpTrng = await EmpTraining.create({...pp,basic_id:pid,dept_id},{transaction:t});
        t.commit();
        return res.status(200).json({EmpTrng})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

async function findById(up, res) {
    const t = await db.transaction();
    try {
        let pkid = up;
        const Trng = await Training.findById({ pkid }, { transaction: t })
        const emptrng = await EmpTraining.findAll({ where: { dept_id:pkid} }, { transaction: t })
        t.commit();
        if (!trng.deletedAt) {
            return res.status(200).json({trng})
        }
        else {
            return res.status(201).json({ message: "user not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}

async function update(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;

        
        const emptrng = await EmpTraining.update({ ...pp }, { where: { id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
module.exports = EmpTrnService;