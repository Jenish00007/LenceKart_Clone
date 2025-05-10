import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Payment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { cart, coupon } = useSelector((state) => state.CartReducer);
  const [loading, setLoading] = useState(false);
  const { Authdata } = useContext(AuthContext);
  const userName = Authdata?.[0]?.first_name || 'Guest';

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please login to proceed with payment",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  const getTotalPrice = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return totalPrice;
  };

  const handlePayment = async () => {
    try {
      // Check authentication before proceeding
      const token = localStorage.getItem('token');
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

      setLoading(true);
      // Calculate total amount with tax and coupon
      const subtotal = getTotalPrice();
      const tax = Math.round(subtotal * 0.18);
      const total = Math.round(subtotal + tax) - (coupon || 0);
      
      // Prepare order details
      const orderDetails = {
        items: cart.map(item => ({
          id: item.id,
          name: item.productRefLink || "Vincent Chase Eyeglasses",
          quantity: item.quantity,
          price: item.price,
          image: item.imageTsrc
        })),
        subtotal,
        tax,
        coupon: coupon || 0,
        total
      };

      // Create order in backend with user's name
      const orderData = await createPaymentOrder(total, orderDetails, userName);
      console.log('Order created:', orderData);

      // Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        toast({
          title: "Error",
          description: "Razorpay SDK failed to load",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Configure Razorpay options
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Lenskart",
        description: "Payment for your order",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verification.message === "Payment verified successfully") {
              toast({
                title: "Payment Successful",
                description: "Your order has been placed successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              
              // Navigate to success page
              navigate("/payment-success");
            }
          } catch (error) {
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
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3bb3a9"
        },
        modal: {
          ondismiss: function() {
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

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading size="lg" textAlign="center">Payment Details</Heading>
          
          <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
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
            onClick={() => navigate(-1)}
          >
            Back to Checkout
          </Button>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};

export default Payment;
