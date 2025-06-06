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
  Progress,
  useBreakpointValue,
  SimpleGrid,
  TableContainer,
  ResponsiveValue
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

  // Add responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const headerDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const cardPadding = useBreakpointValue({ base: 4, md: 6 });
  const tableDisplay = useBreakpointValue({ base: 'none', md: 'table' });
  const mobileTableDisplay = useBreakpointValue({ base: 'block', md: 'none' });

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
      <Box p={{ base: 4, md: 6 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          {/* Header */}
          <Flex 
            direction={headerDirection} 
            justify="space-between" 
            align={{ base: 'flex-start', md: 'center' }}
            gap={4}
          >
            <HStack spacing={4}>
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => navigate('/admin/orders')}
                variant="ghost"
                size={{ base: 'sm', md: 'md' }}
              />
              <VStack align="start" spacing={0}>
                <Heading size={{ base: 'md', md: 'lg' }}>Order Details</Heading>
                <Text color="gray.500" fontSize={{ base: 'sm', md: 'md' }}>Order ID: {order.orderId}</Text>
              </VStack>
            </HStack>
            <HStack spacing={4} w={{ base: 'full', md: 'auto' }}>
              <Button
                leftIcon={<DownloadIcon />}
                variant="outline"
                size={{ base: 'sm', md: 'md' }}
                w={{ base: 'full', md: 'auto' }}
                onClick={() => {
                  // Add download invoice functionality
                }}
              >
                Download Invoice
              </Button>
              <Select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                width={{ base: 'full', md: '150px' }}
                size={{ base: 'sm', md: 'md' }}
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
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Card bg={cardBg} shadow="sm" _hover={{ shadow: 'md' }}>
              <CardBody>
                <Stat>
                  <StatLabel fontSize={{ base: 'sm', md: 'md' }}>Order Amount</StatLabel>
                  <StatNumber fontSize={{ base: 'xl', md: '2xl' }}>₹{order.amount}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg} shadow="sm" _hover={{ shadow: 'md' }}>
              <CardBody>
                <Stat>
                  <StatLabel fontSize={{ base: 'sm', md: 'md' }}>Items</StatLabel>
                  <StatNumber fontSize={{ base: 'xl', md: '2xl' }}>{order.orderDetails?.items?.length}</StatNumber>
                  <StatHelpText>Total Items</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg} shadow="sm" _hover={{ shadow: 'md' }}>
              <CardBody>
                <Stat>
                  <StatLabel fontSize={{ base: 'sm', md: 'md' }}>Order Date</StatLabel>
                  <StatNumber fontSize={{ base: 'sm', md: 'md' }}>{formatDate(order.createdAt)}</StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', md: 'sm' }}>
                    Last updated: {formatDate(order.updatedAt)}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Customer Information */}
          <Card bg={bgColor} shadow="sm" _hover={{ shadow: 'md' }}>
            <CardBody p={cardPadding}>
              <Heading size={{ base: 'sm', md: 'md' }} mb={4}>Customer Information</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>Name</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.first_name} {order.shippingAddress.last_name}</Text>
                    <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>Email</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.email}</Text>
                    <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>Phone</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.phone}</Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>Shipping Address</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.address}</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.city}, {order.shippingAddress.state}</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.pincode}</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{order.shippingAddress.country}</Text>
                  </VStack>
                </GridItem>
              </SimpleGrid>
            </CardBody>
          </Card>

          {/* Order Items */}
          <Card bg={bgColor} shadow="sm" _hover={{ shadow: 'md' }}>
            <CardBody p={cardPadding}>
              <Heading size={{ base: 'sm', md: 'md' }} mb={4}>Order Items</Heading>
              
              {/* Desktop Table */}
              <TableContainer display={tableDisplay}>
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
              </TableContainer>

              {/* Mobile Table */}
              <VStack spacing={4} display={mobileTableDisplay}>
                {order.orderDetails?.items?.map((item, index) => (
                  <Card key={index} variant="outline" w="full">
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <HStack spacing={4}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            boxSize="60px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <VStack align="start" spacing={1}>
                            <Text fontWeight="bold">{item.name}</Text>
                            <Text>₹{item.price} x {item.quantity}</Text>
                            <Text fontWeight="bold">Subtotal: ₹{item.price * item.quantity}</Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>

              <Divider my={4} />

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>Payment Information</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>Payment ID: {order.paymentId || 'N/A'}</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>Receipt: {order.receipt}</Text>
                    <Badge colorScheme={order.paymentId ? "green" : "red"} fontSize={{ base: 'xs', md: 'sm' }}>
                      {order.paymentId ? "Paid" : "Unpaid"}
                    </Badge>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>Order Summary</Text>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize={{ base: 'sm', md: 'md' }}>Subtotal:</Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }}>₹{order.orderDetails.subtotal}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize={{ base: 'sm', md: 'md' }}>Tax:</Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }}>₹{order.orderDetails.tax}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text fontSize={{ base: 'sm', md: 'md' }}>Coupon Discount:</Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }}>₹{order.orderDetails.coupon}</Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between" w="100%" fontWeight="bold">
                      <Text fontSize={{ base: 'sm', md: 'md' }}>Total:</Text>
                      <Text fontSize={{ base: 'sm', md: 'md' }}>₹{order.orderDetails.total}</Text>
                    </HStack>
                  </VStack>
                </GridItem>
              </SimpleGrid>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrderDetails; 