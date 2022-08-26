const express = require('express');
const router = express.Router();
const travelController = require('../controller/travel.controller');

router.post('/:id', travelController.addtravel);
router.get('/', travelController.findTravels);
router.get('/:id', travelController.findTravelById);
router.put('/:id', travelController.upTravel);
module.exports = router;

