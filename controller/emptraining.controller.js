const empTrainingService = require('../services/emptraining.service');

const db = require('../config/database')
const Basic = require('../model/basic.model')
const Job = require('../model/job.model')
const Training = require('../model/training.model')
const Dept = require('../model/department.model')
const EmpTrn = require('../model/emptraining.model')
var empTrainingController = {
    addEmpTrn: addEmpTrn,
    findEmpTrns: findEmpTrns,
    findEmpTrnById: findEmpTrnById,
    findEmpTrnId: findEmpTrnId,
    findEmp: findEmp,
    updateEmpTrn: updateEmpTrn,
    updateEmpTrns: updateEmpTrns,
        deleteById: deleteById
}

async function addEmpTrn(req, res) {
  

    let Tn = req.body;
    let pid = req.params.id;
    const emp = await Basic.findOne({
        where: { id: pid }
        
    });
    const dpt = await Job.findOne({
        where:{basic_id:pid}
    })
    const trn = await Training.findOne({
        where:{training_name:Tn.training_name}
    })
    empTrainingService.add(Tn, emp,trn,dpt,res,pid).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpTrnById(req, res) {
    let id = req.params.id
    empTrainingService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
async function findEmpTrnId(req, res) {
    let tn = req.body
    let id = req.params.id
    const trn = await EmpTrn.findOne({where: {training_date:tn.training_date,time_schedule:tn.time_schedule,status:"allowed"}})
    empTrainingService.findId(id,tn, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
async function findEmp(req, res) {
    let tn = req.body
    
    const dpt = await Dept.findOne({where: {departmentname:tn.departmentname}})
    empTrainingService.find(tn,dpt, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


function deleteById(req, res) {
    empTrainingService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                gig: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateEmpTrn(req, res) {
    let up = req.body
    let id = req.params.id
    const trn = await Basic.findOne({ where: {firstName:up.firstName}})
    const trn1 = await Training.findOne({ where: {training_name:up.training_name}})
    const emp = await EmpTrn.findOne({ where:{dp_id:id}})
    empTrainingService.update(up, id,trn,trn1, res).
        then((data) => {
            res.status(200).json({
                message: "Updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateEmpTrns(req, res) {
    let up = req.body
    const dpt = await Dept.findOne({ where:{departmentname:up.departmentname}})
    const trn = await Training.findOne({ where: {training_name:up.training_name}})
    empTrainingService.updateHR(up, trn,dpt, res).
        then((data) => {
            res.status(200).json({
                message: "Updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpTrns(req, res) {
 
    empTrainingService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = empTrainingController;