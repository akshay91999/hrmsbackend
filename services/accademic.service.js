const Academic = require('../model/accademic.model.js');
const Basic = require('../model/basic.model.js');


const db=require("../config/database");


var academicService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateAcademic: updateAcademic
}
async function add(csData,pid,res) {
   
    const t =  await db.transaction();
    try {

        let pp = csData;
      
          const academic = await Academic.create({...pp,basic_id:pid}, { transaction: t });
        
        t.commit();
        return res.status(200).json({message: "success"})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}


function findAll() {
    return Academic.findAll();
}

async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const base = await Basic.findByPk(pkid, { transaction: t })
        
        const acdemic = await Academic.findAll({where: { basic_id: pkid }} , { transaction: t })
        t.commit();
        if (!acdemic.deletedAt) {
            return res.status(200).json({acdemic})
        }
        else {
            return res.status(201).json({ message: "user not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
        
    }
    

function deleteById(id) {
    return Academic.destroy({ where: { id: id } });
}

function updateAcademic(academic, id) {
    var updateAcademic = {
        school:academic.school,
        board: academic.board,
       
        branchid: academic.branchid,
        coursetype: academic.coursetype,
        score:academic.score,
        durtnfrm:academic.durtnfrm,
        durtnto:academic.durtnto
    };
    return Academic.update(updateAcademic, { where: { id: id } });
}
module.exports = academicService;