const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller');

router.post('/:id',attendanceController.add);
router.put('/:id',attendanceController.update)
router.get('/',attendanceController.find)
router.get('/all',attendanceController.findAll)

module.exports = router;