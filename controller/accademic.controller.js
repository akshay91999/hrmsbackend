const academicService = require('../services/accademic.service');

var academicController = {
    addAcademic: addAcademic,
    findAcademic: findAcademic,
    findAcademicById: findAcademicById,
    updateAcademic: updateAcademic,
    deleteById: deleteById
}

function addAcademic(req, res) {
    let pid=req.params.id;
    let academic = req.body;
    
    academicService.add(academic,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAcademicById(req, res) {
    let id=req.params.id
    academicService.findById(id,res).
     then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    academicService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                academic: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}

function updateAcademic(req, res) {
    academicService.updateAcademic(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "updated successfully",
              academic: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAcademic(req, res) {
    academicService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = academicController;