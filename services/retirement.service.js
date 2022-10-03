const sequelize = require('sequelize');
const db = require('../config/database');
const Retire=require('../model/retirement.model')
const Basics=require('../model/basic.model')
const Contacts=require('../model/contact.model')
const nodemailer = require("nodemailer");

var retireService = {
    add: add,
    findall:findall,
    findallreq: findallreq,
    mailer:mailer,
    update: update,
    deleted:deleted
}
async function add(resign,res) {
    const t = await db.transaction();
    try {
        var current= new Date()
        const request = await Retire.create({ ...resign, basic_id: resign.e_id,applydate:current}, { transaction: t })
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
// async function findById(id, res) {
//     const t = await db.transaction();
//     try {
//         const rr = await db.query("SELECT b.id, b.firstname||+||b.lastname as name,ds.designation ,a.*,c.* FROM public.basics AS b,public.retirements AS ret,public.addresses AS a,public.contacts AS c, public.jobs AS j,public.designations AS ds WHERE ret.id=" + id + " AND b.id=ret.basic_id AND b.id=c.basic_id AND j.basic_id=b.id AND j.ds_id=ds.ds_id", { type: QueryTypes.SELECT }, { transaction: t })
//         t.commit()
//             return (person.reduce((obj, item) => ({ ...obj, [item[1]]: item })))
//     }
//     catch (error) {
//         console.log(error);
//         t.rollback();
//     }
// }

async function findallreq(req, res) {
    const t = await db.transaction();
    try {
        const [retire_req, metadata] = await db.query("SELECT r.*,b.firstname  || ' '|| b.lastname AS name,c.contactnumber,c.email,dp.departmentname,ds.designation FROM public.retirements AS r ,public.basics AS b,public.departments AS dp,public.contacts AS c,public.designations AS ds,public.jobs AS j WHERE r.basic_id=b.id AND b.id=c.basic_id AND j.basic_id=b.id AND j.dp_id=dp.dp_id AND j.ds_id=ds.ds_id AND resigndate is null ", { transaction: t })
        t.commit();

        return  retire_req;

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
async function findall(req, res) {
    const t = await db.transaction();
    try {
        const [retired, metadata] = await db.query("SELECT r.*,b.firstname  || ' '|| b.lastname AS name,c.contactnumber,c.email,dp.departmentname,ds.designation FROM public.retirements AS r ,public.basics AS b,public.departments AS dp,public.contacts AS c,public.designations AS ds,public.jobs AS j WHERE r.basic_id=b.id AND b.id=c.basic_id AND j.basic_id=b.id AND j.dp_id=dp.dp_id AND j.ds_id=ds.ds_id AND r.resigndate is not null ", { transaction: t })
        t.commit();

        return  retired;

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
// Update retirement details
async function update(up, rid, res) {
    const t = await db.transaction();
    try {
        
        const updated = await Retire.update({ ...up }, { where: { id: rid } }, { transaction: t })
        t.commit();
        const retired = await Retire.findOne({ where: { id:rid } })
        if (retired.resigndate){
            const base =await Basics.findOne({where:{id:retired.basic_id}})
            const contact=await Contacts.findOne({where:{basic_id:retired.basic_id}})
            const email=contact.email;
            let name=base.firstname+base.lastname
           const mailed= await mailer(email,retired.resigndate,name);
           return res.status(200).json({ message: "success", mailed })
        }
        else{
        return res.status(200).json({ message: "success", updated })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
//sending response email

async function mailer(email,date,name) {

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
      subject: 'Regarding your resignation application ',
      text:"Dear "+name+",\n I was sorry to hear that you will be moving on from company, but Iam pleased to hear that you have such an exciting new opportunity in the works. I know you will be a tremendous success there, as you are in all your roles.\
\nThis constitutes my formal receipt of your resignation. As requested, your last day will be "+date+". Please keep in touch and let me know if you ever need a letter of recommendation.\
\n Best regards,\
     \n \
      \nHR MANAGER"
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return ({ error })
  
      } else {
        console.log('Email sent: ' + info.response);
        return (1)
  
      }
    });
  
  
  }
// reject retirement details
async function deleted(rid, res) {
    const t = await db.transaction();
    try {
        const retired = await Retire.findOne({ where: { id:rid } }, { transaction: t })
            const base =await Basics.findOne({where:{id:retired.basic_id}}, { transaction: t })
            const contact=await Contacts.findOne({where:{basic_id:retired.basic_id}}, { transaction: t })
            const email=contact.email;
            let name=base.firstname+base.lastname
           const mailed= await rejectmailer(email,name, { transaction: t });
           const deleted = await Retire.destroy({ where: { id: rid } }, { transaction: t })
           t.commit();
           return res.status(200).json({ message: "success", mailed })
        
    }
    catch (error) {
        console.log(error);
        t.rollback();
        returnres.status(200).json({error})
    };
}
//sending reject response email

async function rejectmailer(email,name) {

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
      subject: 'Regarding your resignation application ',
      text:"Dear "+name+",\n Here Iam inform you that, your resignation request is rejected\
     \n \
      \nHR MANAGER"
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return ({ error })
  
      } else {
        console.log('Email sent: ' + info.response);
        return (1)
  
      }
    });
  
  
  }
module.exports = retireService;