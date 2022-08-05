const sequelize = require('sequelize');
const db = require('../config/database');
const Basics = require('../model/basic.model.js')
const Address = require('../model/address.model')
const Parents=require('../model/parents.model')
const bcrypt=require('bcrypt')

var basicService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}


async function add(gig,res) {

   
    const t =  await db.transaction();
    try {

        let pp = gig;
      
        const hashedpass = await bcrypt.hash(pp.passwd,10)
         console.log("hashedpassword",pass);
        const createUser = await Basics.create({...pp,passwd:hashedpass}, { transaction: t });
        const addr = await Address.create({...pp,basic_id:createUser.id},{ transaction: t })
        const parent = await Parents.create({...pp,basic_id:createUser.id},{ transaction: t })
        
        t.commit();
        return res.status(200).json({createUser, addr,parent})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}

//get by id
async function findById(gig,res) {
    const t = await db.transaction();
    try{
        let pkid=gig
    const base= await basics.findByPk(pkid,{transaction:t})
    const addr= await address.findByPk(pkid,{transaction:t})
    t.commit();
    return res.status(200).json({ base, addr })
 
    }
    catch(error)  {
            console.log(error);
            t.rollback();
        
}
}

function deleteById(req, res) {
    basics.deleteById(req.params.id).
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

function update(req, res) {
    basics.updateGig(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
                gig: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}



function findAll(req, res) {
    basics.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = basicService;