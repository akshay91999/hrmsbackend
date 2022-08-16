const trainingService = require('../services/training.service');

const db = require('../config/database')

var trainingController = {
    addTrn: addTrn,
    findTrns: findTrns,
    findTrnById: findTrnById,
    updateTrn: updateTrn,
    deleteById: deleteById
}

function addTrn(req, res) {
  

    let trnData = req.body;
    trainingService.add(trnData, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findTrnById(req, res) {
    let id = req.params.id
    trainingService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    trainingService.deleteById(req.params.id).
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

function updateTrn(req, res) {
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

function findTrns(req, res) {
    
    trainingService.findAll(req,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = trainingController;