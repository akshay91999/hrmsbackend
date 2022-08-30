const learningService = require('../services/learning.service');

var learningController = {
    addLearning: addLearning,
    findLearning: findLearning,
    
    updateLearning: updateLearning,
    deleteById: deleteById
}

function addLearning(req, res) {
    let pid=req.params.id;
    let learning = req.body;
    
    learningService.add(learning,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function deleteById(req, res) {
    learningService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                learning: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}

function updateLearning(req, res) {
    learningService.updateLearning(req.body, req.params.id).
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

function findLearning(req, res) {
    let id=req.body.id
    learningService.findAll(id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = learningController;