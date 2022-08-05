const express = require('express');
const router = express.Router();
const skillController = require('../controller/skill.controller');

router.post('/', skillController.addSkill);
router.get('/', skillController.findSkill);
router.get('/:id', skillController.findSkillById);
router.put('/:id', skillController.updateSkill);
router.delete('/:id', skillController.deleteById);

module.exports = router;