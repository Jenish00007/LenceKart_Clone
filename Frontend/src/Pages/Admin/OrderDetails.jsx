import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Badge,
  useToast,
  Card,
  CardBody,
  Stack,
  HStack,
  VStack,
  Divider,
  Grid,
  GridItem,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  useColorModeValue,
  IconButton,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBackIcon, EditIcon, DownloadIcon } from '@chakra-ui/icons';
import { API_URL } from '../../config';
import Navbar from './Navbar';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/admin/${orderId}`);
      const data = await response.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch order details",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/status/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Status Updated",
          description: `Order status changed to ${newStatus}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchOrderDetails();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/orders')}
                variant="ghost"
              />
              <VStack align="start" spacing={0}>
                <Heading size="lg">Order Details</Heading>
                <Text color="gray.500">Order ID: {order.orderId}</Text>
              </VStack>
            </HStack>
            <HStack spacing={4}>
              <Button
                leftIcon={<DownloadIcon />}
                variant="outline"
                onClick={() => {
                  // Add download invoice functionality
                }}
              >
                Download Invoice
              </Button>
              <Select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                width="150px"
                colorScheme={
                  order.status === 'completed' ? 'green' :
                  order.status === 'pending' ? 'yellow' : 'red'
                }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </Select>
            </HStack>
          </Flex>

          {/* Order Summary */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Order Amount</StatLabel>
                  <StatNumber>₹{order.amount}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Items</StatLabel>
                  <StatNumber>{order.orderDetails?.items?.length}</StatNumber>
                  <StatHelpText>
                    Total Items
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Order Date</StatLabel>
                  <StatNumber>{formatDate(order.createdAt)}</StatNumber>
                  <StatHelpText>
                    Last updated: {formatDate(order.updatedAt)}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </Grid>

          {/* Customer Information */}
          <Card bg={bgColor}>
            <CardBody>
              <Heading size="md" mb={4}>Customer Information</Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Name</Text>
                    <Text>{order.shippingAddress.first_name} {order.shippingAddress.last_name}</Text>
                    <Text fontWeight="bold">Email</Text>
                    <Text>{order.shippingAddress.email}</Text>
                    <Text fontWeight="bold">Phone</Text>
                    <Text>{order.shippingAddress.phone}</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Shipping Address</Text>
                    <Text>{order.shippingAddress.address}</Text>
                    <Text>{order.shippingAddress.city}, {order.shippingAddress.state}</Text>
                    <Text>{order.shippingAddress.pincode}</Text>
                    <Text>{order.shippingAddress.country}</Text>
                  </VStack>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>

          {/* Order Items */}
          <Card bg={bgColor}>
            <CardBody>
              <Heading size="md" mb={4}>Order Items</Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>Image</Th>
                    <Th>Price</Th>
                    <Th>Quantity</Th>
                    <Th>Subtotal</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {order.orderDetails?.items?.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item.name}</Td>
                      <Td>
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Td>
                      <Td>₹{item.price}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>₹{item.price * item.quantity}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Divider my={4} />

              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Payment Information</Text>
                    <Text>Payment ID: {order.paymentId || 'N/A'}</Text>
                    <Text>Receipt: {order.receipt}</Text>
                    <Badge colorScheme={order.paymentId ? "green" : "red"}>
                      {order.paymentId ? "Paid" : "Unpaid"}
                    </Badge>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Order Summary</Text>
                    <HStack justify="space-between" w="100%">
                      <Text>Subtotal:</Text>
                      <Text>₹{order.orderDetails.subtotal}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text>Tax:</Text>
                      <Text>₹{order.orderDetails.tax}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text>Coupon Discount:</Text>
                      <Text>₹{order.orderDetails.coupon}</Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between" w="100%" fontWeight="bold">
                      <Text>Total:</Text>
                      <Text>₹{order.orderDetails.total}</Text>
                    </HStack>
                  </VStack>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrderDetails; 