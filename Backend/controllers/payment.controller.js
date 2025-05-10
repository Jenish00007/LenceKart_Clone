const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../Models/order.model");
require('dotenv').config();

// Validate Razorpay credentials
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are missing in environment variables');
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order and generate payment URI
const createOrder = async (req, res) => {
  try {
    console.log('Creating order with data:', req.body);
    const { amount, currency = "INR" } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        message: "Invalid amount. Amount must be a positive number",
        receivedAmount: amount 
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        message: "User not authenticated",
        error: "Missing user information"
      });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt: `order_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
      }
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);

    // Create order in database
    const newOrder = new Order({
      orderId: order.id,
      amount: amount,
      currency: currency,
      status: 'pending',
      userId: req.user._id,
      receipt: options.receipt
    });

    console.log('Saving order to database:', newOrder);
    await newOrder.save();
    console.log('Order saved successfully');

    // Generate payment URI
    const paymentUri = `https://checkout.razorpay.com/v1/checkout.js?key=${process.env.RAZORPAY_KEY_ID}&order_id=${order.id}&amount=${order.amount}&currency=${order.currency}&name=Lenskart&description=Payment for your order&prefill[name]=${req.user.name || 'Customer'}&prefill[email]=${req.user.email || 'customer@example.com'}&prefill[contact]=${req.user.phone || '9999999999'}&theme[color]=#3bb3a9`;

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentUri,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ 
      message: "Error creating order", 
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
};

// Verify payment and update order status
const verifyPayment = async (req, res) => {
  try {
    console.log('Verifying payment with data:', req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        message: "Missing required payment details",
        received: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature ? 'present' : 'missing'
        }
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log('Verifying signature:', {
      expected: expectedSignature,
      received: razorpay_signature
    });

    if (expectedSignature === razorpay_signature) {
      // Update order status in database
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { 
          status: 'completed',
          paymentId: razorpay_payment_id,
          paymentSignature: razorpay_signature
        },
        { new: true }
      );

      if (!updatedOrder) {
        throw new Error('Order not found in database');
      }

      console.log('Payment verified and order updated:', updatedOrder);
      res.status(200).json({ 
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } else {
      console.error('Invalid signature');
      res.status(400).json({ 
        message: "Invalid signature",
        details: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ 
      message: "Error verifying payment", 
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
}; 