const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/payment.controller");
const { authenticate } = require("../../middlwares/authenticate.middleware");

// Protected routes
router.post("/create-order", authenticate, createOrder);
router.post("/verify", authenticate, verifyPayment);

module.exports = router; 