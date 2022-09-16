const express = require('express');
const router = express.Router();
const visitorController = require('../controller/visitor.controller');
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
    destination:'./uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  const upload= multer({
    storage:storage,
    fileFilter:(req, file, cb) => {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (mimetype && extname) {
        return cb(null,true);
      }
      cb("Error: The file should be an image");
    }
  })  
router.post('/', upload.single('photo'),visitorController.addVisitor);
router.get('/', visitorController.findVisitor);
router.get('/visitor/:id', visitorController.findVisitorById);
router.get('/viewEmp:id', visitorController.viewEmpByDepart);
router.put('/:id', visitorController.updateVisitor);
router.delete('/:id', visitorController.deleteById);

module.exports = router;