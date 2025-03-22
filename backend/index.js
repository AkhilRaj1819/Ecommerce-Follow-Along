const express = require('express');
const app = express();
const connect = require('connect');
const userRouter = require('./controller/userRouter');
const mongoose = require('mongoose')
app.use(express.json())
const dotenv=require('dotenv')
dotenv.config();
const cors = require('cors')
app.use(cors());
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
console.log(MONGO_PASSWORD)
const PORT = process.env.PORT || 8000;

const productRouter =require('./controller/productRouter')


app.get('/',(req,res)=>{
    try{
        res.status(200).send({message: "This is Ecommerce - code - Along - Backend"})

    }catch(err){
        res.status(500).send({message: "Something went wrong"});
    }
})

app.use('/user',userRouter);
app.use("/product",productRouter);

app.listen(PORT,async()=>{
    try{
        await connect();
        console.log("serrver connected sucessfully");

    }catch(err){
    console.log('server is not connected',error);
    }
})