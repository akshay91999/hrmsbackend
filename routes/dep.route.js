const express = require('express');
const router = express.Router();
const depController = require('../controller/depart.controller');

router.post('/', depController.addDep);
router.get('/', depController.findDeps);
router.get('/:dp_id', depController.findDepbyid);
router.put('/:dp_Id/:ds_Id', depController.updateDep);

module.exports = router;