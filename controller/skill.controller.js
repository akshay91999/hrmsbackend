
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
    let skills=req.params.id
    skillService.findById(skills,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    let skills=req.params.id
    skillService.deleteById(skills).
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
    skillService.update(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "exp updated successfully",
                sk: data
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