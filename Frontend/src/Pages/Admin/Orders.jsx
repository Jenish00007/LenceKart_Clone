import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Flex,
  Heading,
  Text,
  Badge,
  useToast,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  useColorModeValue,
  Card,
  CardBody,
  Stack,
  HStack,
  VStack,
  Divider,
  InputGroup,
  InputLeftElement,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { FiSearch, FiEye, FiEdit, FiTrash2, FiChevronDown, FiDollarSign, FiCalendar, FiUser, FiPackage } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Orders = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [limit] = useState(10); // Items per page
  const [totalOrders, setTotalOrders] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    failed: 0
  });

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/orders/public/all?page=${page}&limit=${limit}&search=${searchQuery}&status=${statusFilter}`
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders || []);
        setTotalOrders(data.totalCount || 0);
        setTotalPages(Math.ceil(data.totalCount / limit));
        
        // Calculate stats
        const newStats = {
          total: data.totalCount || 0,
          pending: data.orders.filter(o => o.status === 'pending').length,
          completed: data.orders.filter(o => o.status === 'completed').length,
          failed: data.orders.filter(o => o.status === 'failed').length
        };
        setStats(newStats);
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
    } catch (error) {
      toast({
        title: "Error fetching orders",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedOrder(data.order);
      } else {
        console.error('Failed to fetch order details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, limit, searchQuery]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setPage(1); // Reset to first page on search
      fetchOrders();
    }, 500);
    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log('Updating status:', { orderId, newStatus });
      const response = await fetch(`${API_URL}/api/orders/status/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log('Status update response:', data);
      
      if (data.success) {
        toast({
          title: "Status Updated",
          description: `Order status changed to ${newStatus}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // Update the order status in the local state
        setOrders(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order._id === orderId) {
              console.log('Updating order:', order._id, 'New status:', newStatus);
              return { ...order, status: newStatus };
            }
            return order;
          });
          console.log('Updated orders:', updatedOrders);
          return updatedOrders;
        });
        
        // If the order is currently selected, update its details
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(prev => {
            console.log('Updating selected order:', prev._id, 'New status:', newStatus);
            return { ...prev, status: newStatus };
          });
        }
      } else {
        console.error('Failed to update order status:', data.message);
        // Revert the status in the UI if the update failed
        await fetchOrders();
      }
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Revert the status in the UI if there was an error
      await fetchOrders();
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'yellow';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          {/* Header Section */}
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="blue.600">Orders Management</Heading>
            <Text color="gray.600">Total Orders: {totalOrders}</Text>
          </Flex>

          {/* Stats Section */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Total Orders</StatLabel>
                  <StatNumber>{stats.total}</StatNumber>
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
                  <StatLabel>Pending Orders</StatLabel>
                  <StatNumber>{stats.pending}</StatNumber>
                  <Progress value={stats.pending} max={stats.total} colorScheme="yellow" />
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Completed Orders</StatLabel>
                  <StatNumber>{stats.completed}</StatNumber>
                  <Progress value={stats.completed} max={stats.total} colorScheme="green" />
                </Stat>
              </CardBody>
            </Card>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <StatLabel>Failed Orders</StatLabel>
                  <StatNumber>{stats.failed}</StatNumber>
                  <Progress value={stats.failed} max={stats.total} colorScheme="red" />
                </Stat>
              </CardBody>
            </Card>
          </Grid>

          {/* Filters Section */}
          <Card bg={cardBg} p={4}>
            <CardBody>
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                <GridItem>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search orders..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </GridItem>

                <GridItem>
                  <Select
                    placeholder="Filter by status"
                    value={statusFilter}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </Select>
                </GridItem>

                <GridItem>
                  <Select
                    placeholder="Sort by"
                    onChange={(e) => {
                      // Add sorting logic here
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="amount_high">Amount: High to Low</option>
                    <option value="amount_low">Amount: Low to High</option>
                  </Select>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>

          {/* Orders Table/Cards */}
          <Card bg={bgColor} overflowX="auto">
            <CardBody>
              {/* Table View for Desktop */}
              <Box display={{ base: 'none', md: 'block' }}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Customer</Th>
                      <Th>Amount</Th>
                      <Th>Date</Th>
                      <Th>Status</Th>
                      <Th>Payment</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.map((order) => (
                      <Tr key={order._id}>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{order.orderId}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {order.receipt}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text>{order.shippingAddress?.first_name} {order.shippingAddress?.last_name}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {order.shippingAddress?.email}
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Text fontWeight="bold">₹{order.amount}</Text>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text>{formatDate(order.createdAt)}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {order.orderDetails?.items?.length} items
                            </Text>
                          </VStack>
                        </Td>
                        <Td>
                          <Select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            size="sm"
                            colorScheme={getStatusColor(order.status)}
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                          </Select>
                        </Td>
                        <Td>
                          <Badge colorScheme={order.paymentId ? "green" : "red"}>
                            {order.paymentId ? "Paid" : "Unpaid"}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Tooltip label="View Details">
                              <IconButton
                                icon={<FiEye />}
                                colorScheme="blue"
                                variant="ghost"
                                onClick={() => navigate(`/admin/orders/${order.orderId}`)}
                              />
                            </Tooltip>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              {/* Card View for Mobile */}
              <Box display={{ base: 'block', md: 'none' }}>
                <VStack spacing={4} align="stretch">
                  {orders.map((order) => (
                    <Card key={order._id} variant="outline">
                      <CardBody>
                        <VStack align="stretch" spacing={3}>
                          <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                            <VStack align="start" spacing={0} maxW="70%">
                              <Text 
                                fontWeight="bold" 
                                fontSize={{ base: "xs", sm: "sm" }}
                                noOfLines={1}
                              >
                                {order.orderId}
                              </Text>
                              <Text 
                                fontSize={{ base: "2xs", sm: "xs" }} 
                                color="gray.500"
                                noOfLines={1}
                              >
                                {order.receipt}
                              </Text>
                            </VStack>
                            <Badge 
                              fontSize={{ base: "2xs", sm: "xs" }}
                              colorScheme={order.paymentId ? "green" : "red"}
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {order.paymentId ? "Paid" : "Unpaid"}
                            </Badge>
                          </Flex>

                          <Divider />

                          <HStack justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text 
                                fontSize={{ base: "xs", sm: "sm" }} 
                                color="gray.600"
                              >
                                Customer
                              </Text>
                              <Text 
                                fontSize={{ base: "sm", sm: "md" }}
                              >
                                {order.shippingAddress?.first_name} {order.shippingAddress?.last_name}
                              </Text>
                              <Text 
                                fontSize={{ base: "xs", sm: "sm" }} 
                                color="gray.500"
                              >
                                {order.shippingAddress?.email}
                              </Text>
                            </VStack>
                          </HStack>

                          <HStack justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text 
                                fontSize={{ base: "xs", sm: "sm" }} 
                                color="gray.600"
                              >
                                Amount
                              </Text>
                              <Text 
                                fontWeight="bold"
                                fontSize={{ base: "sm", sm: "md" }}
                              >
                                ₹{order.amount}
                              </Text>
                            </VStack>
                            <VStack align="end" spacing={0}>
                              <Text 
                                fontSize={{ base: "xs", sm: "sm" }} 
                                color="gray.600"
                              >
                                Date
                              </Text>
                              <Text 
                                fontSize={{ base: "sm", sm: "md" }}
                              >
                                {formatDate(order.createdAt)}
                              </Text>
                              <Text 
                                fontSize={{ base: "xs", sm: "sm" }} 
                                color="gray.500"
                              >
                                {order.orderDetails?.items?.length} items
                              </Text>
                            </VStack>
                          </HStack>

                          <Divider />

                          <HStack justify="space-between">
                            <Select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              size={{ base: "xs", sm: "sm" }}
                              colorScheme={getStatusColor(order.status)}
                              width="60%"
                              fontSize={{ base: "xs", sm: "sm" }}
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                            </Select>
                            <IconButton
                              icon={<FiEye />}
                              colorScheme="blue"
                              variant="ghost"
                              size={{ base: "sm", sm: "md" }}
                              onClick={() => navigate(`/admin/orders/${order.orderId}`)}
                            />
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </Box>
            </CardBody>
          </Card>

          {/* Pagination */}
          {orders.length > 0 && (
            <Flex justify="center" mt={4}>
              <HStack spacing={4}>
                <Button
                  onClick={() => setPage(1)}
                  isDisabled={page === 1}
                  variant="outline"
                >
                  First
                </Button>
                <Button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  isDisabled={page === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                <Text>Page {page} of {totalPages}</Text>
                <Button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  isDisabled={page === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
                <Button
                  onClick={() => setPage(totalPages)}
                  isDisabled={page === totalPages}
                  variant="outline"
                >
                  Last
                </Button>
              </HStack>
            </Flex>
          )}
        </VStack>
      </Box>

      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="order-info">
                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
                <p><strong>Currency:</strong> {selectedOrder.currency}</p>
                <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Last Updated:</strong> {formatDate(selectedOrder.updatedAt)}</p>
                <p><strong>Status:</strong> 
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className={`status-select ${selectedOrder.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </p>
                <p><strong>Payment ID:</strong> {selectedOrder.paymentId || 'N/A'}</p>
                <p><strong>Receipt:</strong> {selectedOrder.receipt}</p>
              </div>
              <div className="order-items">
                <h4>Order Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderDetails?.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-summary">
                  <p><strong>Subtotal:</strong> ₹{selectedOrder.orderDetails?.subtotal}</p>
                  <p><strong>Tax:</strong> ₹{selectedOrder.orderDetails?.tax}</p>
                  <p><strong>Coupon Discount:</strong> ₹{selectedOrder.orderDetails?.coupon}</p>
                  <p><strong>Total:</strong> ₹{selectedOrder.orderDetails?.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Orders; 