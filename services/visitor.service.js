const Visitor = require('../model/visitor.model.js');
const db=require("../config/database")
const path = require('path')
const multer = require('multer')
var visitorService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateVisitor: updateVisitor
}

function findAll() {
    return Visitor.findAll();
}

function findById(id) {
    return Visitor.findByPk(id);
}

function deleteById(id) {
    return Visitor.destroy({ where: { id: id } });
}

async function add(Adata,pid,res) {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './images');
         },
        filename: function (req, file, cb) {
            cb(null , file.originalname);
        }
    });
    var photo = multer({ storage: storage })
   
    const t =  await db.transaction();
    try {

        let pp = Adata;
      
        
        const createUser = await Visitor.create({...pp,basic_id:pid}, { transaction: t });
        
        t.commit();
        return res.status(200).json({createUser})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}


function updateVisitor(visitor, id) {
    var updateVisitor = {
        name:visitor.name,
        address: visitor.address,
        idproof_no: visitor.id_proofno,
        time_in: visitor.time_in,
        time_out: visitor.time_out,
        contactperson:visitor.contactperson,
        departmentname:visitor.departmentname,
        
        
    };
    return Visitor.update(updateVisitor, { where: { id: id } });
}
module.exports = visitorService;