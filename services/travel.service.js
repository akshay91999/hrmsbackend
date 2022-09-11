const sequelize = require('sequelize');
const db = require('../config/database');
const Travel = require('../model/travel.model')
const Basics =require('../model/basic.model');
const Job=require('../model/job.model')
const { Op } = require("sequelize");


var travelService = {
    add: add,
    findall: findall,
    findById: findById,
    updatedata: updatedata,
    findallApproved,findallApproved,
    findApproved,findApproved
}
//adding travel request
async function add(TData,id,res) {
   
    const t = await db.transaction();
    try { 
        const createTravel = await Travel.create({ ...TData,basic_id:id}, { transaction: t });
        // const name= await Basics.findOne({attributes:['firstName','lastName']}, {where:{id:basic_id}},{ transaction: t });
        // const dp_id= await Job.findOne({attributes:['departmentname']},{where:{basic_id:basic_id}},{ transaction: t });
        //  const hrdata={createTravel,name,dp_id}
        // // const hrData= await HrTravel.create({...hrdata},{ transaction: t });
        t.commit();
        //  console.log(hrdata)
        return res.status(200).json({message:"success" ,createTravel})
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({error})
    }
}
//get by id
async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const travel = await Travel.findAll({where: {
            [Op.or]: [
              { status: "pending" },
              { status: "accept" }
            ],basic_id:pkid
          }}, { transaction: t })
        t.commit();
        if (!travel.deletedAt) {
            return res.status(200).json({travel })
        }
        else {
            return res.status(201).json({ message: "no data" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path })
    }
}
// Update data
async function updatedata(up, T_id, res) {
    const t = await db.transaction();
    try {        
        const updated = await Travel.update({ ...up}, { where: { id: T_id } }, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "Updated successfully", updated})
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path }) 
    };
}

// show all status pending travel data
async function findall(req, res) {
    const t = await db.transaction();
  let date= new Date().toISOString().slice(0, 10)
    console.log(date)
    try{
   const [travel,metadata]= await db.query("SELECT t.*,b.firstname ||' '||b.lastname AS name,d.departmentname FROM public.travels AS t,public.basics AS b,public.jobs AS j,public.departments AS d WHERE t.status='pending' AND t.basic_id=b.id AND j.basic_id=b.id AND d.dp_id=j.dp_id ", { transaction: t })
    t.commit();
    return travel;
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path }) 
    }
}

// approved travel list for HR 
async function findallApproved(req, res) {
    const t = await db.transaction();
    let date=new Date()
    try{
   const [travel,metadata]= await db.query("SELECT t.*,b.firstname ||' '||b.lastname AS name,d.departmentname FROM public.travels AS t,public.basics AS b,public.jobs AS j,public.department AS d WHERE t.status='accept' AND t.basic_id=b.id AND j.basic_id=b.id AND d.dp_id=j.dp_id", { transaction: t })
    t.commit();
    return travel;
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path }) 
    }
}

// approved travel list for EMPLOYEEE 
async function findApproved(req, res) {
 let id=req.params.id
    const t = await db.transaction();
    try{
        let date=new Date()
   const [travel,metadata]= await db.query("SELECT t.*,b.firstname ||' '||b.lastname AS name,d.departmentname FROM public.travels AS t,public.basics AS b,public.jobs AS j,public.department AS d WHERE t.basic_id="+id+"AND t.status='accept' AND t.basic_id=b.id AND j.basic_id=b.id AND d.dp_id=j.dp_id ", { transaction: t })
    t.commit();
    return travel;
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path }) 
    }
}

module.exports = travelService;