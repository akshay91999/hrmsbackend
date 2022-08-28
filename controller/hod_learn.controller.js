const learnService = require('../services/hod_learn.service');

var learnController = {
    addLearn: addLearn,
    findLearn: findLearn,
    
    updateLearn: updateLearn,
    deleteById: deleteById
}

function addLearn(req, res) {
    let pid=req.params.id;
    let learn = req.body;
    
    learnService.add(learn,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



function deleteById(req, res) {
    learnService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                learn: data
            })
        })
       .catch((error) => {
            console.log(error);
        });
}

function updateLearn(req, res) {
    learnService.updateLearn(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
              learn: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findLearn(req, res) {
    learnService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = learnController;