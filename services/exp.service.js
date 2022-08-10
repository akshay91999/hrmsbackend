// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
//const Basic = require('../model/basic')
const Exp = require('../model/exp.model')
var expService = {
    add: add,
    findAll: findAll,
    findById: findById,
    update: update,
    deleteById: deleteById
}

async function add(exp,res,pid) {
    const t = await db.transaction();
    try{
        let pp = exp;
        //const basic = await Basic.create({...pp},{transaction:t});
        const Expr = await Exp.create({...pp,basic_id:pid},{transaction:t});
        t.commit();
        return res.status(200).json({Expr})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}

function findAll() {
    return Exp.findAll();
}

function findById(id) {
    return Exp.findByPk(id);
}
function deleteById(id) {
    return Exp.destroy({ where: { id: id } });
}

function update(exp, id) {
    var updateExp = {
        employeeid:exp.employeeid,
        employeetype: exp.employeetype,
        durationfrom: exp.durationfrom,
        durationto: exp.durationto,
        designation: exp.designation,
        annualsalary:exp.annualsalary,
        
    };
    return Exp.update(updateExp, { where: { id: id } });
}

module.exports = expService;