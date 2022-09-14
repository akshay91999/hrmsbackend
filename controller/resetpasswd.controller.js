const sequelize = require('sequelize')
const db = require('../config/database')
const passreset=require('../services/resetpaswd.service')

var resetController = {
    updateHR:updateHR,
    updateEmp: updateEmp
}
function updateHR(req, res) {
    let id = req.body.basic_id;
   
    passreset.updatePasswdByHR(id,res).
        then((data) => {
            res.status(200).json({
                message: "updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
function updateEmp(req, res) {
    let id = req.body.id;
    passreset.updatePasswdByEmp(req,res).
        then((data) => {
            res.status(200).json({
                message: " updated successfully",
                up: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
module.exports=resetController;