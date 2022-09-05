const express = require('express');
const router = express.Router();
const learningController = require('../controller/learning.controller');

router.post('/:dp_id', learningController.addLearning);
router.get('/',learningController.findAllLearning)
router.get('/:dp_id', learningController.findLearning);
router.put('/:id', learningController.updateLearning);
router.delete('/:id', learningController.deleteById);

module.exports = router;