const Candidate = require('../model/candidate.model');
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
   
            
            let canData=req.body;
            const can_email=canData.email;
            if(!req.file.path){
                return res.json({message:"please upload the cv"})
            }
            
            const canExist= await Candidate.findOne({where:{email:can_email,status:'Black Listed'}});
            if(canExist){
                return res.json({message:"black listed candidate"})
            } 
            let doc=req.file.path
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