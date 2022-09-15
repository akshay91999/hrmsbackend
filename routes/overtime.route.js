const express = require('express');
const router = express.Router();
const OvertimeController = require('../controller/overtime.controller');


router.post('/', OvertimeController.add);
router.get('/:id', OvertimeController.findId);
router.get('/',OvertimeController.find)

module.exports = router;