const Request = require('../model/leave_request.model.js');
const Upload = require('../model/upload.model.js');
const Basic = require('../model/basic.model.js');
const job = require('../model/job.model.js');
const department = require('../model/leave_request.model.js');



const db=require("../config/database");
var requestService = {
    findAll: findAll,
    add:add,
     updateRequest: updateRequest
}

function findAll() {
      return Request.findAll();
}
//request for leave
async function add(Adata,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const addleave = await Request.create({...pp,basic_id:pid}, { transaction: t });
        const pic = await U.create({...pp,basic_id:pid}, { transaction: t });

        t.commit();
        return res.status(200).json({addleave})
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