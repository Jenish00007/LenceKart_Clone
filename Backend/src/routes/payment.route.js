const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/payment.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Protected routes
router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

module.exports = router; 