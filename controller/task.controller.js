
const taskService = require('../services/task.service');
const Job = require('../model/job.model')
var taskController = {
    addTask: addTask,
    findTask: findTask,
    findEmp: findEmp,
    // findExpById: findExpById,
    updateTask: updateTask,
    updateStatus: updateStatus,
    // deleteById: deleteById
}

async function addTask(req, res) {
    let task = req.body;
    let pid = req.params.id;
    const job = await Job.findOne({where:{basic_id:pid}})
    taskService.add(task,res,job,pid).
    then((data) => {
        //console.log(data)
        res.send(data);
    })
        .catch((error) => {
            console.log(error);
           
        });
}

// function findExpById(req, res) {
//     let exps=req.params.id
//     expService.findById(exps,res).
//         then((data) => {
//             res.send(data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// function deleteById(req, res) {
//     let exps=req.params.id
//     expService.deleteById(exps).
//         then((data) => {
//             res.status(200).json({
//                 message: "Gig deleted successfully",
//                 exp: data
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

function updateTask(req, res) {
    let tk = req.body;
    let id = req.params.id
    
    taskService.update(tk,id,res).
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
function updateStatus(req, res) {
    
    let id = req.params.id
    
    taskService.complete(id,res).
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

function findEmp(req, res) {
    taskService.find().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findTask(req, res) {
    let id = req.params.id
    taskService.findAll(id,req,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = taskController;