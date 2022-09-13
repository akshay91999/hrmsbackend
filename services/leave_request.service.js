const sequelize = require('sequelize')
const Request = require('../model/leave_request.model.js');
const { Op } = require('sequelize')
const db = require("../config/database");
const leavePackage = require('../model/leavepackage.model');
const Reject = require('../model/lvReject.model');
const moment=require('moment')

var requestService = {
    add: add,
    findAll: findAll,//all pending
    findById: findById,//accepted leavs of purticular employee 
    rejectleave:rejectleave,//add reject
    updateRequest: updateRequest,//update leave
    viewrejectlv:viewrejectlv//view rejected lv for HR
}
//request for leave
async function add(rData, pid, res) {
    const t = await db.transaction();
    try {

        let pp = rData;
        let no_days = moment(rData.leave_to,"YYYY/MM/DD").diff(moment(rData.leave_from,"YYYY/MM/DD"),'days')
        console.log(no_days)
        const addleave = await Request.create({ ...pp, basic_id: pid ,no_days:no_days}, { transaction: t });
        t.commit();
        return res.status(200).json({message:"success"});
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }
}
// get all leave request for HR to aprove leave
async function findAll(req, res) {
    const t = await db.transaction();
    try {
        const [hrleave, metadata] = await db.query("SELECT r.*,b.firstName||' '||b.lastName as name,d.departmentname FROM public.requests AS r ,public.basics as b,public.jobs as j,public.departments AS d WHERE b.id=r.basic_id AND j.basic_id=b.id AND status='pending' AND d.dp_id=j.dp_id", { transaction: t })
        t.commit();
        return (hrleave)
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e)
    }
}
//employee leave details
async function findById(id, res) {
    try {
        const t = await db.transaction();
        const current = new Date().getFullYear() + "-01" + "-01"
        const Lv = await leavePackage.findOne({ attribute: ['total_paid', 'total_unpaid'] }, { where: { id: id } }, { transaction: t }) //total granted leave
        const usedPaid = await Request.sum('no_days', { where: { "leave_from": { [Op.gt]: current }, leave_type: "paid", status: "accept" } }, { transaction: t });
        const usedUnpaid = await Request.sum('no_days', { where: { "leave_from": { [Op.gt]: current }, leave_type: "unpaid", status: "accept" } }, { transaction: t });
        const balancePaid = Lv.total_paid - usedPaid
        const balanceUnpaid = Lv.total_unpaid - usedUnpaid
        const leaveData = await Request.findAll({ where: { basic_id: id, "leave_from": { [Op.gt]: current }, status: "accept" } }, { transaction: t });
        t.commit();
         return { balancePaid, usedPaid, balanceUnpaid, usedUnpaid, leaveData }
    }
    catch (e) {
        console.log(e);
        return (e)
    }

}

async function findAll(req, res) {
    const t = await db.transaction();
    try {
        const [hrleave, metadata] = await db.query("SELECT r.*,b.firstName,b.lastName,d.departmentname FROM public.requests AS r ,public.basics as b,public.jobs as j,public.departments AS d WHERE b.id=r.basic_id AND j.basic_id=b.id AND status='pending' AND d.dp_id=j.dp_id", { transaction: t })
        t.commit();
        return (hrleave)
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e)
    }
}
//reject a leave by HR
async function rejectleave(request, id) {
    var updateRequest = await Request.update({status:'reject' }, { where: { id: id } });
    var update = await Reject.create({ ...request , lv_id: id});
    return { message: "updated" };
}
async function viewrejectlv(req, res) {
    const t = await db.transaction();
    try {
        const [hrleaverej, metadata] = await db.query("SELECT r.leave_type,r.leave_from,r.leave_to,b.firstName,b.lastName,d.departmentname,lr.rejectreason FROM public.leav_rejects AS lr ,public.requests AS r ,public.basics as b,public.jobs as j,public.departments AS d WHERE r.id=lr.lv_id AND b.id=r.basic_id AND j.basic_id=b.id AND r.status='reject' AND d.dp_id=j.dp_id", { transaction: t })
        t.commit();
        return (hrleaverej)
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e)
    }
}
async function updateRequest(request, id) {
    var updateRequest = await Request.update({ ...request }, { where: { id: id } });
    var updateRequest = await Approval.update({ ...request }, { where: { lv_id: id } });
    return { message: "updated" };
}


module.exports = requestService;