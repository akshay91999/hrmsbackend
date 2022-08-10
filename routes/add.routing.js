const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');
const jobRoutes = require('./job.route');
const uploadRoutes = require('./upload.route');

//const uploadRoutes = require('./upload.route')

router.use('/basics', basicRoutes);
router.use('/exp',expRoutes);
router.use('/skill',skillRoutes);
router.use('/job',jobRoutes)
router.use('/report',basicRoutes,expRoutes,skillRoutes,jobRoutes)
router.use('/upload',uploadRoutes)

//router.use('/uploads',uploadRoutes)

module.exports = router;