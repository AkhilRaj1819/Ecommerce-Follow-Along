const express = require('express');
const ProductModel=require('../models/ProductModel')
const productImages = require('../middleWare/multer')

const productRouter = express.Router();


productRouter.post('/AddProducts', (req,res,next)=>{
    productImages.array("images",6)(req,res,(err)=>{
        if(err){
            return res.status(500).send({msg:"somethig went wrong while uploading images"})
        }
    })
},async(req,res)=>{
    try{
        const {title,description,price} = req.body;
        if(!title || !description ||!price){
            return res.status(404).send({msg:"Please add all fields"})
        }
        const images = req.files;
        const imageLinkArray = [];
        images.forEach((ele)=>{
            console.log(ele);
        })
        res.status(200).send({msg:"Product added sucessfully"})
        


    }catch(err){
        return res.status(500).send({msg:"something went wronge",err})
    }

})
 
module.exports =productRouter;