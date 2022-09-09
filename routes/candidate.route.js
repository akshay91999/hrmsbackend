const express = require('express');
const router = express.Router();
const canController = require('../controller/candidate.controller');
var multer = require('multer');
var upload = multer({dest:'images/'});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './cv');
     }
});
var upload = multer({ storage: storage })
router.post('/', upload.single('cv'), canController.addCan)
router.get('/', canController.findCandidates);
router.get('/:id', canController.findCanById);
router.put('/:id', canController.upCan);

module.exports = router;

