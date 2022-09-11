const sequelize = require('sequelize');
const db = require('../config/database');
const BlackList = require('../model/blackList.model');
const Candidate = require('../model/candidate.model');

var BlackListService = {
    add: add,
    findall: findall,
    findById: findById,
    upRejection: upRejection
}
//adding Black List
async function add(blackData,can_id,res) { 
    const t = await db.transaction();
    try {
        const addBlackList = await BlackList.create({ ...blackData,c_id:can_id }, { transaction: t });
        const upBlackList = await Candidate.update({status:"Black Listed"}, { where: { id: can_id} }, { transaction: t });
        t.commit();
        return res.status(200).json({message:"success"})
    }
    catch (error) {
        t.rollback();
        return res.status(202).json({ "error": error })
        
    }
}
//get by BlackList id
async function findById(rej_id, res) {
    const t = await db.transaction();
    try {
        const viewrej = await BlackList.findOne({ where: { id: rej_id } }, { transaction: t })
        const viewCandidate = await Candidate.findOne({ where: { id:viewrej.c_id } }, { transaction: t })
        const [viewCandidates,metadata] = await db.query("SELECT * FROM public.blacklist AS b,public.candidate AS c WHERE b.id="+rej_id+" AND b.c_id=c.id AND c.deletedat=null", { transaction: t })

        t.commit();
        if (!viewCandidate.deletedat) {
            return ({message:"success"},viewCandidates);
        }
        else {
            return res.status(201).json({ message: "Candidate not exist" ,viewrej})
        }
    }
    catch (error) {
        t.rollback();
        return res.status(202).json({ "error": error })
        
    }
}
// Update BlackList details
async function upRejection(upData, rej_id, res) {
    const t = await db.transaction();
    try {
        let pp = upData;
        const upReject = await BlackList.update({ ...pp }, { where: { id: rej_id } }, { transaction: t })
        const candi=await Candidate.update({...pp},{where:{id:upReject.c_id}})
        t.commit();
        return res.status(200).json({ message: "Updated successfully", upReject})
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}
//view all BlackList
async function findall() {
    const t = await db.transaction();
    try {
        // const viewList = await BlackList.findAll({ transaction: t });
        // const viewCandidate = await Candidate.findAll({ where: {status:"Black Listed"} }, { transaction: t });
        const [viewCandidate,metadata] = await db.query("SELECT * FROM public.blacklists AS b,public.candidate AS c WHERE b.c_id=c.id", { transaction: t })
        t.commit();
        return viewCandidate;
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}
module.exports = BlackListService;