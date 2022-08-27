const sequelize = require('sequelize');
const db = require('../config/database');
const Travel = require('../model/travel.model')
const Basics =require('../model/basic.model');
const Job=require('../model/job.model')
const HrTravel=require('../model/hrTravel.model')

var travelService = {
    add: add,
    findall: findall,
    findById: findById,
    updatedata: updatedata
}
//adding travel request
async function add(TData,id,res) {
   
    const t = await db.transaction();
    try {
        
        const createTravel = await Travel.create({ ...TData,basic_id:id}, { transaction: t });
        t.commit();
        const basic_id = createTravel.basic_id;
        const name= await Basics.findOne({attributes:['firstName','lastName']}, {where:{id:basic_id}},{ transaction: t });
        const dp_id= await Job.findOne({attributes:['dp_id']},{where:{basic_id:basic_id}},{ transaction: t });
         const hrdata={createTravel,name,dp_id}
        // const hrData= await HrTravel.create({...hrdata},{ transaction: t });

        //  console.log(hrdata)
        return res.status(200).json({message:"success" ,createTravel})
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path })
    }
}
//get by id
async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const travel = await Travel.findOne({ where: { basic_id: pkid } }, { transaction: t })
        t.commit();
        if (!travel.deletedAt) {
            return res.status(200).json({ travel })
        }
        else {
            return res.status(201).json({ message: "user not exist" })
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
async function findall(req, res) {
    const t = await db.transaction();
    try{
    const Tdata =await Travel.findAll({transaction: t });
    t.commit();
    return res.status(200).json({ message: "success", Tdata})
    }
    catch (error) {
        console.log(error);
        t.rollback();
        return res.status(202).json({messege: error.path }) 
    }
}

module.exports = travelService;