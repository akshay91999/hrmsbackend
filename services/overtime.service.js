const sequelize = require('sequelize')
const db = require('../config/database')


const Basic = require('../model/basic.model')
const Job = require('../model/job.model')
const Overtime = require('../model/overtime.model')
var OvertimeService = {
    add: add,
    findAll:findAll,
    findId:findId
    
    
}

async function add(Tn,emp, res) {
    const t = await db.transaction();
    try{
        let pp = Tn;
       const basic = await Basic.findOne({where:{firstName:Tn.employeename}})
        const job = await Job.findOne({where:{basic_id:basic.id}})
        

        const overtime = await Overtime.create({...pp,basic_id:basic.id,dp_id:job.dp_id},{transaction:t});
        t.commit();
        return res.status(200).json({overtime})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}


async function findId(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        //const tn = await Training.findByPk(pkid , { transaction: t })
       
        const overtime = await Overtime.findAll({where: {basic_id:pkid}},{transaction:t}) 
        t.commit();
        return res.status(200).json({overtime})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}

function findAll() {
    return Overtime.findAll();
}

module.exports = OvertimeService;