const express = require('express');
const router = express.Router();
const grievanceController = require('../controller/grievance.controller');


router.post('/', grievanceController.addGrievance);
router.post('/:id', grievanceController.addGrievance);

router.get('/:id', grievanceController.findGrievanceById);
router.get('/', grievanceController.findGrievance);
router.put('/:id', grievanceController.updateGrievance);
router.put('/status/:id', grievanceController.updateStatus);

module.exports = router;