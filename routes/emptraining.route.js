const express = require('express');
const router = express.Router();
const empTrnController = require('../controller/emptraining.controller');

router.post('/', empTrnController.addEmpTrn);
router.post('/:id', empTrnController.addEmpTrn);
router.get('/', empTrnController.findEmpTrns);
router.get('/:id', empTrnController.findEmpTrnById);
router.put('/:id', empTrnController.updateEmpTrn);
router.delete('/:id', empTrnController.deleteById);

module.exports = router;