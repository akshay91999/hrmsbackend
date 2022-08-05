const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');

const academicRoutes = require('./academic.route')
router.use('/basics', basicRoutes);
router.use('/academic', academicRoutes);

module.exports = router;