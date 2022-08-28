const Request = require('../model/leave_request.model.js');
//const Upload = require('../model/upload.model.js');
const Basic = require('../model/basic.model.js');
const job = require('../model/job.model.js');
const department = require('../model/department.model.js');
const approval = require('../model/approval.model')
const {Op}=require('sequelize')


const db=require("../config/database");
var requestService = {
    findAll: findAll,
    findById:findById,
    add:add,
     updateRequest: updateRequest
}

function findAll() {
      return Request.findAll();
}

async function findById(id,res) {
    try {
        const current = new Date().getFullYear()+"-01"+"-01"
        
        const paid = await Request.sum({attributes:['no_days']},{where:{[Op.gt]:[{leave_from},{current}],leave_type:"paid"}} );
        return res.status(200).json({paid})
    }
    catch (e) {
        console.log(e);
       
    }
   
}
//request for leave
async function add(Adata,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const addleave = await Request.create({...pp,basic_id:pid}, { transaction: t });
        //const pic = await Upload.findOne({attribute:['document']}, {basic_id:pid,type}, { transaction: t });
        const fname = await Basic.findOne({attribute:['firstName','id']},{where:{id:pid}}, { transaction: t });
        const jb = await job.findOne({attribute:['dp_id']}, {where:{basic_id:pid}}, { transaction: t });
        const dpt = await department.findOne({attribute:['departmentname']}, {where:{dp_id:job.dp_id}}, { transaction: t });
        let leave_from = pp.leave_from
        let no_days = pp.no_days
        let leave_type = pp.leave_type
        let reason = pp.reason
        let name = fname.firstName
        let departmentname = dpt.departmentname
        const hrget = {name,departmentname,no_days,leave_type,leave_from,reason}
        const approve = await approval.create({...hrget},{transaction:t})
        t.commit();
        return res.status(200).json({addleave,approve})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}

async function updateRequest(request, id) {
    var updateRequest = await Request.update({...request},{where:{basic_id:id}})
    return {updateRequest};
}


module.exports = requestService;