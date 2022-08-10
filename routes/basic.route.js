const express = require('express');
const router = express.Router();
const basicController = require('../controller/basic.controller');

router.post('/', basicController.addEmp);

router.get('/', basicController.findEmps);
router.get('/:id', basicController.findEmpById);
router.put('/:id', basicController.updateEmp);
router.delete('/:id', basicController.deleteById);

module.exports = router;