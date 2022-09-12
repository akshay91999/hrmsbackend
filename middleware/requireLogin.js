const Basic = require('../model/basic.model');
const Contact =require('../model/contact.model');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const Job=require('../model/job.model')



module.exports =(req,res,next)=>{
    const {authorization} =req.headers
    if(!authorization){
       return res.status(201).json({message:"you must be logged in"})
    }
   const token = authorization.replace("Bearer ","")
   jwt.verify(token,JWT_SECRET,(err,payload)=>{
    if(err){
        return res.status(201).json({v:"you must be logged in"})
    }
    const{id}=payload
    Basic.findByPk(id,{ attributes: { exclude: ['password'] }}).then(userdata=>{
        req.user=userdata
        next()
    })
    
   })
}