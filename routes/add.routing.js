const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
const accademic = require('./academic.route');
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');
const jobRoutes = require('./job.route');
const uploadRoutes = require('./upload.route');
const requestRoutes = require('./leave_request.route');
const deptRoutes = require('./dep.route');
const leaveRoutes = require('./leavepackage.route');
const learningRoutes = require('./learning.route');
const learnRoutes = require('./hod_learn.route');
const visitorRoutes = require('./visitor.route');








const trainingRoutes = require('./training.route')
const vacancyRoute = require('./vacancy.route')


router.use('/accademic', accademic);
router.use('/basics', basicRoutes);
router.use('/exp', expRoutes);
router.use('/skill', skillRoutes);
router.use('/job', jobRoutes)
router.use('/report', basicRoutes, expRoutes, skillRoutes, jobRoutes)
router.use('/upload', uploadRoutes)
router.use('/request', requestRoutes)
//router.use('/uploads',uploadRoutes)
router.use('/dept', deptRoutes)
router.use('/leave', leaveRoutes)
router.use('/learning', learningRoutes)
router.use('/learn', learnRoutes)
router.use('/visitor', visitorRoutes)

module.exports = router;