
const sequelize = require('sequelize')
const db = require('../config/database')
const path = require('path')
const multer = require('multer')
const Upload = require('../model/upload.model')

var uploadService = {
    add: add,
    findById:findById,
    update:update
    }
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './upload');
         },
        filename: function (req, file, cb) {
            cb(null , Date.now()+path.extname(file.originalname));
        }
    });
    var upload = multer({ storage: storage })
//const up = upl.single('document')
async function add(up,res,pid,doc){
    try {
        let pp=up
        
        const uploads = await Upload.create({...pp,document:doc,basic_id:pid})
        return res.status(201).json({message:"success"})
    } catch (error) {
        console.log(error);
    }
  };
  async function findById(up,res){
    try {
        let pid=up
        
        const uploads = await Upload.findAll({ where: { basic_id: pid }})
        return res.status(201).json({uploads})
    } catch (error) {
        console.log(error);
    }
  };
  async function update(up,pid,res,doc){
    try {
        
        let pp=up
        const uploads = await Upload.update({document:doc,doc_type:pp.doc_type},{where:{ basic_id:pid }})
        return res.status(201).json({message:"success"})
    } catch (error) {
        console.log(error);
    }
  };

module.exports = uploadService;