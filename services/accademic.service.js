const Academic = require('../model/accademic.model.js');
const db=require("../config/database")

var academicService = {
    findAll: findAll,
    add: add,
    findById: findById,
    deleteById: deleteById,
    updateAcademic: updateAcademic
}

function findAll() {
    return Academic.findAll();
}

async function findById(id) {
    const t = await db.transaction();
    try {
        
        const [academic,metadata]= await db.query("SELECT * FROM public.academics AS a WHERE a.basic_id="+id, { transaction: t })
        t.commit
        return academic
    }
    catch (error) {
        console.log(error);
        t.rollback();
    }
}

function deleteById(id) {
    return Academic.destroy({ where: { id: id } });
}

async function add(Adata,pid,res) {
    const t =  await db.transaction();
    try {
        let pp = Adata;  
        const createUser = await Academic.create({...pp,basic_id:pid}, { transaction: t });
        t.commit();
        return res.status(200).json({createUser})
    }
    catch (e) {
        console.log(e);
        t.rollback();
    }

}


function updateAcademic(academic, id) {
    return Academic.update({...academic}, { where: { id: id } });
}
module.exports = academicService;