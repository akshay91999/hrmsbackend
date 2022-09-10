const sequelize = require('sequelize');
const db = require('../config/database');
const Candidate = require('../model/candidate.model');

var CandidateService = {
    add: add,
    findall: findall,
    findBypending: findBypending,
    upCandidate: upCandidate,
    approvedcandi:approvedcandi
}
//adding candidate
async function add(canData,doc, res) {

    const t = await db.transaction();
    try {
        const create_candidate = await Candidate.create({ ...canData,cv:doc}, { transaction: t });
        t.commit();
        return res.status(200).json({message:"success" })
    }
    catch (error) {
        t.rollback();
        return res.status(202).json({ "error": error })  
    }
}
//get by candidate not selected
async function findBypending(can_id, res) {
    const t = await db.transaction();
    try {
        const [view,metadata] =await db.query("SELECT c.*,dp.departmentname,ds.designation FROM public.candidates AS c,public.departments AS dp,public.designations AS ds WHERE c.dp_id=dp.dp_id AND c.ds_id=ds.ds_id AND c.selection is NULL AND c.deletedat is NULL AND c.status='pending'", { transaction: t })
        t.commit();
            return res.status(200).json(view)
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
// Update Candidate details
async function upCandidate(upData, can_id, res) {
    const t = await db.transaction();
    try {
        let pp = upData;
        const upCandi = await Candidate.update({ ...pp }, { where: { id: can_id } }, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "Updated successfully", upCandi})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
//view all SELECTED candidate 
async function findall(res) {
    const t = await db.transaction();
    try {
        const [view,metadata] =await db.query("SELECT c.*,dp.departmentname,ds.designation FROM public.candidates AS c,public.departments AS dp,public.designations AS ds WHERE c.dp_id=dp.dp_id AND c.ds_id=ds.ds_id AND c.selection is true AND  c.deletedat is null AND c.status='pending'", { transaction: t })
                t.commit();
       
        return  view ;
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

//get all approved candidate  which is called from add.router
async function approvedcandi(req,res) {
    const t = await db.transaction();
    try {
        
        const [view,metadata] =await db.query("SELECT c.*,dp.departmentname,ds.designation FROM public.candidates AS c,public.departments AS dp,public.designations AS ds WHERE c.dp_id=dp.dp_id AND c.ds_id=ds.ds_id AND c.selection is true AND  c.deletedat is null AND c.status='accept'", { transaction: t })
        t.commit();
       
            return (view);          
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = CandidateService;