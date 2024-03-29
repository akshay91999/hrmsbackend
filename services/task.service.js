const sequelize = require('sequelize')
const db = require('../config/database')

const Basics = require('../model/basic.model')
const Contact = require('../model/contact.model')
const Job = require('../model/job.model')
const Dept = require('../model/department.model')
const Desig = require('../model/designation.model')
const Address = require('../model/address.model')
const Task = require('../model/task.model')
const Basic = require('../model/basic.model')
var taskService = {
    add: add,
    find:find,
    findAll:findAll,
    update: update,
    
    
}

async function add(task,res,job,pid) {
    const t = await db.transaction();
    try{
        let pp = task;
        const jb = await Job.findOne({where:{dp_id:job.dp_id,ds_id:job.ds_id}});
        const addTask = await Task.create({...pp,basic_id:pid,dp_id:jb.dp_id,ds_id:jb.ds_id},{transaction:t});
        t.commit();
        return res.status(200).json({addTask})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}



async function find(req, res) {
    const t = await db.transaction();
    try {
        const [task, metadata] = await db.query("SELECT r.*,b.firstname||' '||b.lastname as name,c.email,c.contactnumber,d.departmentname FROM public.jobs AS r ,public.basics as b,public.contacts as c,public.departments AS d WHERE b.id=r.basic_id AND c.basic_id=b.id AND d.dp_id=r.dp_id", { transaction: t })
        t.commit();
        return ({task})
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e)
    }
}


 async function findAll(id,req,res) {
    const t = await db.transaction();
    try {
        const basic = await Basic.findOne({attributes:['firstName']},{where:{basic_id:id}})
        const job = await Job.findOne({where:{basic_id:id}})
        const des = await Desig.findOne({attributes:['designation']},{where:{ds_id:job.ds_id}})
        const contact = await Contact.findOne({attributes:['contactnumber','email']},{where:{basic_id:id}})
        const addr = await Address.findOne({attributes:['e_address']},{where:{basic_id:id}})
        const ttask = await Task.findAll({where:{basic_id:id}})
        const  ttk = await Task.count({where:{basic_id:id}})
        const ctask = await Task.findAll({where:{status:"completed",basic_id:id}})
        const ctk = await Task.count({where:{status:"completed",basic_id:id}})
        const otask = await Task.findAll({where:{status:null,basic_id:id}})
        const otk = await Task.count({where:{status:null,basic_id:id}})

        t.commit();
        return res.status(200).json({basic,des,contact,addr,ttask,ttk,ctask,ctk,otask,otk})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function update(tk,id,res) {
    const t = await db.transaction();
    try {
        let pp = tk;

        
        const tsk = await Task.update({...pp,completed_date:sequelize.literal('CURRENT_TIMESTAMP'),status:"completed" }, { where: { basic_id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = taskService;