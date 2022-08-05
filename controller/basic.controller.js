
const basicService = require('../services/basic.service');
var baseController = {
    addEmp: addEmp,
    findEmps: findEmps,
    findEmpById: findEmpById,
    updateEmp: updateEmp,
    deleteById: deleteById
}

function addEmp(req, res) {
    let gig = req.body;
    basicService.add(gig,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpById(req, res) {
    let gig=req.params.id
    basicService.findById(gig,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    basicService.deleteById(req.params.id).
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

function updateEmp(req, res) {
    basicService.update(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
                gig: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmps(req, res) {
    basicService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = baseController;