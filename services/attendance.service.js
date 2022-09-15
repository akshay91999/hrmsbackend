const sequelize = require('sequelize')
const db = require('../config/database')
const { Op, Sequelize,moment } = require('sequelize')
const Attendance = require('../model/attendance.model')
const Basic = require('../model/basic.model')
const Job = require('../model/job.model')
const Dept = require('../model/department.model')
const Request = require('../model/leave_request.model')
const Shift = require('../model/shift.model')
var AttendanceService = {
    add: add,
    find:find,
    findAll:findAll,
    findId:findId,
    update: update,
    
    
}

async function add(res,pid) {
    const t = await db.transaction();
    try{
        let today = new Date();
        let time = today.getHours()           
        const basic = await Basic.findOne({where:{id:pid}},{transaction:t})
        const job = await Job.findOne({where:{basic_id:pid}},{transaction:t})
        const shift = await Shift.findOne({attributes:['shift']},{where:{date:sequelize.literal('CURRENT_DATE'),basic_id:pid}},{transaction:t})
        const attndnce = await Attendance.create({date:today,basic_id:pid,dp_id:job.dp_id,checkin:time,shift:shift.shift},{transaction:t});
        let tt=attndnce.checkin
        if(tt>10){
            const stslate =await Attendance.update({status:"late"},{where:{basic_id:pid}},{transaction:t})
           return {stslate}
        } 
        
        t.commit();
        return res.status(200).json({attndnce})
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
        
        let month = new Date().getMonth() 
        const present = await Attendance.count({where:{basic_id:pkid,"date":{ [Op.eq]: month,[Op.or]: [{status: "ontime"}, {status: "late"}]}}},{transaction:t})
        const late = await Attendance.count({where:{basic_id:pkid,"date": { [Op.eq]: month ,status: "late"}}},{transaction:t})
        const absent = await Request.sum('no_days', { where: {"leave_from": { [Op.eq]: month ,[Op.or]:[{leave_type: "paid"},{leave_type:"unpaid"}] , status: "accept" } }}, { transaction: t });
        const mypresent = await Attendance.findAll({where:{basic_id:pkid,"date":{ [Op.eq]: month,[Op.or]: [{status: "ontime"}, {status: "late"}]}}},{transaction:t})
        
        t.commit();
        return res.status(200).json({present,late,absent,mypresent})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function find(req, res) {
    const t = await db.transaction();
    try {
        let today = new Date()
        let yesterday = new Date()
        yesterday.setDate(today.getDate()-1)
        const tpresent=await Attendance.count({where: {[Op.or]: [{status: "ontime"}, {status: "late"}],date:today}},{transaction:t})
        const tontime  = await Attendance.count({where:{status:"ontime",date:today}},{transaction:t})
        const tlate = await Attendance.count({where:{status:"late",date:today}},{transaction:t})
        const [tabsent, metadata] = await db.query("SELECT COUNT(r.*) FROM public.basics AS r ,public.attendances as a WHERE a.basic_id!=r.id AND a.date=CURRENT_DATE" , { transaction: t })
        const ypresent=await Attendance.count({where: {[Op.or]: [{status: "ontime"}, {status: "late"}],date:yesterday}},{transaction:t})
        const yontime  = await Attendance.count({where:{status:"ontime",date:yesterday}},{transaction:t})
        const ylate = await Attendance.count({where:{status:"late",date:yesterday}},{transaction:t})
        const [yabsent,data] = await db.query("SELECT COUNT(r.*) FROM public.basics AS r ,public.attendances as a WHERE a.basic_id!=r.id AND a.date=CURRENT_DATE-1" , { transaction: t })
        t.commit();
        return ([tpresent,tontime,tlate,tabsent,ypresent,yontime,ylate,yabsent])
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function findAll(req, res) {
    const t = await db.transaction();
    try {
        let today = new Date()
        let yesterday = new Date()
        yesterday.setDate(today.getDate()-1)
        const tpresent=await Attendance.findAll({where: {[Op.or]: [{status: "ontime"}, {status: "late"}],date:today}},{transaction:t})
        const tontime  = await Attendance.findAll({where:{status:"ontime",date:today}},{transaction:t})
        const tlate = await Attendance.findAll({where:{status:"late",date:today}},{transaction:t})
        const [tabsent, metadata] = await db.query("SELECT r.* FROM public.basics AS r ,public.attendances as a WHERE a.basic_id!=r.id AND a.date=CURRENT_DATE" , { transaction: t })
        const ypresent=await Attendance.findAll({where: {[Op.or]: [{status: "ontime"}, {status: "late"}],date:yesterday}},{transaction:t})
        const yontime  = await Attendance.findAll({where:{status:"ontime",date:yesterday}},{transaction:t})
        const ylate = await Attendance.findAll({where:{status:"late",date:yesterday}},{transaction:t})
        const [yabsent,data] = await db.query("SELECT r.* FROM public.basics AS r ,public.attendances as a WHERE a.basic_id!=r.id AND a.date=CURRENT_DATE-1" , { transaction: t })
        t.commit();
        return ([tpresent,tontime,tlate,tabsent,ypresent,yontime,ylate,yabsent])
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
async function update(id,res) {
    const t = await db.transaction();
    try {
        let today= new Date()
        let hh = today.getHours()

        
        const cout = await EmpTraining.update({checkout:hh} ,{ where: { basic_id:id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", cout})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = AttendanceService;