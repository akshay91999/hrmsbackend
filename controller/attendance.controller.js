const attendanceService = require('../services/attendance.service');

const db = require('../config/database')
const Basic = require('../model/basic.model')
const Job = require('../model/job.model')

const Dept = require('../model/department.model')
const Attendance = require('../model/attendance.model')
var attendanceController = {
    add: add,
    find:find,
    findAll: findAll,
    findId:findId,
    update: update,
    
}

async function add(req, res) {
  

    let today = new Date()
    let pid = req.params.id;
    const exist = await Attendance.findOne({ where: { date:today,basic_id:pid } })
    if (exist) {
        return res.status(202).json({ message: "Already checked in" })
    }
    
    attendanceService.add(res,pid).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


async function findId(req, res) {
    
    let id = req.params.id
    
    attendanceService.findId(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
async function find(req, res) {
     
    attendanceService.find( res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


// function deleteById(req, res) {
//     empTrainingService.deleteById(req.params.id).
//         then((data) => {
//             res.status(200).json({
//                 message: "Gig deleted successfully",
//                 gig: data
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

async function update(req, res) {
    
    let id = req.params.id
   
    attendanceService.update( id,res).
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


function findAll(req, res) {
 
    attendanceService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = attendanceController;