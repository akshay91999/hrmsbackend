const sequelize = require('sequelize')
const db = require('../config/database')

const EmpTraining = require('../model/emptraining.model')
const Basic = require('../model/basic.model')
const Job = require('../model/job.model')
const Dept = require('../model/department.model')
const Training = require('../model/training.model')
var EmpTrnService = {
    add: add,
    findAll:findAll,
    findById: findById,
    findId:findId,
    find:find,
    update: update,
    updateHR:updateHR,
    checkin:checkin,
    checkout:checkout
    
    
}

async function add(Tn, emp,trn,dpt,res,pid) {
    const t = await db.transaction();
    try{
        let pp = Tn;
        //const basic = await Basic.create({...pp},{transaction:t});
        const basic = await Basic.findOne({where:{id:emp.id}},{transaction:t});
        const dpt = await Job.findOne({where:{basic_id:pid}},{transaction:t});
        const training = await Training.findOne({where:{training_name:Tn.training_name}},{transaction:t});

        const EmpTrng = await EmpTraining.create({...pp,basic_id:basic.id,dp_id:pid,training_name:Tn.training_name,training_date:Tn.training_date},{transaction:t});
        t.commit();
        return res.status(200).json({EmpTrng})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

async function findById(tn, res) {
    const t = await db.transaction();
    try {
        let pkid = tn;
        //const tn = await Training.findByPk(pkid , { transaction: t })
       
        const tn2 = await EmpTraining.findAll({where: {dp_id:pkid}},{transaction:t}) 
        t.commit();
        return res.status(200).json({tn2})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function findId(id,tn, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        //const tn = await Training.findByPk(pkid , { transaction: t })
       
        const tn2 = await EmpTraining.findAll({where: {basic_id:pkid,training_date:tn.training_date,time_schedule:tn.time_schedule,status:"allowed"}},{transaction:t}) 
        t.commit();
        return res.status(200).json({tn2})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function find(tn,dpt, res) {
    const t = await db.transaction();
    try {
        let pp=tn
        //const tn = await Training.findByPk(pkid , { transaction: t })
        const dept = await Dept.findOne({where:{dp_id:dpt.dp_id}})
        const tn2 = await EmpTraining.findAll({where: {dp_id:dept.dp_id,training_name:pp.training_name}},{transaction:t}) 
        t.commit();
        return res.status(200).json({tn2})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function update(up, id,trn,trn1,res) {
    const t = await db.transaction();
    try {
        let pp = up;

        const basic = await Basic.findOne({where:{id:trn.id}})
        const emptrng = await EmpTraining.update({...pp,basic_id:basic.id} ,{ where: { dp_id: id,training_name:trn1.training_name } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", emptrng})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function updateHR(up, trn,dpt,res) {
    const t = await db.transaction();
    try {
        let pp = up;

        const dept = await Dept.findOne({where:{dp_id:dpt.dp_id}})
        const trng = await Training.findOne({where:{training_name:trn.training_name,dp_id:dept.dp_id}})
        const emptrng = await EmpTraining.update({...pp} ,{ where: { dp_id:dept.dp_id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully" })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function checkin(id,res) {
    const t = await db.transaction();
    try {
        

        
        const cin = await EmpTraining.update({checkin:sequelize.literal('CURRENT_TIMESTAMP')}, { where: { basic_id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function checkout(id,res) {
    const t = await db.transaction();
    try {
        

        
        const cin = await EmpTraining.update({checkout:sequelize.literal('CURRENT_TIMESTAMP')}, { where: { basic_id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
function findAll() {
    return EmpTraining.findAll();
}

module.exports = EmpTrnService;