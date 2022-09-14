const sequelize = require('sequelize');
const db = require('../config/database');
const { QueryTypes } = require('sequelize');
const Basics = require('../model/basic.model')
const Address = require('../model/address.model')
const Parents = require('../model/parents.model')
const Contact = require('../model/contact.model')
const Login = require('../model/loginstatus.model')
const Depart = require('../model/department.model')
const Design = require('../model/designation.model')
const mailService = require('../services/mailer.services')
const bcrypt = require('bcryptjs');
const Job = require('../model/job.model');
var adminService = {
    add: add
   
}
async function add() {
    // const t = await db.transaction();
    try {
        let pp = {
            firstname: "Super",
            lastname: "admin",
            gender: "male",
            dob: "2000-08-14",
            nationality: "india",
            e_address: "keerthu house",
            state: "tamilnadu",
            country: "India",
            pincode: "678967",
            fathername: "ragavan",
            fcontactnumber: "9846253565",
            mothername: "geetha",
            mcontactnumber: "9546253565",
            maritalstatus: "married",
            contactnumber: "6995153593",
            altcontactnumber: "6189956535",
            email: "admin@arvension.com",
            altemail: "arv@gmail.com",
            scontactnumber: "8765253545",
            pass: "admin123",
            // departmentname: "Admin",
            // designation: "super Admin",
            // user_type: "1",
            // package: 200000,
            // doj: 2022 - 12 - 15,
            // jobtype: "full time"
        }
        const hashedpass = await bcrypt.hash(pp.pass, 10)
        const [createUser, created] = await Basics.findOrCreate({ where: { id: 1 }, defaults: { ...pp, password: hashedpass } });
        if (created) {
            // const addr = await Address.create({ ...pp, basic_id: createUser.id }, { transaction: t })
            // const parent = await Parents.create({ ...pp, basic_id: createUser.id }, { transaction: t })
            const contact = await Contact.create({ ...pp, basic_id: createUser.id })
            // const dep = await Depart.create({ ...pp }, { transaction: t })
            // const des = await Design.create({ ...pp, dp_id: dep.dp_id }, { transaction: t })
            // const job = await Job.create({ ...pp, basic_id: createUser.id, dp_id: des.dp_id, ds_id: des.ds_id }, { transaction: t })
            basic_id = createUser.id
            const log = await Login.create({ basic_id: basic_id }, { transaction: t })
            let email = contact.email;
            let pass = pp.dob;
            let name = pp.firstname;
            const mailed = mailService.mailer(email, pass, name, res);//sending userid and password to admin
        }
        
        console.log({ message: "success" }, basic_id)
        // return res.status(200).json({ message: "success", data: basic_id })
    }
    catch (error) {
        console.log(error);
        // t.rollback();
        // return res.status(202).json({ error: error.errors.map((e) => e.message).join(", ") })
    }
}


module.exports = adminService;