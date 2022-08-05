const express = require('express');
const router = express.Router();
const jobController = require('../controller/job.controller');

router.post('/', jobController.addJob);
router.get('/', jobController.findJob);
router.get('/:id', jobController.findJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteById);

module.exports = router;