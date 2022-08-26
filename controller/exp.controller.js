
const expService = require('../services/exp.service');
var expController = {
    addExp: addExp,
    findExps: findExps,
    findExpById: findExpById,
    updateExp: updateExp,
    deleteById: deleteById
}

function addExp(req, res) {
    let exp = req.body;
    let pid = req.params.id;
    expService.add(exp,res,pid).
    then((data) => {
        //console.log(data)
        res.send(data);
    })
        .catch((error) => {
            console.log(error);
           
        });
}

function findExpById(req, res) {
    let exps=req.params.id
    expService.findById(exps,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    let exps=req.params.id
    expService.deleteById(exps).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                exp: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateExp(req, res) {
    let up = req.body;
    let id = req.params.id
    
    expService.update(up,id,res).
        then((data) => {
            res.status(200).json({
                message: "exp updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findExps(req, res) {
    expService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = expController;