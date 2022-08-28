const express = require('express');
const router = express.Router();
const visitorController = require('../controller/visitor.controller');

router.post('/', visitorController.addVisitor);
router.post('/:id', visitorController.addVisitor);
router.get('/', visitorController.findVisitor);
router.get('/:id', visitorController.findVisitorById);
router.put('/:id', visitorController.updateVisitor);
router.delete('/:id', visitorController.deleteById);

module.exports = router;