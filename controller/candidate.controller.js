const canService=require('../services/candidate.service');

var canController={
    addCan:addCan,
    findCanBypending:findCanBypending,
    findCandidates: findCandidates,
    upCan:upCan,
    allapprovedcandi
}

// adding candidate
async function addCan(req,res){
   
            let doc=req.file.path
            let canData=req.body;
            canService.add(canData,doc,res).
            then((data)=>{
                res.send(data);
            }).catch((error)=>{
                console.log(error);
            })

}
// view pending candidate 
function findCanBypending(req, res) {
   
    canService.findBypending(req, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
// update candidate data
function upCan(req, res) {
    let up = req.body;
    let id = req.params.id;
    canService.upCandidate(up, id, res).
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

function  findCandidates(req, res) {
    canService.findall().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
function  allapprovedcandi(req, res) {
    canService.approvedcandi().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = canController;