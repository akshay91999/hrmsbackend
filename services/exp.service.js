const sequelize = require('sequelize')
const db = require('../config/database')
const Basic = require('../model/basic.model')
const Exp = require('../model/exp.model')
var expService = {
    add: add,
    findAll:findAll,
    findById: findById,
    update: update,   
}
async function add(exp,res,pid) {
    const t = await db.transaction();
    try{
        let pp = exp;
        const Expr = await Exp.create({...pp,basic_id:pid},{transaction:t});
        t.commit();
        return res.status(200).json({Expr})
    }
    
        catch(error) {
            console.log(error);
            t.rollback();
        }
}
async function findById(id, res) {
    const t = await db.transaction();
    try {
        let pkid = id;
        const exp = await Exp.findAll({where: { basic_id: pkid }} , { transaction: t })
        t.commit();
        if (!exp.deletedat) {
            return res.status(200).json(exp)
        }
        else {
            return res.status(201).json({ message: "user not exist" })
        }
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }

}


function findAll() {
    return Exp.findAll();
}

async function update(up,id,res) {
    const t = await db.transaction();
    try {
        let pp = up;
        const exp = await Exp.update({...pp }, { where: { basic_id: id } }, { transaction: t })
        t.commit();
        return res.status(200).json({ message: "Updated successfully", })
    }
    catch (error) {
        console.log(error);
        t.rollback();
    };
}

module.exports = expService;