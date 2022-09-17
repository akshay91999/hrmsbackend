const visitorService = require('../services/visitor.service');
const path = require('path')

var visitorController = {
    addVisitor: addVisitor,
    findVisitor: findVisitor,
    findVisitorById: findVisitorById,
    checkout:checkout,
    deleteById: deleteById,
    viewEmpByDepart:viewEmpByDepart
}

function addVisitor(req, res) {
    let vdata = req.body;
    let doc = req.file.path;
    visitorService.add(vdata,doc,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findVisitor(req, res) {
    visitorService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findVisitorById(req, res) {
    let pid = req.params.id;
    visitorService.findById(pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function viewEmpByDepart(req, res) {
    let dp_id = req.params.id;
    visitorService.findByDep(dp_id,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    visitorService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "deleted successfully",
                visitor: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}

function checkout(req, res) {
    const id=req.params.id
    visitorService.updatevisitor(id,res).
        then((data) => {
            res.status(200).json({
                message: "updated successfully",
              visitor: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = visitorController;