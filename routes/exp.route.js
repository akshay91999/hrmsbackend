const express = require('express');
const router = express.Router();
const expController = require('../controller/exp.controller');

router.post('/', expController.addExp);
router.get('/', expController.findExps);
router.get('/:id', expController.findExpById);
router.put('/:id', expController.updateExp);
router.delete('/:id', expController.deleteById);

module.exports = router;