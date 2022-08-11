// const skillDao = require('../dao/skill.dao');
const sequelize = require('sequelize')
const db = require('../config/database')
const Basic = require('../model/basic')
const Job = require('../model/job')
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
    let jobs=req.params.id
    jobService.findById(jobs,res).
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
    jobService.update(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "exp updated successfully",
                job: data
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