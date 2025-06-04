const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/admin.model");
const { authenticate } = require("../middlwares/authenticate.middleware");

const adminRouter = express.Router();

// Admin Signup
adminRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin with this email already exists"
      });
    }

    // Create new admin
    const admin = new Admin({
      email,
      password,
      name
    });

    await admin.save();

    // Generate token with a default secret if not set in environment
    const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret_key";
    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin signup error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating admin",
      error: error.message
    });
  }
});

// Admin Login
adminRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token with a default secret if not set in environment
    const JWT_SECRET = process.env.JWT_SECRET || "your_default_jwt_secret_key";
    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message
    });
  }
});

// Get admin profile
adminRouter.get("/profile", authenticate, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).select("-password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    console.error("Get admin profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching admin profile",
      error: error.message
    });
  }
});

module.exports = adminRouter; 