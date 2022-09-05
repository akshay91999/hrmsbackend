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
async function add(vData,dep, res) {
    const t = await db.transaction();
    try {
        const dpart = await Depart.findOne({where:{dp_id:dep.dp_id}}, { transaction: t });
        const [designation,created] = await Designate.findOrCreate({where:{dp_id:dpart.dp_id,designation:vData.designation},defaults: {...vData}});
        const createvacancy = await Vacancy.create({ ...vData, dp_id: dpart.dp_id, ds_id: designation.ds_id }, { transaction: t });
        t.commit();
        return res.status(200).json({dpart,designation,createvacancy });
    }
    catch (error) {
        t.rollback();
        return res.status(205).json({ error });
        
    }
}
//get by department and position
async function findByPos(dep,des,res) {
    const t = await db.transaction();
    try {
        const viewVacancy = await Vacancy.findAll({ where: { dp_id: dep, ds_id: des, deletedAt:null } }, { transaction: t })
        const designate = await Designate.findAll({ where: { ds_id: des} }, { transaction: t })
        const department = await Depart.findAll({ where: { dp_id: dep} }, { transaction: t })
        t.commit();
        return res.status(201).json({msg:"success", department, designate, viewVacancy })

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
        const designate = await Designate.findAll({ transaction: t })
        const department = await Depart.findAll({ transaction: t })
        t.commit();
        return {viewVacancy,department,designate};
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