const { where } = require('sequelize/types');
const Basic = require('../model/basic.model');
const Contact =require('../model/contact.model');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports= async function signin(req,res){
const {email,password}=req.body
if(!email||!password){
    res.status(422).json({error:"please add email or password"})
}
const savedUser=await Contact.findOne({where:{email:email}})
    if(!savedUser){
        res.status(422).json({error:"Invalid email or password"})
    }
    const base= await Basic.findOne({where:{id:savedUser.basic_id}})
    bcrypt.compare(password,base.password)
    .then(doMatch=>{
        if(doMatch){
            // res.json({message:"successfully signed in"})
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            const {_id,name,email}= savedUser
            res.json({token,user:{_id,name,email}})
        }
        else{
            res.status(422).json({error:"invalid password"})
        }
    })
    .catch(err=>{
        console.log(err)
    })
}