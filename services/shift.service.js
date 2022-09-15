const sequelize = require('sequelize')
const db = require('../config/database')


const Basic = require('../model/basic.model')
const Job = require('../model/job.model')
const Shift = require('../model/shift.model')
var ShiftService = {
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
        

        const shift = await Shift.create({...pp,basic_id:basic.id,dp_id:job.dp_id},{transaction:t});
        t.commit();
        return res.status(200).json({shift})
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
       
        const tn2 = await Shift.findAll({where: {basic_id:pkid}},{transaction:t}) 
        t.commit();
        return res.status(200).json({tn2})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}

function findAll() {
    return Shift.findAll();
}

module.exports = ShiftService;