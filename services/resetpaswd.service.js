const sequelize = require('sequelize');
const db = require('../config/database');
const Basic = require('../model/basic.model')
const Log = require('../model/loginstatus.model')
const Contact=require('../model/contact.model')
const mailService = require('../services/mailer.services')

const bcrypt = require('bcryptjs')


var Reset = {
    updatePasswdByEmp: updatePasswdByEmp,
    updatePasswdByHR:updatePasswdByHR
}
async function updatePasswdByEmp(req, res) {
    const t = await db.transaction();
    try {
        id = req.body.basic_id
        passwd = req.body.password
        const hashedpass = await bcrypt.hash(passwd, 10)
        const updated = await Basic.update({ password: hashedpass }, { where: { id: id } }, { transaction: t })
        const update_log = await Log.update({ p_change: 1 }, { where: { basic_id: id } }, { transaction: t })

        t.commit();
        return res.status(200).json({ message: "Updated successfully by EMP" })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function updatePasswdByHR(id, res) {
    const t = await db.transaction();
    try {
        const base = await Basic.findOne({ where: { id: id } }, { transaction: t })
        let dob = base.dob
        const hashedpass = await bcrypt.hash(dob, 10)
        const updated = await Basic.update({ password: hashedpass }, { where: { id: id } }, { transaction: t })
        const update_log = await Log.update({ p_change: 0 }, { where: { basic_id: id } }, { transaction: t })
        const contact = await Contact.findOne({where:{basic_id:id }}, { transaction: t })
        let name=base.firstname;
        let email = contact.email;
        const mailed = mailService.mailer(email, dob,name, res);
        t.commit();
        return res.status(200).json({ message: "Updated successfully by HR"})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
module.exports = Reset;