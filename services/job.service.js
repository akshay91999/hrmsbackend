// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
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

function findById(id) {
    return Job.findByPk(id);
}
function deleteById(id) {
    return Job.destroy({ where: { id: id } });
}

function update(job, id) {
    var updateJob = {
        designation:job.designation,
        department: job.department,
        branch: job.branch,
        package: job.package,
        typeid: job.typeid,
        doj:job.doj,
        
    };
    return Job.update(updateJob, { where: { id: id } });
}

module.exports = jobService;