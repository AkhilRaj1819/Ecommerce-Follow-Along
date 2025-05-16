const express = require("express");
const app = express();
app.use(express.json());
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');

// Ensure upload directories exist
const ensureDirectoriesExist = () => {
  const uploadDirs = [
    path.join(__dirname, "uploads"),
    path.join(__dirname, "uploads/productImages"),
    path.join(__dirname, "uploads/userImages")
  ];

  uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.log(`Creating directory: ${dir}`);
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Call the function to ensure directories exist
ensureDirectoriesExist();

// Use absolute paths to ensure correct resolution on different environments
const userModel = require(path.join(__dirname, "./models/userModel"));
const cors = require("cors");
const cookieParsher = require("cookie-parser");
app.use(cookieParsher());

const cartRouter = require(path.join(__dirname, "./controller/cartProducts"));



// Configure CORS for different environments
app.use(cors({
    origin: [
        "https://ecommerce-follow-along-alpha.vercel.app",
        "http://localhost:5174",
        "http://localhost:5173",
        // Add your Render frontend URL when deployed
        process.env.FRONTEND_URL || "*"
    ],
    credentials: true,
}));

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

console.log(MONGO_PASSWORD)

const PORT = process.env.PORT || 8080;

// Use absolute paths for all imports
const useRouter = require(path.join(__dirname, "./controller/userRouter"));
const productRouter = require(path.join(__dirname, "./controller/productRouter"));
const allProductRouter = require(path.join(__dirname, "./controller/allProducts"));
const addressRouter = require(path.join(__dirname, "./controller/addressRouter"));
const mailer = require(path.join(__dirname, "./nodemailer"));
const orderRouter = require(path.join(__dirname, "./controller/orderRouter"));



app.get("/",(req,res)=>{
    try {
        res.send({message:"This is E-commerce Follow Along Backend"});
    } catch (error) {
        res.status(500).send({error});
    }
})

app.use("/user",useRouter);

app.use("/product",async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        const user = await userModel.findById(decoded.id);

        if (!user && user.id) {
            return res.status(404).json({ message: "Please signup" });
        }
        console.log(user.id)
        req.userId = user.id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Invalid Token", error });
    }
},productRouter);

app.use("/cart",
    async (req, res, next) => {
        console.log("cart")
        try {
            const token = req.cookies.token;
            console.log(token)
            if (!token) {
                return res.status(401).json({ message: "Please login" });
            }

            const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
            const user = await userModel.findById(decoded.id);

            if (!user && user.id) {
                return res.status(404).json({ message: "Please signup" });
            }
            console.log(user.id);
            req.userId = user.id;
            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Invalid Token", error });
        }
    }
    ,cartRouter);

    app.use("/address",
        async (req, res, next) => {
            console.log("cart")
            try {
                const token = req.cookies.token;
                console.log(token)
                if (!token) {
                    return res.status(401).json({ message: "Please login" });
                }

                const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
                const user = await userModel.findById(decoded.id);

                if (!user && user.id) {
                    return res.status(404).json({ message: "Please signup" });
                }
                console.log(user.id);
                req.userId = user.id;
                next();
            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: "Invalid Token", error });
            }
        } ,
        addressRouter
    );


    app.use("/order",async (req, res, next) => {
        console.log("cart")
        try {
            const token = req.cookies.token;
            console.log(token)
            if (!token) {
                return res.status(401).json({ message: "Please login" });
            }

            const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
            const user = await userModel.findById(decoded.id);

            if (!user && user.id) {
                return res.status(404).json({ message: "Please signup" });
            }
            console.log(user.id);
            req.userId = user.id;
            next();
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: "Invalid Token", error });
        }
    }, orderRouter);

app.use("/allproducts",allProductRouter);

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.listen(PORT, async () => {
    try {
       await mongoose.connect(`mongodb+srv://akhil031215n:${MONGO_PASSWORD}@cluster0.3belmjk.mongodb.net/`);
       console.log(`Server running on port ${PORT}`);
       console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log("Something went wrong not able to connect to server", error);
    }
});

//



