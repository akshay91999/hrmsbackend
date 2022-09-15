const OvertimeService = require('../services/overtime.service');

const db = require('../config/database')
const Basic = require('../model/basic.model')


var OvertimeController = {
    add: add,
    find: find,
   
    findId: findId,
    
    
}

async function add(req, res) {
  

    let Tn = req.body;
    
    const emp = await Basic.findOne({
        where: { firstName: Tn.employeename }
        
    });
    
    OvertimeService.add( Tn,emp,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


async function findId(req, res) {
    
    let id = req.params.id
    
    OvertimeService.findId(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



function find(req, res) {
 
    OvertimeService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = OvertimeController;