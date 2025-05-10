import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../ContextApi/AuthContext';

const API_URL = 'http://192.168.2.10:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication and debugging
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('Making request to:', config.url);
    console.log('Request config:', {
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('Response error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Create payment order
export const createPaymentOrder = async (amount, orderDetails, userName = 'Guest') => {
  try {
    // Use the actual order details passed to the function
    const orderData = {
      amount: amount,
      currency: 'INR',
      customerName: userName,
      orderDetails: {
        items: [
          {
            id: '1',
            name: 'Vincent Chase Eyeglasses',
            quantity: 1,
            price: 1,
            image: 'https://static.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e13784-c2-eyeglasses_g_9401_24_01_2023.jpg'
          }
        ],
        subtotal: amount,
        tax: Math.round(amount * 0.18),
        coupon: 0,
        total: amount
      }
    };

   
    const response = await api.post('/payment/create-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Payment order creation error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || error.message || 'Error creating payment order');
  }
};

// Verify payment
export const verifyPayment = async (paymentDetails) => {
  try {
    // Dummy verification data
    const dummyVerificationData = {
      razorpay_order_id: paymentDetails.razorpay_order_id || 'order_dummy123',
      razorpay_payment_id: paymentDetails.razorpay_payment_id || 'pay_dummy123',
      razorpay_signature: paymentDetails.razorpay_signature || 'dummy_signature'
    };

    console.log('Sending verification request with data:', dummyVerificationData);

    const response = await api.post('/payment/verify', dummyVerificationData);
    return response.data;
  } catch (error) {
    console.error('Payment verification error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || error.message || 'Error verifying payment');
  }
};

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      console.log('Razorpay script already loaded');
      resolve(true);
      return;
    }

    console.log('Loading Razorpay script...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      reject(new Error('Razorpay SDK failed to load'));
    };
    document.body.appendChild(script);
  });
};

// Get payment history
export const getPaymentHistory = async () => {
  try {
    // Dummy payment history data
    return {
      payments: [
        {
          id: '1',
          orderId: 'order_123456789',
          amount: 100000,
          status: 'completed',
          date: '2024-03-20',
          items: [
            {
              name: 'Vincent Chase Eyeglasses',
              quantity: 1,
              price: 100000
            }
          ]
        },
        {
          id: '2',
          orderId: 'order_987654321',
          amount: 150000,
          status: 'pending',
          date: '2024-03-19',
          items: [
            {
              name: 'Ray-Ban Sunglasses',
              quantity: 1,
              price: 150000
            }
          ]
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw new Error('Failed to fetch payment history');
  }
};

// Get payment status
export const getPaymentStatus = async (orderId) => {
  try {
    // Dummy payment status
    return {
      orderId: orderId || 'order_dummy123',
      status: 'completed',
      amount: 100000,
      date: new Date().toISOString(),
      paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
    };
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw new Error('Failed to fetch payment status');
  }
}; 