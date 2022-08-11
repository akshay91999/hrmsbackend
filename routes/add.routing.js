const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');
const accademic =require('./academic.route');
const exp =require('./exp.route');
const job=require('./job.route') 


router.use('/accademic',accademic);
router.use('/exp',exp)
router.use('/basics', basicRoutes);
router.use('/job', job);
module.exports = router;