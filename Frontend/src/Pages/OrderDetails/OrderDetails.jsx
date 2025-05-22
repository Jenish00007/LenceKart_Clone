import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  Badge,
  Image,
  Divider,
  useToast,
  Spinner,
  Card,
  CardBody,
  Stack
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { API_URL } from '../../config';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please login to view order details",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URL}/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to fetch order details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate, toast]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "green";
      case "pending":
        return "yellow";
      case "failed":
        return "red";
      case "processing":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Box 
          as="main" 
          pt="140px"
          minH="calc(100vh - 140px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" color="teal.500" />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Box 
          as="main" 
          pt="140px"
          minH="calc(100vh - 140px)"
        >
          <Container maxW="container.xl" py={8}>
            <VStack spacing={6}>
              <Text fontSize="xl" color="red.500">Order not found</Text>
              <Button
                leftIcon={<ArrowBackIcon />}
                onClick={() => navigate('/products')}
                colorScheme="teal"
              >
                Back to Orders
              </Button>
            </VStack>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box 
        as="main" 
        pt="140px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <HStack justify="space-between">
              <Button
                leftIcon={<ArrowBackIcon />}
                onClick={() => navigate('/orderhistory')}
                variant="ghost"
                colorScheme="teal"
              >
                Back to Order History
              </Button>
              <Badge
                colorScheme={getStatusColor(order.status)}
                fontSize="md"
                px={3}
                py={1}
                borderRadius="md"
              >
                {order.status?.toUpperCase()}
              </Badge>
            </HStack>

            <Card>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <Heading size="lg" color="teal.500">
                    Order Details
                  </Heading>

                  <Grid
                    templateColumns={{
                      base: "1fr",
                      md: "repeat(2, 1fr)"
                    }}
                    gap={6}
                  >
                    <VStack align="stretch" spacing={4}>
                      <Heading size="md">Order Information</Heading>
                      <Text><strong>Order ID:</strong> {order.orderId}</Text>
                      <Text><strong>Order Date:</strong> {formatDate(order.createdAt)}</Text>
                      <Text><strong>Payment Status:</strong> 
                        <Badge
                          ml={2}
                          colorScheme={order.paymentDetails?.razorpay_payment_id ? "green" : "red"}
                        >
                          {order.paymentDetails?.razorpay_payment_id ? "PAID" : "UNPAID"}
                        </Badge>
                      </Text>
                    </VStack>

                    <VStack align="stretch" spacing={4}>
                      <Heading size="md">Shipping Information</Heading>
                      <Text>
                        <strong>Name:</strong> {order.shippingAddress?.first_name} {order.shippingAddress?.last_name}
                      </Text>
                      <Text><strong>Email:</strong> {order.shippingAddress?.email}</Text>
                      <Text><strong>Phone:</strong> {order.shippingAddress?.phone}</Text>
                      <Text><strong>Address:</strong> {order.shippingAddress?.address}</Text>
                      <Text>
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                      </Text>
                    </VStack>
                  </Grid>

                  <Divider />

                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">Order Items</Heading>
                    <Stack spacing={4}>
                      {order.orderDetails?.items?.map((item, index) => (
                        <Grid
                          key={index}
                          templateColumns={{
                            base: "1fr",
                            md: "auto 1fr auto"
                          }}
                          gap={4}
                          alignItems="center"
                          p={4}
                          bg="gray.50"
                          borderRadius="md"
                        >
                          <Image
                            src={item.imageTsrc || item.image || '/placeholder-image.png'}
                            alt={item.name || "Product Image"}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                            fallback={
                              <Box
                                w="100px"
                                h="100px"
                                bg="gray.200"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="md"
                              >
                                <Text color="gray.500">No Image</Text>
                              </Box>
                            }
                          />
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="bold">{item.name || "Product"}</Text>
                            <Text color="gray.600">Quantity: {item.quantity}</Text>
                          </VStack>
                          <Text fontWeight="bold" color="teal.500">
                            {formatPrice(item.price * item.quantity)}
                          </Text>
                        </Grid>
                      ))}
                    </Stack>
                  </VStack>

                  <Divider />

                  <VStack align="stretch" spacing={4}>
                    <Heading size="md">Order Summary</Heading>
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        md: "repeat(2, 1fr)"
                      }}
                      gap={4}
                      bg="gray.50"
                      p={4}
                      borderRadius="md"
                    >
                      <VStack align="start" spacing={2}>
                        <Text><strong>Subtotal:</strong> {formatPrice(order.orderDetails?.subtotal || 0)}</Text>
                        <Text><strong>Tax:</strong> {formatPrice(order.orderDetails?.tax || 0)}</Text>
                        {order.orderDetails?.coupon > 0 && (
                          <Text color="green.500">
                            <strong>Coupon Discount:</strong> -{formatPrice(order.orderDetails.coupon)}
                          </Text>
                        )}
                      </VStack>
                      <VStack align="end" spacing={2}>
                        <Text fontSize="xl" fontWeight="bold" color="teal.500">
                          Total: {formatPrice(order.orderDetails?.total || 0)}
                        </Text>
                      </VStack>
                    </Grid>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderDetails; 