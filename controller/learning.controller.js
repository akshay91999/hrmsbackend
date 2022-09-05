const learningService = require('../services/learning.service');

var learningController = {
    addLearning: addLearning,
    findLearning: findLearning,
    findAllLearning:findAllLearning,
    updateLearning: updateLearning,
    deleteById: deleteById
}
// adding learning links
function addLearning(req, res) {
    let dp_id=req.params.dp_id;
    let learnData = req.body;
    
    learningService.add(learnData,dp_id,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
// view departmentwise
function findLearning(req, res) {
    let dp_id=req.params.dp_id
    learningService.findBydpid(dp_id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findAllLearning(req,res) {
    learningService.findAllLink(req,res).
        then((data) => {
            res.send(data);
            })
        .catch((error) => {
            console.log(error);
        });
}

function updateLearning(req, res) {
    let id=req.params.id
    let upData=req.body
    learningService.updateLearning(upData,id).
        then((data) => {
            res.status(200).json({
                message: "updated successfully",
              learning: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
function deleteById(req, res) {
    learningService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "deleted successfully",
                learning: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}


module.exports = learningController;