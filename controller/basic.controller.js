const basicService = require('../services/basic.service');
const db = require('../config/database');
const Contact =require('../model/contact.model')

var baseController = {
    addEmp: addEmp,
    findEmps: findEmps,
    findEmpById: findEmpById,
    updateEmp: updateEmp,
    deleteById: deleteById
}
//add employee
async function addEmp(req, res) {
    let empData = req.body;
    let emailregex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let phoneRegex = /^[6789]\d{9}$/
    let pincodeRegex = /^[6]\d{5}$/
    // email validation
    if(!emailregex.test(empData.email)){
        return res.status(202).json({ message: "Enter a valid email" })
    }
    const isEmailExist = await Contact.findOne({ where: { email: empData.email } })
    if (isEmailExist) {
        return res.status(202).json({ message: "User with the email is already exist" })
    }
    const isAltEmailExist = await Contact.findOne({ where: { altemail: empData.altemail } })
        if (isAltEmailExist) {
        return res.status(202).json({ message: "User with the alternative email is already exist" })
    }
    if(!emailregex.test(empData.altemail)){
        return res.status(202).json({ message: "Enter a valid alternative email" })
    }
    // phone number validation
    const isphoneExist = await Contact.findOne({ where: { contactnumber: empData.contactnumber } })
    if (isphoneExist) {
        return res.status(203).json({ message: "User with the phone number is already exist" })
    }
    if (!phoneRegex.test(empData.contactnumber)) {
        return res.status(203).json({ message: "Enter valid phone number" })
    }
    if (!phoneRegex.test(empData.altcontactnumber)) {
        return res.status(203).json({ message: "Enter a valid alternative phone number" })
    }
    if (!phoneRegex.test(empData.fcontactnumber)) {
        return res.status(203).json({ message: "Enter a valid father phone number" })
    }
    if (!phoneRegex.test(empData.mcontactnumber)) {
        return res.status(203).json({ message: "Enter a valid mother phone number" })
    }
    if (empData.scontactnumber) {
        if (!phoneRegex.test(empData.contactnumber)) {
            return res.status(203).json({ message: "Enter valid spouse phone number" })
        }
    }
    if (!pincodeRegex.test(empData.pincode)) {
        return res.status(203).json({ message: "Enter a valid pincode" })
    }


    basicService.add(empData, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function findEmpById(req, res) {
    let id = req.params.id
    basicService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteById(req, res) {
    basicService.deleteById(req.params.id).
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

function updateEmp(req, res) {
    let up = req.body;
    let id = req.params.id;
    basicService.updateUser(up, id, res).
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

function findEmps(req, res) {
    basicService.findall().
        then((data) => {
            return res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = baseController;