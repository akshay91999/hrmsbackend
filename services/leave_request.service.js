const Request = require('../model/leave_request.model.js');
//const Upload = require('../model/upload.model.js');
const Basic = require('../model/basic.model.js');
const job = require('../model/job.model.js');
const department = require('../model/department.model.js');
const {Op}=require('sequelize')
const db=require("../config/database");
const leavePackage=require('../model/leavepackage.model');
const Approval = require('../model/approval.model');
var requestService = {
    findAll: findAll,
    findById:findById,
    add:add,
     updateRequest: updateRequest
}

function findAll() {
      return Request.findAll({where:{status:"pending"}});
    //   also get name
}

async function findById(id,res) {
    try {
        
        const current = new Date().getFullYear()+"-01"+"-01"
        const Lv=await leavePackage.findOne({attribute:['total_paid','total_unpaid']},{where:{id:id}}) //total granted paid leave
        // const unpaidLv=await leavePackage.findOne({attribute:['total_unpaid']},{where:{id:"1"}})//total granted unpaid leave
        const usedPaid = await Request.sum('no_days',{where:{"leave_from":{[Op.gt]:current},leave_type:"paid",status:"accept"}});
        const usedUnpaid = await Request.sum('no_days',{where:{"leave_from":{[Op.gt]:current},leave_type:"unpaid",status:"accept"}});
        const balancePaid=Lv.total_paid-usedPaid
        const balanceUnpaid=Lv.total_unpaid-usedUnpaid
        const leaveData= await Request.findAll({where:{basic_id:id,"leave_from":{[Op.gt]:current},leave_type:"unpaid",status:"accept"}});
        return {balancePaid,usedPaid,balanceUnpaid,usedUnpaid,leaveData}
    }
    catch (e) {
        console.log(e);
       return (e)
    }
   
}
//request for leave
async function add(rData,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp =rData;
        const addleave = await Request.create({...pp,basic_id:pid}, { transaction: t });
        // //const pic = await Upload.findOne({attribute:['document']}, {basic_id:pid,type}, { transaction: t });
        // const fname = await Basic.findOne({attribute:['firstName','id']},{where:{id:pid}}, { transaction: t });
        // const jb = await job.findOne({attribute:['dp_id']}, {where:{basic_id:pid}}, { transaction: t });
        // const dpt = await department.findOne({attribute:['departmentname']}, {where:{dp_id:job.dp_id}}, { transaction: t });
        // let leave_from = pp.leave_from
        // let no_days = pp.no_days
        // let leave_type = pp.leave_type
        // let reason = pp.reason
        // let name = fname.firstName
        // let basic_id=fname.id
        // let lv_id=addleave.id
        // let departmentname = dpt.departmentname
        // const hrget = {name,departmentname,no_days,leave_type,leave_from,reason,basic_id,lv_id}
        // const approve = await Approval.create({...hrget},{transaction:t})
        t.commit();
        return res.status(200).json({addleave})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}

async function updateRequest(request, id) {
    var updateRequest = await Request.update({...request},{where:{id:id}});
    var updateRequest = await Approval.update({...request},{where:{lv_id:id}});
    return {message: "updated"};
}


module.exports = requestService;