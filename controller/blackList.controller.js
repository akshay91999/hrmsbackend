const blackService=require('../services/blackList.service');

var BlackController={
    addBlackList:addBlackList,
    findListById:findListById,
    findBlackLists: findBlackLists,
    upBlackList:upBlackList
}
// adding BlackList
async function addBlackList(req,res){
            let blackData=req.body;
            let id=req.params.id
            blackService.add(blackData,id,res).
            then((data)=>{
                res.send(data);
            }).catch((error)=>{
                console.log(error);
            })

}
// view blackList by their id
function findListById(req, res) {
    let id = req.params.id
    blackService.findById(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}
// update blacklist data
function upBlackList(req, res) {
    let up = req.body;
    let id = req.params.id;
    blackService.upCandidate(up, id, res).
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

function  findBlackLists(req, res) {
    blackService.findall().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = BlackController;