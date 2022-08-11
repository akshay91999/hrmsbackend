// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
const Basic = require('../model/basic.model')
const Exp = require('../model/exp')
var expService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(exp, res,pid) {
    const t = await db.transaction();
    try{
        let pp = exp;
        const basic = await Basic.create({...pp,userList_id:pid},{transaction:t});
        const Expr = await Exp.create({...pp,user_id:basic.id},{transaction:t});
        t.commit();
        return res.status(200).json({basic,Expr})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

async function findById(exps,res) {
    const t = await db.transaction();
    try{
        let pkid=exps
        //let b=req.body
    const base= await Basic.findByPk(pkid,{transaction:t})
    const Exps= await Exp.findByPk(pkid,{transaction:t})
    t.commit();
    return res.status(200).json({ base, Exps })
 
    }
    catch(error)  {
            console.log(error);
            t.rollback();
        
}
}

function deleteById(req, res) {
    expService.deleteById(req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig deleted successfully",
                exp: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function update(req, res) {
    expService.update(req.body, req.params.id).
        then((data) => {
            res.status(200).json({
                message: "Gig updated successfully",
                exp: data
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

function findAll() {
    expService.findAll().
        then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = expService;