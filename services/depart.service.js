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
async function add(depData,dep,res) {

    const t = await db.transaction();
 try {
        let pp = depData;
        const dpart = await Depart.findOne({where:{dp_id:dep.dp_id}}, { transaction: t });
        const [designation,created] = await Designate.findOrCreate({where:{dp_id:dpart.dp_id,designation:depData.designation},defaults: {...pp}},{transaction:t});
        t.commit();
        return res.status(200).json({ dpart, designation })
    }
    catch (error) {
        return res.status(202).json({ error })
        t.rollback();
    }
}
//get by id
async function findById(dep, res) {
    const t = await db.transaction();
    try {
        // let pkid = dep;
        const viewDepart = await Depart.findOne({where:{dp_id:dep}}, { transaction: t })
        console.log(viewDepart,"viewDepart")
        const viewDesignation = await Designate.findAll({ where: { dp_id: dep } }, { transaction: t })
        t.commit();
        if (!viewDepart.deletedAt) {
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
// Update employee details
async function upDepart(up, id, res) {
    const t = await db.transaction();
    try {
        let pp = up;
        const upDepart = await Basics.update({ ...pp, passwd: hashedpass }, { where: { id: id } }, { transaction: t })
        const designation = await Address.update({ ...pp }, { where: { basic_id: id } }, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
async function findall(req, res) {
    const t = await db.transaction();
    try {
        const viewAlldep = await Depart.findAll({ transaction: t })
        const viewAlldes = await Designate.findAll({ transaction: t })
        t.commit();
        return { viewAlldep, viewAlldes };
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = DepartService;