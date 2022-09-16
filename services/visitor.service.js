const Visitor = require('../model/visitor.model.js');
const db=require("../config/database")

var visitorService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateVisitor: updateVisitor
}
async function add(Adata,pid,res,doc) {

    const t =  await db.transaction();
    try {
        let pp = Adata;
        const visitors = await Visitor.create({...pp,user_id:pid,photo:doc}, { transaction: t });
        t.commit();
        return res.status(200).json({visitors})
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return(e);
    }

}
async function findAll(req, res) {
    const t = await db.transaction();
    try{
    
    const visitor =await Visitor.findAll({attributes:["name","address","idproof_no","time_in","time_out","contact_person","departmentname"]},{transaction: t });
    const visitorlist =await Visitor.findAll({attributes:["name","reason","contact_person","date","status"]},{transaction: t });
    t.commit();
    return {visitor,visitorlist}
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path }) 
    }
}

async function findById(pid, res) {
    const t = await db.transaction();
    try {
        
        const visitor = await Visitor.findOne({ where: { id: pid} }, { transaction: t })
        t.commit();
        return res.status(200).json({visitor})
    
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

function deleteById(id) {
    return Visitor.destroy({ where: { id: id } });
}

async function updateVisitor(visitor, id) {
    const t = await db.transaction();
    try {
        const upvacancy = await Visitor.update({...visitor}, { where: { id: id } });
        t.commit();
        return res.status(200).json({ message: "Updated successfully"})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
    return 
        
        
    };
module.exports = visitorService;