const sequelize = require('sequelize');
const db = require('../config/database');
const Retire=require('../model/retirement.model')
const Basics=require('../model/basic.model')
var basicService = {
    add: add,
    findall: findall,
    findById: findById,
    updateUser: updateUser
}
async function add(resign,id,res) {

    const t = await db.transaction();
    try {
        const request = await Retire.create({ ...pp, basic_id: id}, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "success"})
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ error: error.errors.map((e) => e.message).join(", ") })
    }
}
//get by id
async function findById(id, res) {
    const t = await db.transaction();
    try {

        const rr = await db.query("SELECT b.id, b.firstname||+||b.lastname as name,ds.designation ,a.*,c.* FROM public.basics AS b,public.retirements AS ret,public.addresses AS a,public.contacts AS c, public.jobs AS j,public.designations AS ds WHERE ret.id=" + id + " AND b.id=ret.basic_id AND b.id=c.basic_id AND j.basic_id=b.id AND j.ds_id=ds.ds_id", { type: QueryTypes.SELECT }, { transaction: t })
        t.commit()
            return (person.reduce((obj, item) => ({ ...obj, [item[1]]: item })))
       
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
// Update retirement details
async function updateUser(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;
        const base = await Retire.update({ ...basic_up }, { where: { id: id } }, { transaction: t })
       
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function findall(req, res) {
    const t = await db.transaction();
    try {
        const [person, metadata] = await db.query("SELECT b.id,b.firstname  || ' '|| b.lastname AS name,b.gender,c.contactnumber,c.email,dp.departmentname,ds.designation FROM public.basics AS b,public.departments AS dp,public.contacts AS c,public.designations AS ds,public.jobs AS j WHERE b.id=c.basic_id AND j.basic_id=b.id AND j.dp_id=dp.dp_id AND j.ds_id=ds.ds_id AND j.user_type!=1 ", { transaction: t })
        t.commit();

        return  person;

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = basicService;