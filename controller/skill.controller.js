// const skillDao = require('../dao/skill.dao');
const sequelize = require('sequelize')
const db = require('../config/database')
const Basic = require('../model/basic')
const Skill = require('../model/skill')
var skillController = {
    addSkill: addSkill,
    findSkill: findSkill,
    findSkillById: findSkillById,
    updateSkill: updateSkill,
    deleteById: deleteById
}

async function addSkill(req, res) {
    const t = await db.transaction();
    try{
    let sk = req.body;
    //const basic = await Basic.findAll({...sk},{transaction:t});
    const skill = await Skill.create({...sk},{transaction:t});
    t.commit();
        return res.status(200).json({skill})
        
    }
        catch(error){
            console.log(error);
        };
}

function findSkillById(req, res) {
    skillDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    skillDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Basic deleted successfully",
                skill: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateSkill(req, res) {
    skillDao.updateSkill(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Basic updated successfully",
                skill: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findSkill(req, res) {
    skillDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = skillController;