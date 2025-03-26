const mongoose = require('mongoose')

async function connect() {
    try{
        
        await mongoose.connect('mongodb+srv://akhil031215n:12IAqhdD1Fy8O5Yw@cluster0.3belmjk.mongodb.net/')
        console.log("Connected to database");

    }catch(err){
        console.log("MongoDB error: " + err)
    }
}

module.exports = connect;