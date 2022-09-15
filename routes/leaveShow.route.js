const express = require('express');
const router = express.Router();
const requestController = require('../controller/leave_request.controller');



router.put('/:id',requestController.reject)
router.get('/leavApplied',requestController.viewapplied)
router.get('/reject',requestController.viewreject)
router.get('/approved',requestController.approvedLv)


module.exports = router;