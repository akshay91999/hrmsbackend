const Learning = require('../model/learning.model.js');
const db = require("../config/database")
const depart = require('../model/department.model')

var learningService = {

    add: add,
    findAllLink: findAllLink,
    findBydpid: findBydpid,
    deleteById: deleteById,
    updateLearning: updateLearning
}
async function add(learndata, dp_id, res) {
    const t = await db.transaction();
    try {
        const dpname = await depart.findOne({ where: { dp_id: dp_id } }, { transaction: t })
        const learn = await Learning.create({ ...learndata, departmentname: dpname.departmentname }, { transaction: t });

        t.commit();
        return res.status(200).json({ learn })
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}

async function findBydpid(dp_id) {
    try {
        const dpname = await depart.findOne({ where: { dp_id: dp_id } })
        return Learning.findAll({ where: { departmentname: dpname.departmentname } });
    }
    catch (e) {
        console.log(e);
        return (e)
    }
}
async function findAllLink(req,res) {
    try {
        const allData = await Learning.findAll({ where: { deletedAt: null } });
        console.log(allData)
        return res.status(201).json({message:"SUCCESS",allData}) 

    }
    catch (e) {
        console.log(e);
        return res.status(202).json({messege: e}) 

    }
}
function updateLearning(learn, id) {
    try {
        return Learning.update({ ...learn }, { where: { id: id } });
    }
    catch (e) {
        console.log(e);
        
        return (e)
    }
}
// delete
function deleteById(id) {
    try {
        return Learning.destroy({ where: { id: id } });
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e)
    }
}


module.exports = learningService;