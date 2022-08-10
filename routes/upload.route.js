// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// var multer = require('multer');
// const path = require('path');
// const { pid } = require('process');
// var upload = multer({dest:'images/'});
// const db = require('../config/database')
// const uploadController = require('../controller/upload.controller');
// const Upload =require('../model/upload.model')

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './images');
//      },
//     filename: function (req, file, cb) {
//         cb(null , path.extname(file.originalname));
//     }
// });
// var upload = multer({ storage: storage })
// router.post('/', upload.single('document'), async(req, res) => {
//     const t = db.transaction()
//     try {
//         const {document,doc_type} = req.body
//         const uploads = await Upload.create({doc_type,basic_id:pid,document:req.file.path},{transaction:t})
//         t.commit()
//       return res.status(200).json({uploads})
//     }catch(error) {
//       console.log(error);
//        t.rollback
//     }
//   });

// router.post('/:id', uploadController.addUpload);
// router.get('/', uploadController.findUploads);
// router.get('/:id', uploadController.findUploadById);
// router.put('/:id', uploadController.updateUpload);
// router.delete('/:id', uploadController.deleteById);

// module.exports = router;