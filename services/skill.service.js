// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
const Basics = require('../model/basic.model')
const Skill = require('../model/skill.model')
var skillService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(sk,res,pid) {
    const t = await db.transaction();
    try{
        let pp = sk;
        //const basic = await Basic.create({...pp},{transaction:t});
        const skills = await Skill.create({...pp,basic_id:pid},{transaction:t});
        t.commit();
        return res.status(200).json({skills})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

function findAll() {
    return Skill.findAll();
}

async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const base = await Basics.findByPk(pkid, { transaction: t })
        
        const sk = await Skill.findAll({where: { basic_id: pkid }} , { transaction: t })
        t.commit();
        if (!sk.deletedAt) {
            return res.status(200).json({sk})
        }
        else {
            return res.status(201).json({ message: "user not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}
function deleteById(id) {
    return Skill.destroy({ where: { id: id } });
}

async function update(up,id,res) {
    const t = await db.transaction();
    try {
        let pp = up;

        
        const skills = await Skill.update({...pp }, { where: { basic_id: id } }, { transaction: t })
        
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = skillService;