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

    let depData = req.body;
    if (!depData.departmentname||!depData.designation){
        return res.status(200).json({ messege:"Please enter all the fields"})

    }
    const [depart, created] = await Depart.findOrCreate({
        where: { departmentname: depData.departmentname },
        defaults: { ...depData }
    });
    vacService.add(depData, depart, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//getting department by dep_id
function findDepbyid(req, res) {
    let dep = req.params.dp_id
    vacService.findById(dep, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//view all departments and designations
function findDeps(req, res) {
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
    let dp_Id = req.params.dp_Id;
    let ds_Id = req.params.ds_Id;
    vacService.upDepart(upData,dp_Id,ds_Id, res).
        then((data) => {
            res.status(200).json({
                message: "Updated successfully from depart controller",
                data
               
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = depController;