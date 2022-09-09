const Visitor = require('../model/visitor.model.js');
const db = require("../config/database")
const path = require('path')
var visitorService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateVisitor: updateVisitor
}
async function add(visitdata, pid, res, doc) {
    const t = await db.transaction();
    try {
        let pp = visitdata;
        const visitors = await Visitor.create({ ...pp, user_id: pid, photo: doc, status: "checkin" }, { transaction: t });
        t.commit();
        return res.status(200).json({ visitors })
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }
}

function findById() {
    return Visitor.findById();
}

async function findAll(id, res) {
    const t = await db.transaction();
    try {
        const visitor = await Visitor.findOne({ where: { id: id, status: "checkin" } }, { transaction: t })
        t.commit();
        return res.status(200).json()
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

function deleteById(id) {
    return Visitor.destroy({ where: { id: id } });
}


function updateVisitor(visitor, id) {
    var updateVisitor = {
        name: visitor.name,
        photo: visitor.photo,
        address: visitor.address,
        idproof_no: visitor.idproof_no,
        time_in: visitor.time_in,
        time_out: visitor.time_out,
        contact_person: visitor.contact_person,
        departmentname: visitor.departmentname,


    };
    return Visitor.update(updateVisitor, { where: { id: id } });
}
module.exports = visitorService;