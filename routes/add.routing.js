const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
<<<<<<< HEAD
const accademic =require('./academic.route');
const exp =require('./exp.route');
const job=require('./job.route') 
=======
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');
const jobRoutes = require('./job.route');
const uploadRoutes = require('./upload.route');
>>>>>>> 0deec0649940beaef32a6b2ed6bb95e8bbfdec1f

//const uploadRoutes = require('./upload.route')

router.use('/accademic',accademic);
router.use('/exp',exp)
router.use('/basics', basicRoutes);
<<<<<<< HEAD
router.use('/job', job);
=======
router.use('/exp',expRoutes);
router.use('/skill',skillRoutes);
router.use('/job',jobRoutes)
router.use('/report',basicRoutes,expRoutes,skillRoutes,jobRoutes)
router.use('/upload',uploadRoutes)

//router.use('/uploads',uploadRoutes)

>>>>>>> 0deec0649940beaef32a6b2ed6bb95e8bbfdec1f
module.exports = router;