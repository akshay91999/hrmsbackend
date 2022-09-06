const sequelize = require('sequelize');
const db = require('../config/database');
const Vacancy = require('../model/vacancy.model');
const Depart = require('../model/department.model');
const Designate = require('../model/designation.model');

var vacancyService = {
    add: add,
    findByPos: findByPos,
    findall: findall,
    upVacancy: upVacancy
}
// add vaccancy function called from vacancy.controller
async function add(vData,des, res) {
    const t = await db.transaction();
    try {
        const dsname = des.designation
        console.log(dsname)
        const dpart= await Depart.findOne({where:{dp_id:vData.dp_id}})
        console.log(dpart.departmentname)
        const createvacancy = await Vacancy.create({ ...vData, departmentname: dpart.departmentname, designation:dsname }, { transaction: t });
        t.commit();
        console.log(createvacancy)
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        t.rollback();
        return res.status(202).json({message:"fail", error });
        
    }
}
//get by department and position
async function findByPos(dep,des,res) {
    const t = await db.transaction();
    try {
       
        const depart = await Depart.findOne({ where: { dp_id: dep} }, { transaction: t })
        const designate = await Designate.findOne({ where: { ds_id: des} }, { transaction: t })
        const viewVacancy = await Vacancy.findAll({ where: { departmentname: depart.departmentname, designation:designate.designation, deletedAt:null } }, { transaction: t })
        
        t.commit();
        return res.status(201).json({msg:"success",viewVacancy })

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

// view all vacancies
async function findall(req,res) {
        const t = await db.transaction();
    try {
        const viewVacancy = await Vacancy.findAll({ where: { deletedAt: null} }, { transaction: t })
            t.commit();
        return {viewVacancy};
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
//update vacancy
async function upVacancy(upData, v_id, res) {
    const t = await db.transaction();
    try {
        const upvacancy = await Vacancy.update({ ...upData},{where:{v_id:v_id}}, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "Updated successfully from service",upvacancy})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}


module.exports = vacancyService;