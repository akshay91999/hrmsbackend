const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');

router.use('/basics', basicRoutes);
router.use('/exp', expRoutes);
router.use('/skill', skillRoutes);
module.exports = router;