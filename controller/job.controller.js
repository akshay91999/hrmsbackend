const sequelize = require('sequelize')
const db = require('../config/database')
const jobService = require('../services/job.service');

var jobController = {
    addJob: addJob,
    findJobs: findJobs,
    findJobById: findJobById,
    updateJob: updateJob,
    deleteById: deleteById
}

function addJob(req, res) {
    let job = req.body;
    let pid = req.params.id;
    jobService.add(job,res,pid).
    then((data) => {
        //console.log(data)
        res.send(data);
    })
        .catch((error) => {
            console.log(error);
           
        });
}

function findJobById(req, res) {
    let id=req.params.id
    jobService.findById(id,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    let jobs=req.params.id
    jobService.deleteById(jobs).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                job: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateJob(req, res) {
    let up = req.body;
    let id = req.params.id
    
    jobService.update(up,id,res).
        then((data) => {
            res.status(200).json({
                message: "job updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findJobs(req, res) {
    jobService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = jobController;