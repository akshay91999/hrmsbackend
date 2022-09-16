const db = require("../config/database");
//const depart = require('../model/department.model');
const Grievance = require("../model/grievance.model.js");
const Basic = require("../model/basic.model");
const Job = require("../model/job.model");
const Depart = require("../model/department.model");

var grievanceService = {
  add: add,
  findAll: findAll,
  deleteById: deleteById,
  updateGrievance: updateGrievance,
  update: update,
  findById: findById,
};
async function findById(id, tn, dpt, res) {
  const t = await db.transaction();
  try {
    const dep = await Depart.findOne({ where: { dp_id: id } });

    const grievance = await Grievance.findAll(
      { where: { dp_id: dep.dp_id } },
      { transaction: t }
    );

    t.commit();

    return res.status(200).json({ grievance });
  } catch (error) {
    console.log(error);
    t.rollback();
  }
}
function deleteById(id) {
  return Grievance.destroy({ where: { id: id } });
}

async function add(Adata, res, pid) {
  const t = await db.transaction();
  try {
    let pp = Adata;
    const grievance = await Grievance.create(
      { ...pp, basic_id: pid, dp_id: pid },
      { transaction: t }
    );

    t.commit();
    return res.status(200).json({ grievance });
  } catch (e) {
    console.log(e);
    t.rollback();
  }
}
async function findAll(gn, res) {
  const t = await db.transaction();
  try {
    let pkid = gn;
    const grievance = await Grievance.findAll(
      { where: { basic_id: pkid } },
      { transaction: t }
    );
    t.commit();

    return res.status(200).json({ grievance });
  } catch (error) {
    console.log(error);
    t.rollback();
  }
}
async function update(id, res) {
  const t = await db.transaction();
  try {
    const tsk = await Grievance.update(
      { status: "solved" },
      { where: { basic_id: id } },
      { transaction: t }
    );

    t.commit();
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    t.rollback();
  }
}
async function updateGrievance(gData, id, res) {
  const t = await db.transaction();
  try {
    let pp = gData;

    const grievance = await Grievance.update(
      { ...pp },
      { where: { basic_id: id } },
      { transaction: t }
    );

    t.commit();
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    t.rollback();
  }
}

module.exports = grievanceService;