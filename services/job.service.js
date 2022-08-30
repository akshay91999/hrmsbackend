// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
const Basic = require('../model/basic.model')
const Contact = require('../model/contact.model')
const Dept = require('../model/department.model')
const Job = require('../model/job.model')
const View = require('../model/empview.model')
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
        const basic = await Basic.findOne({attributes:['id','firstName']},{where:{basic_id:pid}},{transaction:t});
        const contact = await Contact.findOne({attributes:['email','contactnumber']},{where:{basic_id:pid}},{transaction:t});
        
        const jobs = await Job.create({...pp,basic_id:pid},{transaction:t});
<<<<<<< HEAD
        const dpt= await Dept.findOne({attributes:['departmentname']},{where:{dp_id:jobs.dp_id}},{transaction:t});
        let basic_id = basic.id
        let name = basic.firstName
        let email = contact.email
        let contactnumber = contact.contactnumber
        let departmentname = dpt.departmentname
        const data = {basic_id,name,email,contactnumber,departmentname}
        const view = await View.create({...data},{transaction:t})
=======
        
>>>>>>> 00dd83dca7d9425721dfb816489078759923b4ba
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