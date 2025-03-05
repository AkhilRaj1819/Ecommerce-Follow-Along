const express = require('express');
 const userRouter = express.Router();

 const uploadUserImage = require('../middleWare/multer')

 const userModel = require('../models/userModel');

userRouter.post('/signup',uploadUserImage.single("image"),async(req,res)=>{
    try{
       const {name,email,password}=req.body;
       if(name==""||email==""||password==""){
        return res.status(400).send({message:"all fields required"})
       }   
       const user = await userModel.findOne({email:email})
       if(user){
        return res.status(200).send({message:"user already exists"})
       }

       const newUser = await userModel.insertOne({name,email,password});

       return res.status(200).send({message:"user registered successfully"})
       

    }catch(err){
       res.status(500).send({message: "something went wrong"})
    }
})

userModel.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(email==""||password==""){
        return res.status(400).send({message:"all fields required"})
       }
       const user = await userModel.findOne({email:email,password:password})
       if(user){
        return res.status(200).send({message:"user already exists"})
       }
       return res.status(200).send({message:"user loged successfully"})

    }catch(err){
        res.status(500).send({message: "something went wrong"})

    }

})


 module.exports = userRouter;