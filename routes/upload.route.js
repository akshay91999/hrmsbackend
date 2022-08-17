var multer = require('multer');
var upload = multer({dest:'images/'});
const express = require('express');
const router = express.Router();
const uploadController = require('../controller/upload.controller');

//var uprouter = {filup:fileup}
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })
 

//const up = upl.single('document')
router.post('/:id', upload.single('document'),uploadController.addFile)
router.get('/:id',uploadController.findFileById)

// async function fileup (up,req,res){
//     try {
//         const {doc_type}=req.body
//         const pid=req.params.id
//         const uploads = await  Up.create({document:req.file.path,basic_id:pid,doc_type})
//         return res.status(201).json({
//             uploads
//         });
//     } catch (error) {
//         console.error(error);
//     }
//   };
  module.exports = router