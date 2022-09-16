const Visitor = require('../model/visitor.model.js');
const db = require("../config/database");
const Basic = require('../model/basic.model.js');


var visitorService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateVisitor: updateVisitor,
    findByDep: findByDep
}
async function add(Adata, doc, res) {
    const t = await db.transaction();
    try {
        let pp = Adata;
        const visitors = await Visitor.create({ ...pp, photo: doc }, { transaction: t });
        t.commit();
        return res.status(200).json({ message: "success" })
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
       const [visitors,metadata]=await db.query("SELECT * FROM public.visitors AS v,public.basics AS b,public.departments AS dp")
        t.commit();
        return {}
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

        const visitor = await Visitor.findOne({ where: { id: pid } }, { transaction: t })
        t.commit();
        return res.status(200).json({ visitor })

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
        const upvacancy = await Visitor.update({ ...visitor }, { where: { id: id } });
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
        const [employee ,metadata] = await db.query("SELECT b.id, b.fistname||' '||b.lastname FROM public.basics AS b,public.jobs AS j WHERE j.dp_id=" + dp_id + "AND j.basic_id=b.id")
        t.commit();
        return employee;
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
module.exports = visitorService;