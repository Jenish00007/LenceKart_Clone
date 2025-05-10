const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/payment.controller");
const auth = require('../middlwares/auth');

// Route logging middleware
router.use((req, res, next) => {
  console.log(`[Payment Route] ${req.method} ${req.path}`);
  console.log('Request body:', req.body);
  next();
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('[Payment Route Error]:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Payment routes are working' });
});

// Protected routes
router.post("/create-order", auth, async (req, res, next) => {
  try {
    console.log('[Create Order] Starting order creation');
    await createOrder(req, res);
  } catch (error) {
    console.error('[Create Order] Error:', error);
    next(error);
  }
});

router.post("/verify", auth, async (req, res, next) => {
  try {
    console.log('[Verify Payment] Starting payment verification');
    await verifyPayment(req, res);
  } catch (error) {
    console.error('[Verify Payment] Error:', error);
    next(error);
  }
});

// Apply error handling middleware
router.use(errorHandler);

module.exports = router; 