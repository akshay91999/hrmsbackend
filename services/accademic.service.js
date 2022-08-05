const Academic = require('../model/accademic.model.js');
const db=require("../config/database")

var academicDao = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateAcademic: updateAcademic
}

function findAll() {
    return Academic.findAll();
}

function findById(id) {
    return Academic.findByPk(id);
}

function deleteById(id) {
    return Academic.destroy({ where: { id: id } });
}

async function add(gig,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp = gig;
      
        
        const createUser = await Academic.create({...pp,user_id:pid}, { transaction: t });
        
        t.commit();
        return res.status(200).json({createUser})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}


function updateAcademic(academic, id) {
    var updateAcademic = {
        institution_name:academic.institution_name,
        programme: academic.programme,
        board: academic.board,
        branch: academic.branch,
        course_type: academic.course_type,
        score:academic.score,
        duration:academic.duration,
        cerificate:academic.cerificate,
        course:academic.course
    };
    return Academic.update(updateAcademic, { where: { id: id } });
}
module.exports = academicDao;