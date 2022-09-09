
const Basic = require('../model/basic.model');
const Contact =require('../model/contact.model');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const Job=require('../model/job.model')

var sign={signin:signin}

async function signin(req,res){
const {email,password}=req.body
if(!email||!password){
    res.status(422).json({error:"please add email or password"})
}
const savedUser=await Contact.findOne({where:{email:email}})
    if(!savedUser){
        res.status(422).json({error:"Invalid email or password"})
    }
    const base= await Basic.findOne({where:{id:savedUser.basic_id}})
    const job= await Job.findOne({where:{basic_id:savedUser.basic_id}})
    bcrypt.compare(password,base.password)
    .then(doMatch=>{
        if(doMatch){
            // res.json({message:"successfully signed in"})
            const token = jwt.sign({id:base.id},JWT_SECRET)
            const {id,firstname}= base
            const {user_type}=job
            res.json({token,user:{id,firstname,email,user_type}})
        }
        else{
            res.status(422).json({error:"invalid password"})
        }
    })
    .catch(err=>{
        console.log(err)
    })
}
module.exports =sign;