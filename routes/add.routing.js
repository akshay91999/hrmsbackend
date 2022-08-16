const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
const accademic = require('./academic.route');
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');
const jobRoutes = require('./job.route');
const uploadRoutes = require('./upload.route');
const trainingRoutes = require('./training.route')
const empTrainingRoutes = require('./emptraining.route')

router.use('/accademic', accademic);
router.use('/basics', basicRoutes);
router.use('/exp', expRoutes);
router.use('/skill', skillRoutes);
router.use('/job', jobRoutes)
router.use('/report', basicRoutes, expRoutes, skillRoutes, jobRoutes)
router.use('/upload', uploadRoutes)
//router.use('/upload/images',express.static("images"))
router.use('/addtraining',trainingRoutes)
router.use('/addemptraining',empTrainingRoutes)



module.exports = router;