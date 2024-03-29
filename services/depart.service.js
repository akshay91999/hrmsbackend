const sequelize = require('sequelize');
const db = require('../config/database');
const Depart = require('../model/department.model')
const Designate = require('../model/designation.model')

var DepartService = {
    add: add,
    findall: findall,
    findById: findById,
    upDepart: upDepart
}
//adding designation
async function add(depData,dep,res) {

    const t = await db.transaction();
 try {
        let pp = depData;
        const dpart = await Depart.findOne({where:{dp_id:dep.dp_id}}, { transaction: t });
        const [designation,created] = await Designate.findOrCreate({where:{dp_id:dpart.dp_id,designation:depData.designation},defaults: {...pp}});
        t.commit();
        if(created==false){
            return {message:"This position is already exist"}
        }
        console.log(created)
        return res.status(200).json({message:"success"})
    }
    catch (error) {
        return res.status(202).json({ error })
        t.rollback();
    }
}
//get by dp_id
async function findById(dep, res) {
    const t = await db.transaction();
    try {
        const viewDepart = await Depart.findOne({where:{dp_id:dep}}, { transaction: t })
        const viewDesignation = await Designate.findAll({ where: { dp_id: dep } }, { transaction: t })
        t.commit();
        if (!viewDepart.deletedat) {
            return res.status(200).json({ viewDepart, viewDesignation })
        }
        else {
            return res.status(201).json({ message: "department not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
// Update department details
async function upDepart(upData,dp_Id,ds_Id, res) {
    const t = await db.transaction();
    try {
        let pp = upData;
        const upDepart = await Depart.update({ ...pp}, { where: { dp_id: dp_Id } }, { transaction: t })
        // const getDepart= await Depart.findOne({where:{dp_id:dp_Id}},{ transaction: t })
        const designation = await Designate.update({ ...pp }, { where: {ds_id:ds_Id} }, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "Updated successfully from service",upDepart,designation })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function findall() {
    const t = await db.transaction();
    try {
        const viewAlldep = await Depart.findAll({ transaction: t })
        // const viewAlldes = await Designate.findAll({ transaction: t })
        t.commit();
        return { viewAlldep};
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = DepartService;