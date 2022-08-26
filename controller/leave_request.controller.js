
const requestService = require('../services/leave_request.service');

var requestController = {
    addRequest: addRequest,
   findRequest:findRequest,
   findRequestById:findRequestById,
    
    updateRequest: updateRequest,
    
}

function addRequest(req, res) {
    let pid=req.params.id;
    let request = req.body;
    
    requestService.add(request,pid,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findRequest(req, res) {
    requestService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function findRequestById(req, res) {
    requestService.findById(req.params.id).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}




function updateRequest(req, res) {
    requestService.updateRequest(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
              request: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}



module.exports = requestController;