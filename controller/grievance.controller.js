const grievanceService = require("../services/grievance.service");
const Job = require("../model/job.model");
const Dept = require("../model/department.model");

var grievanceController = {
  addGrievance: addGrievance,
  findGrievanceById: findGrievanceById,
  findGrievance: findGrievance,
  updateGrievance: updateGrievance,
  deleteById: deleteById,
  updateStatus: updateStatus,
};

async function addGrievance(req, res) {
  let pid = req.params.id;
  let grievance = req.body;

  grievanceService
    .add(grievance, res, pid)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function findGrievanceById(req, res) {
  let id = req.params.id;
  let tn = req.body;
  const dpt = await Dept.findOne({ where: { dp_id: id } });

  grievanceService
    .findById(id, tn, dpt, res)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteById(req, res) {
  grievanceService
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: " deleted successfully",
        grievance: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function updateGrievance(req, res) {
  let gData = req.body;
  let id = req.params.id;

  grievanceService
    .update(gData, id, res)
    .then((data) => {
      res.status(200).json({
        message: " updated successfully",
        grievance: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
function findGrievance(req, res) {
  grievanceService
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
function updateStatus(req, res) {
  let id = req.params.id;

  grievanceService
    .update(id, res)
    .then((data) => {
      res.status(200).json({
        message: " updated successfully",
        grievance: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = grievanceController;