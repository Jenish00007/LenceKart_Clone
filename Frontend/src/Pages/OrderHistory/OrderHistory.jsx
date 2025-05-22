import { useEffect, useState } from "react";
import { Box, Text, Stack, Heading, Image, Grid, Badge, useColorModeValue, HStack, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardBg = useColorModeValue("white", "gray.800");
  const cardHoverBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "pending":
        return "yellow";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Navbar />
      <Box 
        as="main" 
        pt="80px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
        <Heading
          fontSize="28px"
          mt="2%"
          textAlign="left"
          p="4"
          bg="teal.400"
          color="whiteAlpha.900"
          borderRadius="lg"
          boxShadow="md"
          mb="6"
        >
          Order History
        </Heading>
        {loading ? (
          <Text textAlign="center" fontSize="20px" mt="20px" color="gray.500">
            Loading orders...
          </Text>
        ) : error ? (
          <Text textAlign="center" fontSize="20px" color="red" mt="20px">
            {error}
          </Text>
        ) : orders.length === 0 ? (
          <Text
            textAlign="center"
            fontSize="28px"
            color="gray"
            mt="5%"
            fontWeight="bolder"
          >
            No Order History Found
          </Text>
        ) : (
          <Stack spacing={6}>
            {orders.map((order) => (
              <Grid
                key={order._id}
                borderRadius="xl"
                fontSize="16px"
                textAlign="center"
                bg={cardBg}
                p={6}
                boxShadow="lg"
                gap="5"
                color="gray.600"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl",
                  bg: cardHoverBg,
                }}
              >
                <Grid
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    md: "30% 60%",
                    lg: "30% 60%",
                    xl: "20% 60%"
                  }}
                  gap="8"
                >
                  <Box>
                    {order.orderDetails?.items?.map((item, index) => (
                      <Image
                        key={index}
                        src={item.image}
                        alt={item.name}
                        w={{
                          base: "60%",
                          sm: "50%",
                          md: "100%",
                          lg: "100%",
                          xl: "100%",
                          "2xl": "100%"
                        }}
                        m="auto"
                        mb={index < order.orderDetails.items.length - 1 ? 4 : 0}
                        borderRadius="lg"
                        boxShadow="md"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.05)" }}
                        fallbackSrc="https://via.placeholder.com/150"
                      />
                    ))}
                  </Box>
                  <Box
                    textAlign={{
                      lg: "left",
                      md: "left",
                      sm: "center",
                      base: "center"
                    }}
                  >
                    <Text fontWeight="bold" fontSize="lg" color="teal.500" mb="2">
                      Order ID: {order.orderId}
                    </Text>
                    <Text fontWeight="600" color="gray.500" mb="2">
                      Order Date: {formatDate(order.createdAt)}
                    </Text>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      textTransform="capitalize"
                      color="gray.700"
                      mb="3"
                    >
                      {order.orderDetails.items[0].name}
                      {order.orderDetails.items.length > 1 && ` +${order.orderDetails.items.length - 1} more`}
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4} mb="4">
                      <Text fontWeight="500" fontSize="md">
                        Items: {order.orderDetails.items.length}
                      </Text>
                      <Text fontWeight="bold" fontSize="md">
                        Price: ₹{order.orderDetails.items[0].price}.00
                      </Text>
                      <Text fontWeight="500" fontSize="md">
                        Subtotal: ₹{order.orderDetails.subtotal}.00
                      </Text>
                      <Text fontWeight="500" fontSize="md">
                        Tax: ₹{order.orderDetails.tax}.00
                      </Text>
                      <Text fontWeight="500" fontSize="md">
                        Coupon: ₹{order.orderDetails.coupon}.00
                      </Text>
                      <Text fontWeight="bold" fontSize="lg" color="teal.500">
                        Total: ₹{order.orderDetails.total}.00
                      </Text>
                    </Grid>
                    <HStack spacing={4} mt={2}>
                      <Badge
                        colorScheme={getStatusColor(order.status)}
                        fontSize="md"
                        p="2"
                        borderRadius="md"
                        boxShadow="sm"
                      >
                        Status: {order.status.toUpperCase()}
                      </Badge>
                      <Badge
                        colorScheme={order.paymentDetails?.razorpay_payment_id ? "green" : "red"}
                        fontSize="md"
                        p="2"
                        borderRadius="md"
                        boxShadow="sm"
                      >
                        {order.paymentDetails?.razorpay_payment_id ? "PAID" : "UNPAID"}
                      </Badge>
                    </HStack>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Stack>
        )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default OrderHistory;
