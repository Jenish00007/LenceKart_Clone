import { useEffect, useState } from "react";
import { Box, Text, Stack, Heading, Image, Grid, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Box>
      <Navbar />
      <br />
      <Box
        minHeight="635"
        p={8}
        w={{ lg: "70%", md: "70%", sm: "98%", base: "98%" }}
        m="auto"
      >
        <Heading
          fontSize="25px"
          mt="1%"
          textAlign="left"
          p="2"
          bg="teal.400"
          color="whiteAlpha.900"
        >
          Order History
        </Heading>
        {loading ? (
          <Text textAlign="center" fontSize="20px" mt="20px">
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
            mt="1%"
            fontWeight="bolder"
          >
            No Order History Found
          </Text>
        ) : (
          <Stack spacing={4}>
            {orders.map((order) => (
              <Grid
                key={order._id}
                borderRadius="20px"
                fontSize="16px"
                textAlign="center"
                bg="whiteAlpha.900"
                p={4}
                boxShadow="dark-lg"
                gap="5"
                color="gray.600"
              >
                <Grid
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    md: "30% 60%",
                    lg: "30% 60%",
                    xl: "20% 60%"
                  }}
                  gap="5"
                >
                  <Box>
                    <Image
                      src={order.orderDetails.items[0].image}
                      w={{
                        base: "60%",
                        sm: "50%",
                        md: "100%",
                        lg: "100%",
                        xl: "100%",
                        "2xl": "100%"
                      }}
                      m="auto"
                    />
                  </Box>
                  <Box
                    textAlign={{
                      lg: "left",
                      md: "left",
                      sm: "center",
                      base: "center"
                    }}
                  >
                    <Text fontWeight="bold">
                      Order ID: {order.orderId}
                    </Text>
                    <Text fontWeight="600">
                      Order Date: {formatDate(order.createdAt)}
                    </Text>
                    <Text
                      fontSize="18px"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {order.orderDetails.items[0].name}
                    </Text>
                    <Text fontWeight="500" fontSize="15px">
                      Quantity: {order.orderDetails.items[0].quantity}
                    </Text>
                    <Text fontWeight="bold" fontSize="18px">
                      Price: ₹{order.orderDetails.items[0].price}.00
                    </Text>
                    <Text fontWeight="500" fontSize="15px">
                      Subtotal: ₹{order.orderDetails.subtotal}.00
                    </Text>
                    <Text fontWeight="500" fontSize="15px">
                      Tax: ₹{order.orderDetails.tax}.00
                    </Text>
                    <Text fontWeight="500" fontSize="15px">
                      Coupon Discount: ₹{order.orderDetails.coupon}.00
                    </Text>
                    <Text fontWeight="bold" fontSize="18px">
                      Total: ₹{order.orderDetails.total}.00
                    </Text>
                    <Badge
                      colorScheme={getStatusColor(order.status)}
                      fontSize="16px"
                      p="2"
                      borderRadius="md"
                      mt="2"
                    >
                      Status: {order.status.toUpperCase()}
                    </Badge>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Stack>
        )}
      </Box>
      <br />
      <br />
      <Footer />
    </Box>
  );
};

export default OrderHistory;
