import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../ContextApi/AuthContext';
import { API_URL } from '../config';

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

// Load Razorpay script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create payment order
export const createPaymentOrder = async (amount, orderDetails, userName = 'Guest') => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Validate input parameters
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid payment amount');
    }

    if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
      throw new Error('Invalid order details');
    }

    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount, orderDetails })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Payment order creation failed:', data);
      throw new Error(data.message || data.error || 'Error creating payment order');
    }

    return data;
  } catch (error) {
    console.error('Payment order creation error:', {
      message: error.message,
      stack: error.stack,
      details: error.response?.data
    });
    throw error;
  }
};

// Verify payment
export const verifyPayment = async (paymentDetails) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    // Validate payment details
    if (!paymentDetails || !paymentDetails.razorpay_payment_id || !paymentDetails.razorpay_order_id || !paymentDetails.razorpay_signature) {
      throw new Error('Invalid payment verification details');
    }

    const response = await fetch(`${API_URL}/api/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentDetails)
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Payment verification failed:', data);
      throw new Error(data.message || data.error || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    console.error('Payment verification error:', {
      message: error.message,
      stack: error.stack,
      details: error.response?.data
    });
    throw error;
  }
};

// Get payment history
export const getPaymentHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/payment/history`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch payment history');
    }

    return data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/payment/status/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch payment status');
    }

    return data;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
}; 