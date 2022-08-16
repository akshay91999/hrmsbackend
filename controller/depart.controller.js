const vacService = require('../services/depart.service');
const Depart =require('../model/department.model')
var depController = {
    addDep: addDep,
    findDepbyid: findDepbyid,
    findDeps: findDeps,
    updateDep: updateDep,
}

// adding a new department
async function addDep(req, res) {
    
    let vData  = req.body;
    const [depart, created] = await Depart.findOrCreate({
        where: { departmentname:vData.departmentname },
        defaults: {...vData}
      });
    vacService.add(vData,depart,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//getting department by dep_id
function findDepbyid(req, res) {
    let dep = req.params.id
    vacService.findById(dep, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//view all departments and designations
function findDeps(req,res) {
    vacService.findall().
    then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
    });
}
//update department
function updateDep(req, res) {
    let upData = req.body;
    let v_id = req.params.id;
    vacService.upDepart(upData, v_id, res).
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

module.exports = depController;