const db = require("../config/database")
const depart = require('../model/department.model');
const Grievance = require('../model/grievance.model.js');

var grievanceService = {

    add: add,
    findAll: findAll,
    deleteById: deleteById,
    updateGrievance: updateGrievance

}
function findAll() {
    return Grievance.findAll();
}
function deleteById(id) {
    return Grievance.destroy({ where: { id: id } });
}

async function add(Adata,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const grievance = await Grievance.create({...pp,basic_id:pid}, { transaction: t });
        
        t.commit();
        return res.status(200).json({grievance})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}
function updateGrievance(grievance, id) {
   
    return Grievance.update({...grievance}, { where: { id: id } });

}
module.exports = grievanceService;