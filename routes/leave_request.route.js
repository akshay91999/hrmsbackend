const express = require('express');
const router = express.Router();
const requestController = require('../controller/leave_request.controller');

router.post('/:id', requestController.addRequest);//request a leave by employee
router.get('/:id', requestController.findRequestById);//leave details of purticular employee
router.get('/', requestController.findRequest);//get all pending leaves of all employee
router.put('/:id', requestController.updateRequest);//update request



module.exports = router;