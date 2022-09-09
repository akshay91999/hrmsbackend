const express = require('express');
const router = express.Router();
const vacController = require('../controller/vacancy.controller');

router.post('/', vacController.addVac);
router.get('/', vacController.findVac);
router.get('/approved', vacController.findvacApproved);
router.put('/:id', vacController.updateVac);

module.exports = router;