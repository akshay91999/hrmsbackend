const sequelize = require('sequelize');
const db = require('../config/database');
const { QueryTypes } = require('sequelize');
const Basics = require('../model/basic.model')
const Address = require('../model/address.model')
const Parents = require('../model/parents.model')
const Contact = require('../model/contact.model')
const Login = require('../model/loginstatus.model')
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
        basic_id = createUser.id
        const log = await Login.create({ basic_id: basic_id }, { transaction: t })
        let email = contact.email;
        let pass = pp.dob;
        let name=pp.firstname;
        const mailed = mailService.mailer(email, pass,name, res);//sending userid and password to employee
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
        const base = await Basics.findOne({where:{id:id}} ,{ transaction: t });

        const person = await db.query("SELECT b.id, b.firstname,b.lastname ,b.gender,b.dob,b.nationality,u.document,ds.designation ,a.*,c.*,p.* FROM public.basics AS b,public.addresses AS a,public.contacts AS c,public.parents AS p,public.uploads AS u, public.jobs AS j,public.designations AS ds WHERE b.id=" + id + " AND b.id=a.basic_id AND b.id=c.basic_id AND b.id=p.basic_id AND u.basic_id=b.id AND u.doc_type='photo' AND j.basic_id=b.id AND j.ds_id=ds.ds_id", { type: QueryTypes.SELECT }, { transaction: t })
        t.commit()
        // console.log(person)
        if (!base.deletedat) {
            return (person.reduce((obj, item) => ({ ...obj, [item[1]]: item })))
        }
        else {
            return ("user not exist")
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return (errror)
    }
}
// Update employee details
async function updateUser(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;
        var basic_up = {
            firstname: pp.firstname,
            lastname: pp.lastname,
            gender: pp.gender,
            dob: pp.dob,
            nationality: pp.nationality,
            deletedat: pp.deletedat
        }

        const base = await Basics.update({ ...basic_up }, { where: { id: id } }, { transaction: t })
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