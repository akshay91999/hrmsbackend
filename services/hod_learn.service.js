const Learn= require('../model/learning.model.js');
const db=require("../config/database")
const department = require('../model/department.model.js');
const job = require('../model/job.model.js');
var learnService = {
    
    add: add,
    findAll:findAll,
    deleteById:deleteById,
    updateLearn:updateLearn
   
}
function findAll() {
    return Academic.findAll();
}
function deleteById(id) {
    return Academic.destroy({ where: { id: id } });
}


async function add(Adata,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const learn = await Learn.create({...pp,basic_id:pid}, { transaction: t });
        const dpt = await department.findOne({attribute:['departmentname']}, {where:{dp_id:job.dp_id}}, { transaction: t });
        //let departmentname = dpt.departmentname
        
        
        t.commit();
        return res.status(200).json({learn})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }


}
function updateLearn(learn, id) {
    var updateLearn = {
        link:learn.link,
        description: learn.description,
        
    };
    return Learn.update(updateLearn, { where: { id: id } });

}


module.exports = learnService;