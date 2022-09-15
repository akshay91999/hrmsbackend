const sequelize = require('sequelize')
const Request = require('../model/leave_request.model.js');
const { Op } = require('sequelize')
const db = require("../config/database");
const leavePackage = require('../model/leavepackage.model');
const Reject = require('../model/lvReject.model');
const moment = require('moment')

var requestService = {
    add: add,
    findAll: findAll,//all pending
    findById: findById,//accepted leaves of purticular employee 
    rejectleave: rejectleave,//add reject
    updateRequest: updateRequest,//update leave
    findAllapprovedlv: findAllapprovedlv,// APPROVED LEAVES FOR HR
    viewrejectlv: viewrejectlv,//view rejected lv for HR
    viewappliedlv:viewappliedlv//view applied lv for employee
}
//request for leave
async function add(rData, pid, res) {
    const t = await db.transaction();
    try {

        let pp = rData;
        let no_days = moment(rData.leave_to, "YYYY/MM/DD").diff(moment(rData.leave_from, "YYYY/MM/DD"), 'days')+1
        console.log(no_days)
        const addleave = await Request.create({ ...pp, basic_id: pid, no_days: no_days }, { transaction: t });
        t.commit();
        return res.status(200).json({ message: "success" });
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
        const [hrleave, metadata] = await db.query("SELECT r.*,b.firstname||' '||b.lastname as name,d.departmentname,r.leave_from||'-'||r.leave_to as date FROM public.requests AS r ,public.basics as b,public.jobs as j,public.departments AS d WHERE b.id=r.basic_id AND j.basic_id=b.id AND status='pending' AND d.dp_id=j.dp_id AND j.user_type!='3'", { transaction: t })
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
        const today= moment().format("YYYY-MM-DD");                                

        const t = await db.transaction();
        const currentyear = new Date().getFullYear() + "-01" + "-01"
        const Lv = await leavePackage.findOne({ attribute: ['total_paid', 'total_unpaid'] }, { where: { id: id } }, { transaction: t }) //total granted leave
        const usedPaid = await Request.sum('no_days', { where: { "leave_from": { [Op.gt]: currentyear }, leave_type: "paid", status: "accept" } }, { transaction: t });
        const usedUnpaid = await Request.sum('no_days', { where: { "leave_from": { [Op.gt]: currentyear }, leave_type: "unpaid", status: "accept" } }, { transaction: t });
        const balancePaid = Lv.total_paid - usedPaid
        const balanceUnpaid = Lv.total_unpaid - usedUnpaid
        const leaveData = await Request.findAll({ where: { basic_id: id, "leave_from": { [Op.gt]: currentyear },"leave_from": { [Op.lt]: today }, deletedat: null ,status:'accept'} }, { transaction: t });
        t.commit();
        return { balancePaid, usedPaid, balanceUnpaid, usedUnpaid, leaveData }
    }
    catch (e) {
        console.log(e);
        return (e)
    }

}
// approved leaves view for HR
async function findAllapprovedlv(req, res) {
    const t = await db.transaction();
    try {

        const [hrleave, metadata] = await db.query("SELECT r.*,b.firstName||' '||b.lastName as name,d.departmentname FROM public.requests AS r ,public.basics as b,public.jobs as j,public.departments AS d WHERE b.id=r.basic_id AND j.basic_id=b.id AND status='accept' AND d.dp_id=j.dp_id", { transaction: t })


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
    const t = await db.transaction();
    var updateRequest = await Request.update({ status: 'reject' }, { where: { id: id } }, { transaction: t });
    var update = await Reject.create({ ...request, lv_id: id }, { transaction: t });
    t.commit();

    return { message: "updated" };
}
// (/reject api...)
async function viewrejectlv(req, res) {
    let basic_id=req.params.id
    const t = await db.transaction();
    try {
        const [hrleaverej, metadata] = await db.query("SELECT r.leave_type,r.leave_from||'-'||r.leave_to as date,b.firstname||' '||b.lastname AS name,d.departmentname,lr.rejectreason FROM public.leav_rejects AS lr ,public.requests AS r ,public.basics as b,public.jobs as j,public.departments AS d WHERE r.id=lr.lv_id AND b.id=r.basic_id AND j.basic_id=b.id AND r.status='reject' AND d.dp_id=j.dp_id AND r.basic_id="+basic_id, { transaction: t })
        t.commit();
        return (hrleaverej)
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e)
    }
}
async function viewappliedlv(req, res) {
    let basic_id=req.body.id
    const t = await db.transaction();
    try {
        const today= moment().format("YYYY-MM-DD");                                

        const t = await db.transaction();
        const currentyear = new Date().getFullYear() + "-01" + "-01"
        const leaveData = await Request.findAll({ where: { basic_id: basic_id, "leave_from": { [Op.gt]: currentyear },"leave_from": { [Op.gt]: today }, deletedat: null ,[Op.or]: [{ status:'accept' }, {status:'pending'}],} }, { transaction: t });
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
    return { message: "updated" };
}


module.exports = requestService;