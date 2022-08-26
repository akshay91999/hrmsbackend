const feedbackService = require('../services/feedback.service');

const db = require('../config/database')
const Dept = require('../model/department.model')
const Training =  require('../model/training.model')
const EmpTraining = require('../model/emptraining.model')
const Feedback = require('../model/feedback.model')
var feedbackController = {
    addFeed: addFeed,
    findAllFeed: findAllFeed,
    findFeed: findFeed,
    findFeedById: findFeedById,
    updateFeed: updateFeed,
    
    deleteById: deleteById
}

async function addFeed(req, res) {
  

    let fData = req.body;
    let trnid = req.params.id
    const dept = await EmpTraining.findOne({where:{training_name:fData.training_name,basic_id:trnid,status:"completed"
    }})
    feedbackService.add(fData,trnid,dept, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
async function findFeed(req, res) {
    let tn = req.body
    const depart = await Dept.findOne({
        where: { departmentname: tn.departmentname }
        
    });
    
    feedbackService.find(tn,depart,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function findFeedById(req, res) {
    let id = req.params.id
    let tn = req.body
    const dpt = await Dept.findOne({where:{dp_id:id}})
    const trn = await Training.findOne({where:{training_name:tn.training_name}})
    feedbackService.findById(id,tn,dpt,trn, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    feedbackService.deleteById(req.params.id).
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

function updateFeed(req, res) {
    let up = req.body
    let id = req.params.id
    feedbackService.update(up, id, res).
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


function findAllFeed(req, res) {
    
    feedbackService.findAll(req,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = feedbackController;