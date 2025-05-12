const express = require('express');
const router = express.Router();
const Order = require('../Models/order.model');
const auth = require('../middlwares/auth');

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: error.message 
    });
  }
});

// Get order by ID
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      orderId: req.params.orderId,
      userId: req.user._id 
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      message: 'Error fetching order',
      error: error.message 
    });
  }
});

// Get all orders without authentication
router.get('/public/all', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }); // Sort by newest first
    
    const totalCount = await Order.countDocuments();

    res.status(200).json({
      success: true,
      totalCount: totalCount,
      orders: orders
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching all orders',
      error: error.message 
    });
  }
});

// Update order status (Public)
router.patch('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'completed', 'failed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, completed, failed'
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
});

// Place a new order
router.post('/place-order', auth, async (req, res) => {
  try {
    const {
      amount,
      orderDetails,
      shippingAddress
    } = req.body;

    // Get userId from authenticated user
    const userId = req.user.userID;

    // Generate a unique order ID
    const orderId = 'ORD' + Date.now();

    // Validate required fields
    if (!amount || !orderDetails || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate shipping address fields
    const requiredAddressFields = ['first_name', 'last_name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
    for (const field of requiredAddressFields) {
      if (!shippingAddress[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required shipping address field: ${field}`
        });
      }
    }

    // Create new order
    const newOrder = new Order({
      orderId,
      userId,
      amount,
      orderDetails,
      shippingAddress,
      receipt: orderId,
      status: 'pending'
    });

    // Save the order
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Error placing order',
      error: error.message
    });
  }
});

module.exports = router; 