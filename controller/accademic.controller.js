
const academicDao = require('../services/accademic.service');

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
    
    academicDao.add(academic,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAcademicById(req, res) {
    academicDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    academicDao.deleteById(req.params.id).
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
    academicDao.updateAcademic(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
              academic: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAcademic(req, res) {
    academicDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = academicController;