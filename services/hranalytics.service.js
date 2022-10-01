const Basic = require("../model/basic.model");
const db = require("../config/database");


var analytics={
    gender:gender
}
async function gender(req,res){
    try{
        const t = await db.transaction();
        const male=await Basic.count({where:{gender:'male'}},{ transaction: t });
        const female=await Basic.count({where:{gender:'female'}},{ transaction: t });
        const other=await Basic.count({where:{gender:'other'}},{ transaction: t });
        t.commit();
        console.log(male,female,other)
        return res.status(200).json({male,female,other})
    }
    catch (e) {
        console.log(e);
        return (e)  
    }
}

module.exports=analytics;