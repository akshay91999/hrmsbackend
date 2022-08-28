const express = require('express');
const router = express.Router();
const blackController = require('../controller/blackList.controller');

router.post('/:id', blackController.addBlackList);
router.get('/', blackController.findBlackLists);
router.get('/:id', blackController.findListById);
router.put('/:id', blackController.upBlackList);

module.exports = router;

