
const expDao = require('../services/exp.service');
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
    expDao.add(exp,res,pid).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findExpById(req, res) {
    let exps=req.params.id
    expDao.findById(exps,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    expDao.deleteById(req.params.id).
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
    expDao.update(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "exp updated successfully",
                exp: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findExps(req, res) {
    expDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = expController;