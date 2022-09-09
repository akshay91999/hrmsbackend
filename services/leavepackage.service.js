const Leave = require('../model/leavepackage.model.js');
const Request = require('../model/leave_request.model')
const db = require("../config/database")
const sequelize = require('sequelize')
var leaveService = {
    findAll: findAll,
    add: add,

    deleteById: deleteById,
    updateLeave: updateLeave
}

function findAll() {
    return Leave.findAll();
}



function deleteById(id) {
    return Leave.destroy({ where: { id: id } });
}

async function add(req, res) {


    const t = await db.transaction();
    try {
        let pp = req.body;
        const leaveallot = await Leave.create({ ...pp }, { transaction: t });
        t.commit();
        return res.status(200).json({ leaveallot })
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }
}
function updateLeave(leave, id) {
    var updateLeave = {
        total_paid: leave.total_paid,
        total_unpaid: leave.total_unpaid

    };
    return Leave.update(updateLeave, { where: { id: id } });
}
module.exports = leaveService;