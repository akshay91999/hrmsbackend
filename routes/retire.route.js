const express = require('express');
const router = express.Router();
const retireControl = require('../controller/retirement.controller');

router.post('/', retireControl.addretire);
router.get('/resigned',retireControl.findretire)
router.get('/req', retireControl.findreq);
router.put('/:id', retireControl.updateretire);
router.delete('/:id', retireControl.deleteretire);

module.exports = router;