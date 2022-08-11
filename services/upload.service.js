// const expDao = require('../dao/exp.dao');
// const basicDao = require('../dao/basic.dao')
const sequelize = require('sequelize')
const db = require('../config/database')
const path = require('path')
const multer = require('multer')
//const Basic = require('../model/basic')
const Upload = require('../model/upload.model')
//const { request } = require('http')
var uploadService = {
    add: add,
    findById:findById
    }
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './images');
         },
        filename: function (req, file, cb) {
            cb(null , file.originalname);
        }
    });
    var upload = multer({ storage: storage })
//const up = upl.single('document')
async function add(up,res,pid,doc){
    try {
        let pp=up
        
        const uploads = await Upload.create({...pp,document:doc,basic_id:pid})
        return res.status(201).json({uploads})
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

module.exports = uploadService;