const mongoose = require('mongoose')

async function connect() {
    try{
        
        await mongoose.connect('mongodb+srv://akhil:Akhil@1819@cluster0.fvdzx.mongodb.net/')

    }catch(err){
        console.log("MongoDB error: " + err)
    }
}

module.exports = connect;