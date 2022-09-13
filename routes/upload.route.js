var multer = require('multer');
var upload = multer({dest:'upload/'});
const express = require('express');
const router = express.Router();
const path = require('path')
const uploadController = require('../controller/upload.controller');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now()+path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage })
 
router.post('/:id', upload.single('document'),uploadController.addFile)
router.get('/:id',uploadController.findFileById)
router.put('/:id',upload.single('document'),uploadController.update)


  module.exports = router