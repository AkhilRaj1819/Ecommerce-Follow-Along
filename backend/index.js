const express = require('express');
const app = express();
const connect = require('connect');
const userRouter = require('./controller/userRouter');


app.get('/',(req,res)=>{
    try{
        res.status(200).send({message: "This is Ecommerce - code - Along - Backend"})

    }catch(err){
        res.status(500).send({message: "Something went wrong"});
    }
})

app.use('/user',userRouter);

app.listen(8000,async()=>{
    try{
        await connect();
        console.log("serrver connected sucessfully");

    }catch(err){
    console.log('server is not connected',error);
    }
})