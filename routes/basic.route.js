const express = require('express');
const router = express.Router();
const basicController = require('../controller/basic.controller');
const requirelogin=require('../middleware/requireLogin')

router.post('/', basicController.addEmp);

router.get('/',requirelogin, basicController.findEmps);
router.get('/:id', basicController.findEmpById);
router.put('/:id', basicController.updateEmp);
router.delete('/:id', basicController.deleteById);

module.exports = router;