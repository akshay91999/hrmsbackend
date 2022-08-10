// // const expDao = require('../dao/exp.dao');
// // const basicDao = require('../dao/basic.dao')
// const sequelize = require('sequelize')
// const db = require('../config/database')
// const path = require('path')
// //const Basic = require('../model/basic')
// const Upload = require('../model/upload.model')
// const { request } = require('http')
// var uploadService = {
//     add: add,
//     findAll: findAll,
//     findById: findById,
//     update: update,
//     deleteById: deleteById
// }

// async function add(up,res,pid) {
//     const t = await db.transaction();
//     try{
//         let pp = up;
//         //const basic = await Basic.create({...pp},{transaction:t});
//         const uploads = await Upload.create({...pp,basic_id:pid},{transaction:t});
//         t.commit();
//         return res.status(201).json({uploads})
//         //res.send(up.file)
        
//     }
    
//         catch(error) {
//             console.log(error);
//             t.rollback();
//         }
// }

// function findAll() {
//     return Upload.findAll();
// }

// function findById(id) {
//     return Upload.findByPk(id);
// }
// function deleteById(id) {
//     return Upload.destroy({ where: { id: id } });
// }

// function update(up, id) {
//     var updateUpload = {
//         document: up.document,
//         doc_type: up.doc_type,
        
        
//     };
//     return Upload.update(updateUpload, { where: { id: id } });
// }

// module.exports = uploadService;