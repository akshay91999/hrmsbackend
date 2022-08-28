const express = require('express');
const router = express.Router();
const learningController = require('../controller/learning.controller');

router.post('/', learningController.addLearning);

router.post('/:id', learningController.addLearning);

router.get('/', learningController.findLearning);
router.put('/:id', learningController.updateLearning);
router.delete('/:id', learningController.deleteById);

module.exports = router;