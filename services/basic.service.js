const sequelize = require('sequelize');
const db = require('../config/database');
const Basics = require('../model/basic.model')
const Address = require('../model/address.model')
const Parents = require('../model/parents.model')
const Contact = require('../model/contact.model')
const mailService =require('../services/mailer.services')

const bcrypt = require('bcrypt')

var basicService = {
    add: add,
    findAll: findAll,
    findById: findById,
    updateUser: updateUser,

}


async function add(empData, res) {
        
        const isEmailExist= await Contact.findOne({where:{email:empData.email}})
        
        if(isEmailExist){
            return res.status(202).json({message:"User with the email is already exist"})
        }
        const isphoneExist= await Contact.findOne({where:{contactnumber:empData.contactnumber}})
    const t = await db.transaction();
    try {


        

        let pp = empData;

        const hashedpass = await bcrypt.hash(pp.passwd, 10)

        const createUser = await Basics.create({ ...pp, passwd: pp.dob }, { transaction: t });
        const addr = await Address.create({ ...pp, basic_id: createUser.id }, { transaction: t })
        const parent = await Parents.create({ ...pp, basic_id: createUser.id }, { transaction: t })
        const contact = await Contact.create({ ...pp, basic_id: createUser.id }, { transaction: t })
        let email=contact.email;
        let pass=pp.dob;
        
        const mailed= mailService.mailer(email,pass,res) ;
        t.commit();
  
        return res.status(200).json({createUser, addr, parent, contact,mailed})
    }
    catch (error) {
        return res.status(202).json({error})
        t.rollback();
    }

}

//get by id
async function findById(gig, res) {
    const t = await db.transaction();
    try {
        let pkid = gig;
        const base = await Basics.findByPk(pkid, { transaction: t })
        const addr = await Address.findAll({ where: { basic_id: pkid } }, { transaction: t })
        const parent = await Parents.findAll({ where: { basic_id: pkid } }, { transaction: t })
        const contact = await Contact.findAll({ where: { basic_id: pkid } }, { transaction: t })
        t.commit();
        if (!base.deletedAt) {
            return res.status(200).json({ base, addr, parent, contact })
        }
        else {
            return res.status(201).json({ message: "user not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}


async function updateUser(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;
        const hashedpass = await bcrypt.hash(pp.passwd, 10)


        const base = await Basics.update({ ...pp,passwd:hashedpass }, { where: { id: id } }, { transaction: t })
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



function findAll(req, res) {
    Basics.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = basicService;