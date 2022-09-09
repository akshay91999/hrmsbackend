const sequelize = require('sequelize');
const db = require('../config/database');
const Candidate = require('../model/candidate.model');

var CandidateService = {
    add: add,
    findall: findall,
    findById: findById,
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
//get by candidate id
async function findById(can_id, res) {
    const t = await db.transaction();
    try {
        const viewCandidate = await Candidate.findOne({ where: { id: can_id,status:"pending"} }, { transaction: t })
        t.commit();
        if (!viewCandidate.deletedAt) {
            return res.status(200).json({ viewCandidate })
        }
        else {
            return res.status(201).json({ message: "Candidate not exist" })
        }
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
//view all candidate
async function findall(res) {
    const t = await db.transaction();
    try {
        const viewAllCan = await Candidate.findAll({where:{status:"pending",deletedat:null}},{ transaction: t })
        t.commit();
       
        return  viewAllCan ;
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
        const viewCandidate = await Candidate.findAll({ where: {status:"approved"} }, { transaction: t })
        t.commit();
        if (!viewCandidate.deletedAt) {
            return res.status(200).send( viewCandidate)
        }
        else {
            return res.status(201).json({ message: "Candidate not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = CandidateService;