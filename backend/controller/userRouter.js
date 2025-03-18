const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
const { userImage } = require('../middleWare/multer'); // Import the multer instance correctly

const bcrypt = require('bcrypt');

// Signup Route
userRouter.post('/signup', userImage.single("userImage"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    
    // Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // Create the new user using Mongoose's create() method
    const newUser = await userModel.create({ name, email, password: hashedPassword });
    
    return res.status(200).send({ message: "User registered successfully", user: newUser });
    
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

// Login Route
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate that required fields are provided
    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    
    // Retrieve the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Entered details are wrong" });
    }
    
    // Compare the provided password with the stored hashed password
    const matchedPass = bcrypt.compareSync(password, user.password); 
    if (matchedPass) {
      return res.status(200).send({ message: "User logged in successfully" });
    }
    
    return res.status(401).send({ message: "Entered details are wrong" });
    
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = userRouter;
