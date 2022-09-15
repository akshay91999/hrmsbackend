const sequelize = require('sequelize')
const db = require('../config/database');
const Basic = require('../model/basic.model');
const Contact = require('../model/contact.model');
const Job = require('../model/job.model')
const mailService=require('./mailer.services')
var jobService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(jobdata,res,pid) {
    const t = await db.transaction();
    try{
       
        const jobs = await Job.create({...jobdata,basic_id:pid},{transaction:t});
        const contact=await Contact.findOne({where:{basic_id:pid}}) 
        const pp=await Basic.findOne({where:{id:pid}})
        let email = contact.email;
        let pass = pp.dob;
        let name=pp.firstname;
        const mailed = mailService.mailer(email, pass,name, res);//sending userid and password to employee  
        t.commit();
        return res.status(200).json({ message: "success",jobs})
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
        // let pkid = id;
        // const job = await Job.findAll({where: { basic_id: pkid }} , { transaction: t })
        const [job,metadata]=await db.query("SELECT dp.departmentname,ds.designation,j.user_type,j.package,j.jobtype,j.doj,j.deletedat FROM public.jobs AS j,public.departments AS dp,public.designations AS ds WHERE j.basic_id="+id+" AND j.dp_id=dp.dp_id AND j.ds_id=ds.ds_id", { transaction: t })
        t.commit();
        if (!job.deletedat) {
            return (job.reduce((obj, item) => ({ ...obj, [item[1]]: item })))
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