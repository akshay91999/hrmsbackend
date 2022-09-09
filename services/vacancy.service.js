const sequelize = require('sequelize');
const db = require('../config/database');
const Vacancy = require('../model/vacancy.model');

var vacancyService = {
    add: add,
    findBypending: findBypending,
    findallApprove: findallApprove,
    upVacancy: upVacancy
}
// add vaccancy function called from vacancy.controller
async function add(vData,des, res) {
    const t = await db.transaction();
    try {
        const createvacancy = await Vacancy.create({ ...vData,ds_id:des.ds_id}, { transaction: t });
        t.commit();
        console.log(createvacancy)
        return res.status(200).json({message:"success"});
    }
    catch (error) {
        t.rollback();
        return res.status(202).json({message:"fail", error });
        
    }
}
//get by department and position of status pending (approve HR)
async function findBypending(res) {
    const t = await db.transaction();
    try {
        const [viewVacancy,metadata] = await db.query("SELECT v.*,dp.departmentname,ds.designation FROM public.vacancies AS v,public.departments AS dp,public.designations AS ds WHERE dp.dp_id=v.dp_id AND ds.ds_id=v.ds_id AND v.status='pending' AND v.deletedat is NULL", { transaction: t })
        t.commit();
        return viewVacancy;

    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

// view all approved vacancies for Recruiters
async function findallApprove(req,res) {
        const t = await db.transaction();
    try {
        const [viewVacancy,metadata] = await db.query("SELECT v.*,dp.departmentname,ds.designation FROM public.vacancies AS v,public.departments AS dp,public.designations as ds WHERE dp.dp_id=v.dp_id AND ds.ds_id=v.ds_id AND v.status='accept' AND v.deletedat is NULL", { transaction: t })
         t.commit();
        return viewVacancy;
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
        return res.status(200).json({ message: "Updated successfully",upvacancy})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}


module.exports = vacancyService;