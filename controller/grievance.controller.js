const grievanceService = require('../services/grievance.service');

var grievanceController = {
    addGrievance: addGrievance,
    findGrievance: findGrievance,
    findGrievanceById: findGrievanceById,
    updateGrievance: updateGrievance,
    deleteById: deleteById
}

function addGrievance(req, res) {
    let pid=req.params.id;
    let grievance = req.body;
    
    grievanceService.add(grievance,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findGrievanceById(req, res) {
    grievanceService.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    grievanceService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: " deleted successfully",
                grievance: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}

function updateGrievance(req, res) {
    grievanceService.updategrievance(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "updated successfully",
              grievance: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findGrievance(req, res) {
    grievanceService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = grievanceController;