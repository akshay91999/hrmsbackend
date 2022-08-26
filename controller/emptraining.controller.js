const empTrainingService = require('../services/emptraining.service');

const db = require('../config/database')

var empTrainingController = {
    addEmpTrn: addEmpTrn,
    findEmpTrns: findEmpTrns,
    findEmpTrnById: findEmpTrnById,
    updateEmpTrn: updateEmpTrn,
    deleteById: deleteById
}

function addEmpTrn(req, res) {
  

    let emptrnData = req.body;
    let pid = req.params.id;
    empTrainingService.add(emptrnData, res,pid).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpTrnById(req, res) {
    let id = req.params.id
    empTrainingService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    empTrainingService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                gig: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateEmpTrn(req, res) {
    let up = req.body
    let id = req.params.id
    trainingService.update(up, id, res).
        then((data) => {
            res.status(200).json({
                message: "Updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpTrns(req, res) {
    let id = req.body
    trainingService.findById(id,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = empTrainingController;