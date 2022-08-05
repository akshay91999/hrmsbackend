const Skill = require('../model/skill');
var skillDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateSkill: updateSkill
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

function create(skill) {
    var newSkill = new Skill(skill);
    return newSkill.save();
}

function updateSkill(skill, id) {
    var updateSkill = {
        title: skill.title,
        technologies: skill.technologies,
        description: skill.description,
        budget: skill.budget,
        contact_email: skill.contact_email
    };
    return Skill.update(updateSkill, { where: { id: id } });
}
module.exports = skillDao;