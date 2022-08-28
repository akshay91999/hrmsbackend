const visitorService = require('../services/visitor.service');

var visitorController = {
    addVisitor: addVisitor,
    findVisitor: findVisitor,
    findVisitorById: findVisitorById,
    updateVisitor: updateVisitor,
    deleteById: deleteById
}

function addVisitor(req, res) {
    let pid=req.params.id;
    let visitor = req.body;
    
    visitorService.add(visitor,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findVisitorById(req, res) {
    visitorService.findById(req.params.id).
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
                message: "Gig deleted successfully",
                visitor: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}

function updateVisitor(req, res) {
    visitorService.updatevisitor(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
              visitor: data
            })
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

module.exports = visitorController;