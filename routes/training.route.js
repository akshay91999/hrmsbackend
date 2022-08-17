const express = require('express');
const router = express.Router();
const trnController = require('../controller/training.controller');

router.post('/', trnController.addTrn);
router.post('/:id', trnController.addTrn);
router.get('/', trnController.findTrns);
router.get('/:id', trnController.findTrnById);
router.put('/:id', trnController.updateTrn);
router.delete('/:id', trnController.deleteById);

module.exports = router;