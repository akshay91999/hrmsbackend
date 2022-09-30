const Visitor = require('../model/visitor.model.js');
const db = require("../config/database");
const Basic = require('../model/basic.model.js');
var moment = require('moment');


var visitorService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updatevisitor:updatevisitor,
    findByDep: findByDep
}
async function add(Adata, doc, res) {
    const t = await db.transaction();
    try {
        let pp = Adata;
        var time=moment().format("hh:mm:ss")
        const visitors = await Visitor.create({ ...pp, photo: doc ,time_in:time}, { transaction: t });
        t.commit();
        const id =visitors.id
        return res.status(200).json({ message: "success",visitor_id:id })
    }
    catch (e) {
        console.log(e);
        t.rollback();
        return (e);
    }
}
async function findAll(req, res) {
    const t = await db.transaction();
    try {
       const [visitors,metadata]=await db.query("SELECT v.*,b.firstname||' '||b.lastname AS e_name,b.id AS e_id,dp.departmentname FROM public.visitors AS v,public.basics AS b,public.departments AS dp WHERE v.basic_id=b.id AND b.id=j.basic_id AND j.dp_id=dp.dp_id")
        t.commit();
        return (visitors)
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ messege: error.path })
    }
}

async function findById(pid, res) {
    const t = await db.transaction();
    try {
        const [visitor,metadata]=await db.query("SELECT v.*,b.firstname||' '||b.lastname AS e_name,b.id AS e_id,dp.departmentname FROM public.visitors AS v,public.basics AS b,public.departments AS dp WHERE v.basic_id=b.id AND b.id=j.basic_id AND j.dp_id=dp.dp_id AND v.id="+passid)

        t.commit();
        return ( visitor.reduce((obj, item) => ({ ...obj, [item[1]]: item })) );

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
function deleteById(id) {
    return Visitor.destroy({ where: { id: id } });
}

async function updatevisitor(id,res) {
    const t = await db.transaction();
    try {
        var time=moment().format("hh:mm:ss")

        const upvacancy = await Visitor.update({ time_out:time }, { where: { id: id } });
        t.commit();
        return res.status(200).json({ message: "Updated successfully" })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
    return
};

async function findByDep(dp_id, res) {
    const t = await db.transaction();
    try { 

        const [employee ,metadata] = await db.query("SELECT b.id, b.firstname||' '||b.lastname as name FROM public.basics AS b,public.jobs AS j WHERE j.dp_id=" + dp_id + "AND j.basic_id=b.id")
        t.commit();
        return employee;
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
module.exports = visitorService;