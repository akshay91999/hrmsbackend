const express = require('express');
const router = express.Router();
const ShiftController = require('../controller/shift.controller');


router.post('/', ShiftController.add);
router.get('/:id', ShiftController.findId);
router.get('/',ShiftController.find)

module.exports = router;