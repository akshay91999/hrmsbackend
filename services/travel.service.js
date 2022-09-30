const sequelize = require('sequelize');
const db = require('../config/database');
const Travel = require('../model/travel.model')
const Basics = require('../model/basic.model');
const Job = require('../model/job.model')
const { Op } = require("sequelize");
const Contact = require('../model/contact.model');
const nodemailer = require("nodemailer");


var travelService = {
    add: add,
    findall: findall,
    findById: findById,
    updatedata: updatedata,
    findallApproved, findallApproved,
    findApproved, findApproved,
    traveleditbyid: traveleditbyid,
    mailer: mailer

}
//adding travel request
async function add(TData, id, res) {

    const t = await db.transaction();
    try {
        const createTravel = await Travel.create({ ...TData, basic_id: id }, { transaction: t });
        t.commit();
        return res.status(200).json({ message: "success", createTravel })
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ error })
    }
}
//get by id
async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const travel = await Travel.findAll({
            where: {
                [Op.or]: [
                    { status: "pending" },
                    { status: "accept" }
                ], basic_id: pkid, deletedat: null
            }
        }, { transaction: t })
        t.commit();

        return res.status(200).json({ travel })

    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ messege: error.path })
    }
}
// Update data
async function updatedata(up, T_id, res) {
    const t = await db.transaction();
    try {
        const updated = await Travel.update({ ...up }, { where: { id: T_id } }, { transaction: t })
        t.commit();
        const trip = await Travel.findOne({ where: { id: T_id } })
        if (trip.status=='reject'){
            const contact=await Contact.findOne({where:{basic_id:trip.basic_id}})
            const email=contact.email;
           const mailed= await mailer(email);
           return res.status(200).json({ message: "Updated successfully", mailed })


        }
        else{
        return res.status(200).json({ message: "Updated successfully", updated })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ messege: error.path })
    };
}

// show all status pending travel data
async function findall(req, res) {
    const t = await db.transaction();
    let date = new Date().toISOString().slice(0, 10)
    console.log(date)
    try {
        const [travel, metadata] = await db.query("SELECT t.*,b.firstname ||' '||b.lastname AS name,d.departmentname FROM public.travels AS t,public.basics AS b,public.jobs AS j,public.departments AS d WHERE t.status='pending' AND t.basic_id=b.id AND j.basic_id=b.id AND d.dp_id=j.dp_id ", { transaction: t })
        t.commit();
        return travel;
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ messege: error.path })
    }
}

// approved travel list for HR 
async function findallApproved(req, res) {
    const t = await db.transaction();
    let date = new Date()
    try {
        const [travel, metadata] = await db.query("SELECT t.*,b.firstname ||' '||b.lastname AS name,d.departmentname FROM public.travels AS t,public.basics AS b,public.jobs AS j,public.departments AS d WHERE t.status='accept' AND t.basic_id=b.id AND j.basic_id=b.id AND d.dp_id=j.dp_id", { transaction: t })
        t.commit();
        return travel;
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ messege: error.path })
    }
}

// approved travel list for EMPLOYEEE 
async function findApproved(req, res) {
    let id = req.params.id
    const t = await db.transaction();
    try {
        let date = new Date()
        const [travel, metadata] = await db.query("SELECT t.*,b.firstname ||' '||b.lastname AS name,d.departmentname FROM public.travels AS t,public.basics AS b,public.jobs AS j,public.departments AS d WHERE t.basic_id=" + id + "AND t.status='accept' AND t.basic_id=b.id AND j.basic_id=b.id AND d.dp_id=j.dp_id ", { transaction: t })
        t.commit();
        return travel;
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({ messege: error.path })
    }
}
async function traveleditbyid(req, res) {
    let tv_id = req.params.id;
        const t = await db.transaction();
        try {
            let tv_id = req.params.id;
            const travel = await Travel.findOne({where: { id: tv_id, deletedat: null,status:'pending'}}, { transaction: t })
            t.commit();
            return (travel );
        }
        catch (error) {
            console.log(error);
            t.rollback();
            return res.status(202).json({ messege: error.path })
        }
}
//sending rejected email

async function mailer(email) {

    let emailid = email
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hrmsbackend2022@gmail.com',
        pass: 'dufwsicimpfmeuch'
      }
    });
  
    var mailOptions = {
      from: 'hrmsbackend2022@gmail.com',
      to: emailid,
      subject: 'Travel updates ',
      text:'your trip has been rejected'
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return ({ error })
  
      } else {
        console.log('Email sent: ' + info.response);
        return ({msg:"email send successfully",info})
  
      }
    });
  
  
  }
module.exports = travelService;