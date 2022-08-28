const Learning = require('../model/learning.model.js');
const db=require("../config/database")

var learningService = {
    
    add: add,
    findAll:findAll,
    deleteById:deleteById,
    updateLearning:updateLearning
   
}
function findAll() {
    return Learning.findAll();
}
function deleteById(id) {
    return Learning.destroy({ where: { id: id } });
}

async function add(Adata,pid,res) {

   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const learn = await Learning.create({...pp,basic_id:pid}, { transaction: t });
        
        t.commit();
        return res.status(200).json({learn})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}
function updateLearning(learn, id) {
    var updateLearning = {
        link:learning.link,
        description: learning.description,
        department:learning.department
        
    };
    return Learning.update(updateLearning, { where: { id: id } });

}



module.exports = learningService;