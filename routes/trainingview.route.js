const express = require('express');
const router = express.Router();
const empTrnController = require('../controller/emptraining.controller');


router.get('/:id',empTrnController.findEmpTrnId);


module.exports = router;