const Learning = require('../model/learning.model.js');
const db = require("../config/database")
const depart = require('../model/department.model')

var learningService = {

    add: add,
    findAll: findAll,
    deleteById: deleteById,
    updateLearning: updateLearning

}
function findAll(id,res) {
    return Learning.findAll({where:{basic_id:id}});
}
function deleteById(id) {
    return Learning.destroy({ where: { id: id } });
}

async function add(Adata, pid, res) {
    const t = await db.transaction();
    try {
        let pp = Adata;
        const dptId = pp.dp_id;
        const dpname = await depart.findOne({ where: { dp_id: dptId } })
        const learn = await Learning.create({ ...pp, basic_id: pid, departmentname: dpname }, { transaction: t });

        t.commit();
        return res.status(200).json({ learn })
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}
function updateLearning(learn, id) {
   
    return Learning.update({...learn}, { where: { id: id } });

}



module.exports = learningService;