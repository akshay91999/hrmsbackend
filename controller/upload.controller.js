
const uploadService = require('../services/upload.service');
var uploadController = {
    addUpload: addUpload,
    findUploads: findUploads,
    findUploadById: findUploadById,
    updateUpload: updateUpload,
    deleteById: deleteById
}

function addUpload(req, res) {
    let up = req.body;
    let pid = req.params.id;
    uploadService.add(up,res,pid).
        then((data) => {
            
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUploadById(req, res) {
    let uploads=req.params.id
    uploadService.findById(uploads,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    let uploads=req.params.id
    uploadService.deleteById(uploads).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateUpload(req, res) {
    uploadService.update(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "exp updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findUploads(req, res) {
    uploadService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = uploadController;