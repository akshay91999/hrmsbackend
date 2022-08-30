const express = require('express');
const router = express.Router();
const token = require('../services/canteen.service');

router.get('/:id', token.find);

module.exports = router;