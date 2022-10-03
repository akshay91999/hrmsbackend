const retireService = require('../services/retirement.service');

var retireController = {
    addretire: addretire,
    findretire: findretire,
    findreq: findreq,
    updateretire: updateretire,
    deleteretire:deleteretire
   
}

function addretire(req, res) {
    let resign = req.body;
    
    retireService.add(resign,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
//resign request
function findreq(req, res) {
    retireService.findallreq(req,res).
     then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


function updateretire(req, res) {
    retireService.update(req.body, req.params.id,res).
        then((data) => {
            res.status(200).json({
              retire: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findretire(req, res) {
    retireService.findall().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function deleteretire(req, res) {
    let rid = req.params.id;
    retireService.deleted( rid ,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = retireController;