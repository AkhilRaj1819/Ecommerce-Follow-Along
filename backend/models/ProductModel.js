const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required : true,
        trim: true,
    },
    price:{
        type: Number,
        required : true,
    },
    images:{
        type:[String],
        required:true,
    },
    createdAt:{
        type: Date,
        defualt: Date.now,

    }

})

const ProductModel =mongoose.model("products",schema);

module.exports = ProductModel