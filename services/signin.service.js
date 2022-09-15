
const db = require('../config/database');
const Basic = require('../model/basic.model');
const Contact = require('../model/contact.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const Job = require('../model/job.model')
const Depart=require('../model/department.model')
const Design=require('../model/designation.model')
const Login = require('../model/loginstatus.model')

var sign = { signin: signin }

async function signin(req, res) {
    const t = await db.transaction();
    

    const { email, password } = req.body
    if (!email || !password) {
        return res.status(201).json({ message: "please add email or password" })
    }

    const savedUser = await Contact.findOne({ where: { email: email } }, { transaction: t })
    if (!savedUser) {
        t.rollback();
        return res.status(201).json({ message: "invalid email or password" })

    }

    const base = await Basic.findOne({ where: { id: savedUser.basic_id } }, { transaction: t })
    t.commit();
    const basic_id=base.id;
    bcrypt.compare(password, base.password)
        .then(async doMatch => {
            if (doMatch) {
                // res.json({message:"successfully signed in"})
                const token = jwt.sign({ id: base.id }, JWT_SECRET)
                const job = await Job.findOne({ where: { basic_id: savedUser.basic_id } }, { transaction: t })
                const Log = await Login.findOne({ where: { basic_id: savedUser.basic_id } }, { transaction: t })
                const Dep=await Depart.findOne({where:{dp_id:job.dp_id}}, { transaction: t })
                const Des=await Design.findOne({where:{ds_id:job.ds_id}}, { transaction: t })
                const { id, firstname ,lastname} = base
                let name=firstname+" "+lastname
                const { user_type } = job
                const { p_change } = Log
                const {dp_id}=Dep
                const{ds_id}=Des

                return res.cookie('access_token',token,{httpOnly:true}).json({ token, user: { id, p_change, user_type, name, email, dp_id,ds_id } })
            }
            else {
                return res.status(202).json({ message: "invalid password" })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({ message: "internal error", err })

        })
}
module.exports = sign;