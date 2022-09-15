const ShiftService = require('../services/shift.service');

const db = require('../config/database')
const Basic = require('../model/basic.model')


var ShiftController = {
    add: add,
    find: find,
   
    findId: findId,
    
    
}

async function add(req, res) {
  

    let Tn = req.body;
    
    const emp = await Basic.findOne({
        where: { firstName: Tn.employeename }
        
    });
    
    ShiftService.add( Tn,emp,res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


async function findId(req, res) {
    
    let id = req.params.id
    
    ShiftService.findId(id, res).
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}



function find(req, res) {
 
    ShiftService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = ShiftController;