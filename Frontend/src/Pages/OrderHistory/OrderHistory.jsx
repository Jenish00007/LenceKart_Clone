import { useEffect, useState } from "react";
import { 
  Box, 
  Text, 
  Stack, 
  Heading, 
  Image, 
  Grid, 
  Badge, 
  useColorModeValue, 
  HStack, 
  Container,
  Button,
  VStack,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { API_URL } from "../../config";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please login to view your orders",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [navigate, toast]);

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
            <Heading
              size="lg"
              textAlign="center"
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              Order History
            </Heading>

            {loading ? (
              <Text textAlign="center" fontSize="lg" color="gray.500">
                Loading orders...
              </Text>
            ) : error ? (
              <VStack spacing={4}>
                <Text textAlign="center" fontSize="lg" color="red.500">
                  {error}
                </Text>
                <Button
                  colorScheme="teal"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </VStack>
            ) : orders.length === 0 ? (
              <VStack spacing={6}>
                <Text
                  textAlign="center"
                  fontSize="xl"
                  color="gray.500"
                  fontWeight="medium"
                >
                  No Order History Found
                </Text>
                <Button
                  as={Link}
                  to="/products"
                  colorScheme="teal"
                  size="lg"
                >
                  Start Shopping
                </Button>
              </VStack>
            ) : (
              <Stack spacing={6}>
                {orders.map((order) => (
                  <Box
                    key={order._id}
                    borderRadius="xl"
                    bg={cardBg}
                    p={6}
                    boxShadow="lg"
                    transition="all 0.3s"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "xl",
                      bg: cardHoverBg,
                    }}
                  >
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        md: "30% 70%",
                        lg: "25% 75%"
                      }}
                      gap={8}
                    >
                      <Box>
                        {order.orderDetails?.items?.map((item, index) => (
                          <Box
                            key={index}
                            position="relative"
                            mb={index < order.orderDetails.items.length - 1 ? 4 : 0}
                          >
                            <Image
                              src={item.imageTsrc || item.image || item.imageUrl || '/placeholder-image.png'}
                              alt={item.name || item.productRefLink || "Product Image"}
                              w="100%"
                              h="200px"
                              objectFit="cover"
                              borderRadius="lg"
                              boxShadow="md"
                              transition="transform 0.3s"
                              _hover={{ transform: "scale(1.05)" }}
                              fallback={
                                <Box
                                  w="100%"
                                  h="200px"
                                  bg="gray.100"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  borderRadius="lg"
                                >
                                  <Text color="gray.500">No Image Available</Text>
                                </Box>
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.png';
                              }}
                            />
                          </Box>
                        ))}
                      </Box>

                      <Box>
                        <VStack align="stretch" spacing={4}>
                          <HStack justify="space-between">
                            <Text fontWeight="bold" fontSize="lg" color="teal.500">
                              Order ID: {order.orderId}
                            </Text>
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

                          <Text color="gray.600">
                            Order Date: {formatDate(order.createdAt)}
                          </Text>

                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="gray.700"
                          >
                            {order.orderDetails?.items?.[0]?.name || "Product"}
                            {order.orderDetails?.items?.length > 1 && 
                              ` +${order.orderDetails.items.length - 1} more`}
                          </Text>

                          <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap={4}
                            bg="gray.50"
                            p={4}
                            borderRadius="md"
                          >
                            <Text>Items:</Text>
                            <Text fontWeight="medium">
                              {order.orderDetails?.items?.length || 0}
                            </Text>
                            
                            <Text>Subtotal:</Text>
                            <Text fontWeight="medium">
                              {formatPrice(order.orderDetails?.subtotal || 0)}
                            </Text>
                            
                            <Text>Tax:</Text>
                            <Text fontWeight="medium">
                              {formatPrice(order.orderDetails?.tax || 0)}
                            </Text>
                            
                            {order.orderDetails?.coupon > 0 && (
                              <>
                                <Text>Coupon Discount:</Text>
                                <Text fontWeight="medium" color="green.500">
                                  -{formatPrice(order.orderDetails.coupon)}
                                </Text>
                              </>
                            )}
                            
                            <Text fontWeight="bold">Total:</Text>
                            <Text fontWeight="bold" color="teal.500">
                              {formatPrice(order.orderDetails?.total || 0)}
                            </Text>
                          </Grid>

                          <HStack spacing={4}>
                            <Badge
                              colorScheme={order.paymentDetails?.razorpay_payment_id ? "green" : "red"}
                              fontSize="md"
                              px={3}
                              py={1}
                              borderRadius="md"
                            >
                              {order.paymentDetails?.razorpay_payment_id ? "PAID" : "UNPAID"}
                            </Badge>
                            
                            <Button
                              colorScheme="teal"
                              size="sm"
                              onClick={() => navigate(`/orders/${order.orderId}`)}
                              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                              transition="all 0.2s"
                            >
                              View Details
                            </Button>
                          </HStack>
                        </VStack>
                      </Box>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            )}
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default OrderHistory;
