const express = require("express");
const { userModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const auth = require('../middlwares/auth');

const userRouter = express.Router();

// userRouter.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const users = await userModel.find(query);
//     res.status(200).send(users);
//   } catch (error) {
//     console.log(err);
//     res.status(500).send({ err: "Something went wrong" });
//   }
// });
userRouter.get("/", async (req, res) => {
  try {
    const { search = "" } = req.query;

    // Search filter (optional)
    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { mobile: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    // Fetch all matching users
    const users = await userModel.find(searchFilter);

    // Count matching users
    const totalCount = await userModel.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      users,
      totalCount
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});



userRouter.post("/register", async (req, res) => {
  const { email, password, first_name, last_name, ph_no } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new userModel({
          first_name,
          last_name,
          ph_no,
          email,
          password: secure_password,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (err) {
    res.send("Error in registering the user");
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ 
        message: 'Server configuration error',
        error: 'JWT secret is not configured'
      });
    }

    const token = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// Add this route for authenticated user profile
userRouter.get("/profile", auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
  }
});

module.exports = userRouter;
