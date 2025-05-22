import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useToast,
  Divider
} from '@chakra-ui/react';
import { createPaymentOrder, verifyPayment, loadRazorpayScript } from '../../services/payment.service';
import { AuthContext } from '../../ContextApi/AuthContext';
import { API_URL } from '../../config';
import { cartReset } from '../../redux/CartPage/action';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { handleAuthRedirect } from '../../utils/auth';

const Payment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const cart = useSelector((state) => state.cart?.cart || []);
  const coupon = useSelector((state) => state.cart?.coupon || 0);
  const [loading, setLoading] = useState(false);
  const { Authdata } = useContext(AuthContext);
  const dispatch = useDispatch();

  
  // Check authentication and shipping address on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const shippingAddress = localStorage.getItem('shippingAddress');

    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please login to proceed with payment",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    if (!shippingAddress) {
      toast({
        title: "Shipping Address Required",
        description: "Please provide shipping details first",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate('/shipping');
      return;
    }
  }, [navigate, toast]);

  const getTotalPrice = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return totalPrice;
  };

  const calculateFinalAmount = () => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.18;
    const total = subtotal + tax - (coupon || 0);
    // Convert to paise and ensure it's an integer
    return Math.round(total * 100);
  };

  const validateAmount = (amount) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      throw new Error('Invalid amount for payment');
    }
    return amount;
  };

  const validateShippingAddress = (address) => {
    const requiredFields = ['first_name', 'last_name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
    const missingFields = requiredFields.filter(field => !address[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing shipping details: ${missingFields.join(', ')}`);
    }

    if (!/^\d{10}$/.test(address.phone)) {
      throw new Error('Invalid phone number. Please enter a 10-digit number.');
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      throw new Error('Invalid pincode. Please enter a 6-digit pincode.');
    }

    return true;
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Load Razorpay script first
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      const amount = validateAmount(calculateFinalAmount());
      console.log('Payment amount in paise:', amount); // Debug log
      
      // Get and validate shipping address
      const shippingAddressStr = localStorage.getItem('shippingAddress');
      if (!shippingAddressStr) {
        throw new Error('Please provide shipping details first');
      }

      const shippingAddress = JSON.parse(shippingAddressStr);
      validateShippingAddress(shippingAddress);

      // Get auth token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to continue with payment');
      }

      // Prepare order details
      const orderDetails = {
        items: cart.map(item => ({
          productId: item._id || item.id,
          name: item.productRefLink,
          quantity: item.quantity,
          price: item.price,
          image: item.imageTsrc
        })),
        subtotal: getTotalPrice(),
        tax: getTotalPrice() * 0.18,
        coupon: coupon || 0,
        total: amount / 100, // Convert back to rupees for display
        shippingAddress
      };

      console.log('Sending order details:', { amount, orderDetails }); // Debug log

      // Create order in backend
      const response = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount,
          orderDetails,
          shippingAddress
        })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Order creation failed:', data);
        throw new Error(data.message || data.error || 'Error creating order');
      }

      console.log('Order created successfully:', data); // Debug log

      // Configure Razorpay options
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Lenskart",
        description: "Payment for your order",
        order_id: data.order.id,
        notes: data.order.notes,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verificationData = await verifyResponse.json();
            if (!verifyResponse.ok) {
              throw new Error(verificationData.message || 'Payment verification failed');
            }

            if (verificationData.success) {
              // Clear shipping address and cart
              localStorage.removeItem('shippingAddress');
              dispatch(cartReset());

              toast({
                title: "Payment Successful",
                description: `Order ID: ${verificationData.order.orderId}`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              
              navigate("/payment-success");
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: "Payment Verification Failed",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        },
        prefill: {
          name: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        theme: {
          color: "#3bb3a9"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast({
              title: "Payment Cancelled",
              description: "You can try again later",
              status: "info",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      };

      // Check if Razorpay is available
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK not loaded');
      }

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      let errorMessage = 'Something went wrong';
      
      if (error.message.includes('amount')) {
        errorMessage = 'Invalid order amount. Please try again.';
      } else if (error.message.includes('shipping')) {
        errorMessage = 'Invalid shipping details. Please update your shipping information.';
      } else if (error.message.includes('authentication') || error.message.includes('token')) {
        handleAuthRedirect(navigate, 'Please sign in to complete your payment');
        return;
      } else if (error.message.includes('Razorpay')) {
        errorMessage = 'Payment system is temporarily unavailable. Please try again later.';
      } else {
        errorMessage = error.message || 'Failed to process payment. Please try again.';
      }
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box 
        as="main" 
        pt="140px" // Add padding-top to account for fixed Navbar
        minH="calc(100vh - 140px)" // Subtract Navbar height from min-height
      >
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Heading size="lg" textAlign="center">Payment Details</Heading>
            
            <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
              <VStack spacing={4} align="stretch">
                <Heading size="md">Order Summary</Heading>
                <Divider />
                
                {cart.map((item) => (
                  <HStack key={item.id} justify="space-between">
                    <Text>{item.productRefLink || "Vincent Chase Eyeglasses"}</Text>
                    <Text>₹{Math.round(item.price + item.price * 0.18)}.00</Text>
                  </HStack>
                ))}
                
                <Divider />
                
                <HStack justify="space-between">
                  <Text fontWeight="bold">Subtotal:</Text>
                  <Text>₹{getTotalPrice()}.00</Text>
                </HStack>
                
                <HStack justify="space-between">
                  <Text fontWeight="bold">Tax (18%):</Text>
                  <Text>₹{Math.round(getTotalPrice() * 0.18)}.00</Text>
                </HStack>
                
                {coupon > 0 && (
                  <HStack justify="space-between">
                    <Text fontWeight="bold">Coupon Discount:</Text>
                    <Text color="green.500">-₹{coupon}.00</Text>
                  </HStack>
                )}
                
                <Divider />
                
                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="xl">Total:</Text>
                  <Text fontWeight="bold" fontSize="xl">
                    ₹{Math.round(getTotalPrice() + getTotalPrice() * 0.18) - (coupon || 0)}.00
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Button
              colorScheme="teal"
              size="lg"
              onClick={handlePayment}
              isLoading={loading}
              loadingText="Processing..."
            >
              Proceed to Pay
            </Button>

            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => navigate('/shipping')}
            >
              Back to Shipping
            </Button>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Payment;
