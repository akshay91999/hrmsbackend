
const gigDao = require('../services/basic.service');
var gigController = {
    addEmp: addEmp,
    findEmps: findEmps,
    findEmpById: findEmpById,
    updateEmp: updateEmp,
    deleteById: deleteById
}

function addEmp(req, res) {
    let gig = req.body;
    gigDao.add(gig,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpById(req, res) {
    let gig=req.params.id
    gigDao.findById(gig,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    gigDao.deleteById(req.params.id).
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
    gigDao.update(req.body, req.params.id).
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
    gigDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = gigController;