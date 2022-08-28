const express = require('express');
const router = express.Router();
const learnController = require('../controller/hod_learn.controller');

router.post('/', learnController.addLearn);

router.post('/:id', learnController.addLearn);

router.get('/', learnController.findLearn);
router.put('/:id', learnController.updateLearn);
router.delete('/:id', learnController.deleteById);

module.exports = router;