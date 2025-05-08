const Razorpay = require("razorpay");
const crypto = require("crypto");
require('dotenv').config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: "Error verifying payment" });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
}; 