const express = require('express');
const router = express.Router();
const passreset=require('../controller/resetpasswd.controller')


router.put('/HR', passreset.updateHR);
router.put('/Emp', passreset.updateEmp);

module.exports = router;