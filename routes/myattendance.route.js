const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller');


router.get('/:id',attendanceController.findId)


module.exports = router;