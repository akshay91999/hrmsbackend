const express = require('express');
const router = express.Router();
const path =require('path')
const canController = require('../controller/candidate.controller');
var multer = require('multer');

var upload = multer({dest:'cv/'});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './cv');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now()+path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage })
router.post('/', upload.single('cv'), canController.addCan)
router.get('/pending', canController.findCanBypending);
router.get('/selected', canController.findCandidates);
router.get('/candidate_approved', canController.allapprovedcandi);
router.put('/:id', canController.upCan);

module.exports = router;

