const express = require('express');
const cartRouter = express.Router();
cartRouter.get('/cartproduct/:id',async(req,res)=>{
    try {
        const {id} = req.params;
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

