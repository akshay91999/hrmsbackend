const express = require('express');
const router = express.Router();
const requestController = require('../controller/leave_request.controller');

router.post('/:id', requestController.addRequest);
router.get('/:id', requestController.findRequestById);
router.get('/', requestController.findRequest);
router.put('/:id', requestController.updateRequest);



module.exports = router;