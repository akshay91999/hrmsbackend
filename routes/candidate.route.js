const express = require('express');
const router = express.Router();
const canController = require('../controller/candidate.controller');

router.post('/', canController.addCan);
router.get('/', canController.findCandidates);
router.get('/:id', canController.findCanById);
router.put('/:id', canController.upCan);

module.exports = router;

