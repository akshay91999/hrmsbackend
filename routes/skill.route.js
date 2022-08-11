const express = require('express');
const router = express.Router();
const skillController = require('../controller/skill.controller');

router.post('/', skillController.addSkill);
router.post('/:id', skillController.addSkill);
router.get('/', skillController.findSkills);
router.get('/:id', skillController.findSkillById);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteById);

module.exports = router;