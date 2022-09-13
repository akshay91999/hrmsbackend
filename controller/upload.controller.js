
const uploadService = require('../services/upload.service');
const path = require('path');

var uploadController = {
    addFile: addFile,
    findFileById:findFileById,
    update:update
}


function addFile(req, res) {
    let up = req.body;
    let pid = req.params.id;
    let doc= req.file.path
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
function update(req, res) {
    let up = req.body;
    let pid = req.params.id
    let doc= req.file.path
    uploadService.update(up,pid,res,doc).
        then((data) => {
            res.status(200).json({
                message: "documents updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = uploadController;