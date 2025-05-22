import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  VStack,
  HStack,
  Progress,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Flex,
  Spinner,
  useToast,
  Divider,
  Badge
} from '@chakra-ui/react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiTrendingDown, FiPackage, FiShoppingCart } from 'react-icons/fi';
import { API_URL } from '../../config';
import Navbar from './Navbar';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch user count
      const usersResponse = await fetch(`${API_URL}/user/`);
      const usersData = await usersResponse.json();
      const totalUsers = Array.isArray(usersData) ? usersData.length : 
                        usersData.users ? usersData.users.length : 0;
      const activeUsers = Array.isArray(usersData) ? 
                        usersData.filter(user => user.isActive).length : 0;

      // Fetch product count
      const productsResponse = await fetch(`${API_URL}/product`);
      const productsData = await productsResponse.json();
      const totalProducts = productsData.totalCount;

      // Fetch order count and revenue
      const ordersResponse = await fetch(`${API_URL}/api/orders/public/all`);
      const ordersData = await ordersResponse.json();
      const orders = ordersData.success ? ordersData.orders : [];
      const totalOrders = ordersData.success ? ordersData.totalCount : 0;
      const completedOrders = orders.filter(order => order.status === 'completed').length;
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const totalRevenue = orders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + (order.amount || 0), 0);

      setStats({
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        activeUsers,
        pendingOrders,
        completedOrders
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to fetch analytics data');
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box bg="gray.50" minH="100vh">
        <Navbar />
        <Flex justify="center" align="center" h="80vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg="gray.50" minH="100vh">
        <Navbar />
        <Box p={6}>
          <Text color="red.500">{error}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Box p={6}>
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="blue.600">Dashboard Analytics</Heading>
            <Badge colorScheme="blue" fontSize="md" px={3} py={1} borderRadius="full">
              Last Updated: {new Date().toLocaleTimeString()}
            </Badge>
          </Flex>

          {/* Main Stats */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <HStack spacing={4}>
                    <Icon as={FiUsers} boxSize={8} color="blue.500" />
                    <Box>
                      <StatLabel>Total Users</StatLabel>
                      <StatNumber>{stats.totalUsers}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% Active
                      </StatHelpText>
                    </Box>
                  </HStack>
                  <Progress 
                    value={(stats.activeUsers / stats.totalUsers) * 100} 
                    colorScheme="blue" 
                    mt={4}
                  />
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <HStack spacing={4}>
                    <Icon as={FiPackage} boxSize={8} color="green.500" />
                    <Box>
                      <StatLabel>Total Products</StatLabel>
                      <StatNumber>{stats.totalProducts}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        Available Products
                      </StatHelpText>
                    </Box>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <HStack spacing={4}>
                    <Icon as={FiShoppingCart} boxSize={8} color="purple.500" />
                    <Box>
                      <StatLabel>Total Orders</StatLabel>
                      <StatNumber>{stats.totalOrders}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}% Completed
                      </StatHelpText>
                    </Box>
                  </HStack>
                  <Progress 
                    value={(stats.completedOrders / stats.totalOrders) * 100} 
                    colorScheme="purple" 
                    mt={4}
                  />
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg}>
              <CardBody>
                <Stat>
                  <HStack spacing={4}>
                    <Icon as={FiDollarSign} boxSize={8} color="orange.500" />
                    <Box>
                      <StatLabel>Total Revenue</StatLabel>
                      <StatNumber>₹{stats.totalRevenue.toLocaleString()}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        From {stats.completedOrders} Orders
                      </StatHelpText>
                    </Box>
                  </HStack>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Detailed Stats */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Card bg={bgColor}>
              <CardBody>
                <Heading size="md" mb={4}>Order Status</Heading>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Flex justify="space-between" mb={2}>
                      <Text>Completed Orders</Text>
                      <Text fontWeight="bold">{stats.completedOrders}</Text>
                    </Flex>
                    <Progress value={(stats.completedOrders / stats.totalOrders) * 100} colorScheme="green" />
                  </Box>
                  <Box>
                    <Flex justify="space-between" mb={2}>
                      <Text>Pending Orders</Text>
                      <Text fontWeight="bold">{stats.pendingOrders}</Text>
                    </Flex>
                    <Progress value={(stats.pendingOrders / stats.totalOrders) * 100} colorScheme="yellow" />
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardBody>
                <Heading size="md" mb={4}>User Activity</Heading>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Flex justify="space-between" mb={2}>
                      <Text>Active Users</Text>
                      <Text fontWeight="bold">{stats.activeUsers}</Text>
                    </Flex>
                    <Progress value={(stats.activeUsers / stats.totalUsers) * 100} colorScheme="blue" />
                  </Box>
                  <Box>
                    <Flex justify="space-between" mb={2}>
                      <Text>Inactive Users</Text>
                      <Text fontWeight="bold">{stats.totalUsers - stats.activeUsers}</Text>
                    </Flex>
                    <Progress 
                      value={((stats.totalUsers - stats.activeUsers) / stats.totalUsers) * 100} 
                      colorScheme="red" 
                    />
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card bg={bgColor}>
              <CardBody>
                <HStack spacing={4}>
                  <Icon as={FiTrendingUp} boxSize={6} color="green.500" />
                  <Box>
                    <Text color={textColor}>Average Order Value</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      ₹{(stats.totalRevenue / stats.completedOrders || 0).toFixed(2)}
                    </Text>
                  </Box>
                </HStack>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardBody>
                <HStack spacing={4}>
                  <Icon as={FiTrendingDown} boxSize={6} color="red.500" />
                  <Box>
                    <Text color={textColor}>Pending Orders</Text>
                    <Text fontSize="xl" fontWeight="bold">{stats.pendingOrders}</Text>
                  </Box>
                </HStack>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardBody>
                <HStack spacing={4}>
                  <Icon as={FiShoppingBag} boxSize={6} color="purple.500" />
                  <Box>
                    <Text color={textColor}>Products per Order</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {(stats.totalProducts / stats.totalOrders || 0).toFixed(1)}
                    </Text>
                  </Box>
                </HStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
};

export default Analytics; 