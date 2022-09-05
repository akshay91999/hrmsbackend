const travelService=require('../services/travel.service');

var travelController={
    addtravel:addtravel,
    findTravelById:findTravelById,
    findTravels:  findTravels,
    upTravel:upTravel
}
// adding BlackList
async function addtravel(req,res){
            let tData=req.body;
            let id=req.params.id
            travelService.add(tData,id,res).
            then((data)=>{
                res.send(data);
            }).catch((error)=>{
                console.log(error);
            })

}
// view blackList by their id
function findTravelById(req, res) {
    let id = req.params.id
    travelService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
// update travel data
function upTravel(req, res) {
    let up = req.body;
    let T_id = req.params.id;
    travelService.updatedata(up, T_id, res).
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

function  findTravels(req, res) {
    travelService.findall().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = travelController;