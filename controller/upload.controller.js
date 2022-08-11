
const uploadService = require('../services/upload.service');
const path = require('path')
const multer = require('multer')
var uploadController = {
    addFile: addFile,
    findFileById:findFileById
}
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage })

function addFile(req, res) {
    let up = req.body;
    let pid = req.params.id;
    let doc=req.file.path
    uploadService.add(up,res,pid,doc).
        then((data) => {
            
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findFileById(req, res) {
    let id=req.params.id
    uploadService.findById(id,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = uploadController;