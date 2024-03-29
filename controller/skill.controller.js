
const skillService = require('../services/skill.service');
var skillController = {
    addSkill: addSkill,
    findSkills: findSkills,
    findSkillById: findSkillById,
    updateSkill: updateSkill,
    deleteById: deleteById
}

function addSkill(req, res) {
    let sk = req.body;
    let pid = req.params.id;
    skillService.add(sk,res,pid).
        then((data) => {
            
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findSkillById(req, res) {
    let id=req.params.id
    skillService.findById(id,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    let id=req.params.id
    skillService.deleteById(id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                sk: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateSkill(req, res) {
    let up = req.body;
    let id = req.params.id
    
    skillService.update(up,id,res).
        then((data) => {
            res.status(200).json({
                message: "skill updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findSkills(req, res) {
    skillService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = skillController;