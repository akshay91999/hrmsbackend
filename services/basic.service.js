const sequelize = require('sequelize');
const basics = require('../model/basic')
const address = require('../model/address')
const db = require('../config/database');
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
      
        const pass = await bcrypt.hash(pp.passwd,10)
         console.log("hashedpassword",pass);
        const createUser = await basics.create({...pp,passwd:pass}, { transaction: t });
        const addr = await address.create({...pp,user_id:createUser.id},{ transaction: t })
        t.commit();
        return res.status(200).json({createUser, addr})
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