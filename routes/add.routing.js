const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
<<<<<<< HEAD
const accademic =require('./academic.route');
=======

const accademic =require('./academic.route');

>>>>>>> dc3926c9a6942d33d77edb5deac6ee55787f8623
const expRoutes = require('./exp.route');
const skillRoutes = require('./skill.route');
const jobRoutes = require('./job.route');
const uploadRoutes = require('./upload.route');
<<<<<<< HEAD
=======


>>>>>>> dc3926c9a6942d33d77edb5deac6ee55787f8623




router.use('/accademic',accademic);

router.use('/basics', basicRoutes);

router.use('/exp',expRoutes);
router.use('/skill',skillRoutes);
router.use('/job',jobRoutes)
router.use('/report',basicRoutes,expRoutes,skillRoutes,jobRoutes)
router.use('/upload',uploadRoutes)

//router.use('/uploads',uploadRoutes)


module.exports = router;