const basicService = require('../services/basic.service');
const db = require('../config/database')

var baseController = {
    addEmp: addEmp,
    findEmps: findEmps,
    findEmpById: findEmpById,
    updateEmp: updateEmp,
    deleteById: deleteById
}
//add employee
function addEmp(req, res) {
  let empData = req.body;
    basicService.add(empData, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpById(req, res) {
    let id = req.params.id
    basicService.findById(id, res).
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
    let up = req.body;
    let id = req.params.id;
    basicService.updateUser(up, id, res).
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

function findEmps(req, res) {
    basicService.findall().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = baseController;