const express = require('express');
const router = express.Router();
const travelController = require('../controller/travel.controller');

router.post('/:id', travelController.addtravel);
router.get('/', travelController.findTravels);  //get all pending trip for HR
router.get('/:id', travelController.findTravelById); // both pending and accepted trip for employee
router.put('/:id', travelController.upTravel);
// router.get('/allapproved', travelController.findTravelapproved);//all approved trip for HR
// router.get('/approved/:id', travelController.findTravelByIdapproved);//all approved trip for Emp
module.exports = router;

