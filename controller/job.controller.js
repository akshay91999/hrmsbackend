// const skillDao = require('../dao/skill.dao');
const sequelize = require('sequelize')
const db = require('../config/database')
const Basic = require('../model/basic.model')
const Job = require('../model/job')
var jobController = {
    addJob: addJob,
    findJob: findJob,
    findJobById: findJobById,
    updateJob: updateJob,
    deleteById: deleteById
}

async function addJob(req, res) {
    const t = await db.transaction();
    try{
    let sk = req.body;
    const basic = await Basic.findAll({...sk},{transaction:t});
    const job = await Job.create({...sk,user_id:basic.id},{transaction:t});
    t.commit();
        return res.status(200).json({basic,job})
        
    }
        catch(error){
            console.log(error);
        };
}

function findJobById(req, res) {
    jobDao.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    skillDao.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Basic deleted successfully",
                skill: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateJob(req, res) {
    jobDao.updateJob(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Basic updated successfully",
                skill: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findJob(req, res) {
    jobDao.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = jobController;