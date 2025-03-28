const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    try {
        const dbURI = process.env.MONGO_URI;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message, err.stack);
    }
}

module.exports = connect;