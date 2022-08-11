// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
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

function findById(id) {
    return Skill.findByPk(id);
}
function deleteById(id) {
    return Skill.destroy({ where: { id: id } });
}

function update(sk, id) {
    var updateSkill = {
        hardskills: sk.hardskills,
        softskills: sk.softskills,
        
        
    };
    return Skill.update(updateSkill, { where: { id: id } });
}

module.exports = skillService;