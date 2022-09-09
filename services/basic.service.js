const sequelize = require('sequelize');
const db = require('../config/database');
const Basics = require('../model/basic.model')
const Address = require('../model/address.model')
const Parents = require('../model/parents.model')
const Contact = require('../model/contact.model')
const Job = require('../model/job.model')
const mailService = require('../services/mailer.services')
const bcrypt = require('bcryptjs')
var basicService = {
    add: add,
    findall: findall,
    findById: findById,
    updateUser: updateUser
}
async function add(empData, res) {

    const t = await db.transaction();
    try {
        let pp = empData;
        const hashedpass = await bcrypt.hash(pp.dob, 10)
        const createUser = await Basics.create({ ...pp, password: hashedpass }, { transaction: t });
        const addr = await Address.create({ ...pp, basic_id: createUser.id }, { transaction: t })
        const parent = await Parents.create({ ...pp, basic_id: createUser.id }, { transaction: t })
        const contact = await Contact.create({ ...pp, basic_id: createUser.id }, { transaction: t })
        let email = contact.email;
        let pass = pp.dob;
        basic_id = createUser.id
        const mailed = mailService.mailer(email, pass, res);//sending userid and password to employee
        t.commit();
        return res.status(200).json({ message: "success", data: basic_id })
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

        const [person, metadata] = await db.query("SELECTb.firstname  || ' '|| b.lastname AS name,b.gender,b.dob,b.nationality,u.document,a.*,c.*,p.* FROM public.basics AS b,public.addresses AS a,public.contacts AS c,public.parents AS p,public.uploads AS u WHERE b.id=" + id + " AND b.id=a.basic_id AND b.id=c.basic_id AND b.id=p.basic_id AND u.basic_id=b.id AND u.doc_type='photo'", { transaction: t })
        t.commit
        return (person);
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
// Update employee details
async function updateUser(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;

        const base = await Basics.update({ ...pp }, { attributes: { exclude: ['password'] } }, { where: { id: id } }, { transaction: t })
        const addr = await Address.update({ ...pp }, { where: { basic_id: id } }, { transaction: t })
        const parent = await Parents.update({ ...pp }, { where: { basic_id: id } }, { transaction: t })
        const contact = await Contact.update({ ...pp }, { where: { basic_id: id } }, { transaction: t })
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
        const base =await Basics.findAll({attributes:{exclude:['password']}},{transaction: t })
        // const contact =await Contact.findAll({transaction: t })
        // const job= await Job.findAll({transaction: t })
        const [person, metadata] = await db.query("SELECT b.firstname  || ' '|| b.lastname AS name,c.contactnumber,c.email,dp.departmentname,ds.designation, u.document FROM public.basics AS b,public.departments AS dp,public.contacts AS c,public.designations AS ds,public.uploads AS u ,public.jobs AS j WHERE b.id=c.basic_id AND u.basic_id=b.id AND j.basic_id=b.id AND j.dp_id=dp.dp_id AND j.ds_id=ds.ds_id AND u.doc_type='photo'", { transaction: t })
        t.commit();
        if (!base.deletedat) {
            return { message: "success", person };
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = basicService;