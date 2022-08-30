const sequelize = require('sequelize')
const db = require('../config/database')
const Basic = require('../model/basic.model')
var tokenService = {
   
    find:find,
    
}
//canteen token generation
async function find(id,res) {
    const t = await db.transaction();
    try{
        const date = new Date()
        
        const basic = await Basic.findOne({attributes:['id']},{where:{id:id}})
        return res.json({date,basic})
        }
        catch (error) {
            console.log(error);
            
        }
 }

module.exports = tokenService