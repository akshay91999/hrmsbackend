
const db = require('../config/database');
const Basic = require('../model/basic.model');
const Contact = require('../model/contact.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const Job = require('../model/job.model')

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
        return res.status(201).json({ message: "Invalid email or password" })

    }
    const base = await Basic.findOne({ where: { id: savedUser.basic_id } }, { transaction: t })
    const job = await Job.findOne({ where: { basic_id: savedUser.basic_id } }, { transaction: t })

    t.commit();
    bcrypt.compare(password, base.password)
        .then(doMatch => {
            if (doMatch) {
                // res.json({message:"successfully signed in"})
                const token = jwt.sign({ id: base.id }, JWT_SECRET)
                const { id, firstname } = base
                const { user_type } = job
                return res.json({ token, user: { id, firstname, email, user_type } })
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