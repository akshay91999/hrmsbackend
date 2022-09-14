const requestService = require('../services/leave_request.service');

var requestController = {
    addRequest: addRequest,
    findRequest: findRequest,
    findRequestById: findRequestById,
    updateRequest: updateRequest,
    reject: reject,
    viewreject:viewreject,
    approvedLv:approvedLv

}
function addRequest(req, res) {
    let pid = req.params.id;
    let rData = req.body;

    requestService.add(rData, pid, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findRequest(req, res) {
    requestService.findAll(req, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findRequestById(req, res) {
    let id = req.params.id
    requestService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
// update request by employee and update status by HR
function updateRequest(req, res) {
    requestService.updateRequest(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "success",
                request: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
//reject a leave by HR
function reject(req, res) {
    requestService.rejectleave(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "success",
                request: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}
function approvedLv(req, res) {
       requestService.findAllapprovedlv(req, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function viewreject(req, res) {
       requestService.viewrejectlv(req, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
module.exports = requestController;