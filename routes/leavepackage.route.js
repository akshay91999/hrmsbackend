const express = require('express');
const router = express.Router();
const leaveService = require('../services/leavepackage.service');


router.post('/', leaveService.add);
// router.get('/', academicController.findAcademic);
// router.get('/:id', academicController.findAcademicById);
// router.put('/:id', academicController.updateAcademic);
// router.delete('/:id', academicController.deleteById);

module.exports = router;