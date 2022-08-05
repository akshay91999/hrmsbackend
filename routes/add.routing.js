const express = require('express');
const router = express.Router();
const basicRoutes = require('./basic.route');


router.use('/basics', basicRoutes);
module.exports = router;