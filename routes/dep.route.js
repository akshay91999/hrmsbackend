const express = require('express');
const router = express.Router();
const depController = require('../controller/depart.controller');

router.post('/', depController.addDep);
router.get('/', depController.findDeps);
router.get('/:id', depController.findDepbyid);
router.put('/:id', depController.updateDep);

module.exports = router;