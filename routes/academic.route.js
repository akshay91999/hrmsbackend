const express = require('express');
const router = express.Router();
const academicController = require('../controller/accademic.controller');


router.post('/:id', academicController.addAcademic);
router.get('/', academicController.findAcademic);
router.get('/:id', academicController.findAcademicById);
router.put('/:id', academicController.updateAcademic);
router.delete('/:id', academicController.deleteById);

module.exports = router;
