const express = require('express');
const router = express.Router();
const travelController = require('../controller/travel.controller');


router.get('/', travelController.findTravelapproved);//all approved trip for HR
router.get('/:id', travelController.findTravelByIdapproved);//all approved trip for Emp
module.exports = router;

