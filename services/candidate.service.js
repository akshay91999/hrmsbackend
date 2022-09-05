const sequelize = require('sequelize');
const db = require('../config/database');
const Candidate = require('../model/candidate.model');

var CandidateService = {
    add: add,
    findall: findall,
    findById: findById,
    upCandidate: upCandidate
}
//adding candidate
async function add(canData, res) {

    const t = await db.transaction();
    try {
        const create_candidate = await Candidate.create({ ...canData}, { transaction: t });
        t.commit();
        return res.status(200).json({ create_candidate })
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
        const viewAllCan = await Candidate.findAll({where:{status:"pending",deletedAt:null}},{ transaction: t })
        t.commit();
       
        return { viewAllCan };
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

module.exports = CandidateService;