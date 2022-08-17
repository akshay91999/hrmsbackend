const vacService = require('../services/vacancy.service');
const Depart=require('../model/department.model')

var vacController = {
    addVac: addVac,
    findVacByPos: findVacByPos,
    findVacs: findVacs,
    updateVac: updateVac,
}
// adding a new vacancy
async function addVac(req, res) {
    let vData = req.body;

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
//getting vaccancy by dep_id and des_id
function findVacByPos(req, res) {
    let { dep, des } = req.params.id
    vacService.findByPos(dep, des, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//view all vacancy
function findVacs(req,res) {
    vacService.findall().
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