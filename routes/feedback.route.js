const express = require('express');
const router = express.Router();
const feedController = require('../controller/feedback.controller');

router.post('/', feedController.addFeed);
router.post('/:id', feedController.addFeed);
router.get('/', feedController.findFeed);
router.get('/all', feedController.findAllFeed);
router.get('/:id', feedController.findFeedById);
router.put('/:id', feedController.updateFeed);

router.delete('/:id', feedController.deleteById);

module.exports = router;