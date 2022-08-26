const express = require('express');
const router = express.Router();
const empTrnController = require('../controller/emptraining.controller');

router.post('/', empTrnController.addEmpTrn);
router.post('/:id', empTrnController.addEmpTrn);
router.get('/all', empTrnController.findEmpTrns);
router.get('/:id', empTrnController.findEmpTrnById);
router.get('/view/:id',empTrnController.findEmpTrnId);
router.get('/',empTrnController.findEmp);
router.put('/:id', empTrnController.updateEmpTrn);
router.put('/', empTrnController.updateEmpTrns);
router.put('/checkin/:id', empTrnController.updateCheckin);
router.put('/checkout/:id', empTrnController.updateCheckout);
router.delete('/:id', empTrnController.deleteById);

module.exports = router;