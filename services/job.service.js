// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
const Basics = require('../model/basic.model')
const Job = require('../model/job.model')
var jobService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(job,res,pid) {
    const t = await db.transaction();
    try{
        let pp = job;
        //const basic = await Basic.create({...pp},{transaction:t});
        const jobs = await Job.create({...pp,basic_id:pid},{transaction:t});
        
        t.commit();
        return res.status(200).json({jobs})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

function findAll() {
    return Job.findAll();
}

async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const base = await Basics.findByPk(pkid, { transaction: t })
        
        const job = await Job.findAll({where: { basic_id: pkid }} , { transaction: t })
        t.commit();
        if (!job.deletedAt) {
            return res.status(200).json({job})
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
function deleteById(id) {
    return Job.destroy({ where: { basic_id: id } });
}

async function update(up,id,res) {
    const t = await db.transaction();
    try {
        let pp = up;

        
        const exp = await Job.update({...pp }, { where: { basic_id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = jobService;