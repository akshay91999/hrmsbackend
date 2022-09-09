const vacService = require('../services/vacancy.service');
const Design=require('../model/designation.model')

var vacController = {
    addVac: addVac,
    findVac: findVac,
    findvacApproved: findvacApproved,
    updateVac: updateVac,
}
// adding a new vacancy
async function addVac(req, res) {
    let vData = req.body;
    const [des, created] = await Design.findOrCreate({
        where: { designation:vData.designation,dp_id:vData.dp_id },
        defaults: {...vData}
      });
    vacService.add(vData,des,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//getting for HR to approve vacancy
function findVac(req,res) {
   
    vacService.findBypending(req,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//view all vacancy
function findvacApproved(req,res) {
    vacService.findallApprove().
    then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
    });
}
//update vaccancy
function updateVac(req, res) {
    let upData = req.body;
    let v_id = req.params.id;
    vacService.upVacancy(upData, v_id, res).
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

module.exports = vacController;