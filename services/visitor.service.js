const Visitor = require('../model/visitor.model.js');
const db=require("../config/database")

//const multer = require('multer')
var visitorService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateVisitor: updateVisitor
}
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './images');
//      },
//     filename: function (req, file, cb) {
//         cb(null , file.originalname);
//     }
// });
// var photo = multer({ storage: storage })

async function findAll(req, res) {
    const t = await db.transaction();
    try{
    
    const visitor =await Visitor.findAll({attributes:["name","address","idproof_no","time_in","time_out","contact_person","departmentname"]},{transaction: t });
    const visitorlist =await Visitor.findAll({attributes:["name","reason","contact_person","date","status"]},{transaction: t });
    t.commit();
    //console.log(name,departmentname)
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

async function add(Adata,pid,res,doc) {

   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const visitors = await Visitor.create({...pp,user_id:pid,photo:doc,status:"checkout"}, { transaction: t });
        //const visitor = await Candidate.findOne({ where: { id: can_id,status:"pending"} }, { transaction: t })

        
        t.commit();
        return res.status(200).json({visitors})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}


function updateVisitor(visitor, id) {
    var updateVisitor = {
        name:visitor.name,
        photo:visitor.photo,
        address: visitor.address,
        idproof_no: visitor.idproof_no,
        time_in: visitor.time_in,
        time_out: visitor.time_out,
        contact_person:visitor.contact_person,
        departmentname:visitor.departmentname,
        
        
    };
    return Visitor.update(updateVisitor, { where: { id: id } });
}
module.exports = visitorService;