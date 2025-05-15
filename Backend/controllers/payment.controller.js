const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../Models/order.model");
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

// Validate Razorpay credentials
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are missing in environment variables');
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
const createOrder = async (req, res) => {
  try {
    console.log('[Create Order] Starting order creation');
    const { amount, orderDetails, shippingAddress } = req.body;
    console.log('Creating order with data:', req.body);

    // Generate unique receipt ID
    const receipt = `order_${Date.now()}`;

    // Create Razorpay order
    const razorpayOptions = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: receipt,
      notes: {
        userId: req.user._id.toString()
      }
    };

    console.log('Creating Razorpay order with options:', razorpayOptions);
    const razorpayOrder = await razorpay.orders.create(razorpayOptions);
    console.log('Razorpay order created:', razorpayOrder);

    // Create order in database
    const order = new Order({
      orderId: razorpayOrder.id,
      userId: req.user._id,
      amount: amount,
      currency: 'INR',
      status: 'pending',
      receipt: receipt,
      shippingAddress: {
        first_name: shippingAddress.first_name,
        last_name: shippingAddress.last_name,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        pincode: shippingAddress.pincode,
        country: shippingAddress.country || 'India'
      },
      orderDetails: {
        items: orderDetails.items,
        subtotal: orderDetails.subtotal,
        tax: orderDetails.tax,
        coupon: orderDetails.coupon || 0,
        total: orderDetails.total
      }
    });

    console.log('Saving order to database:', order);
    await order.save();

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
      details: error.stack
    });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }

    // Update order status
    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.status = 'completed';
    order.paymentDetails = {
      razorpay_payment_id,
      razorpay_signature
    };
    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully"
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message
    });
  }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching payment history",
      error: error.message
    });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      status: order.status,
      order
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching payment status",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getPaymentStatus
}; 