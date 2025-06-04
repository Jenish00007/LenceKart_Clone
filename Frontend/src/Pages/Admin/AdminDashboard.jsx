import React from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  HStack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { FiShoppingBag, FiUsers, FiDollarSign, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const stats = [
    {
      title: 'Total Products',
      value: '150',
      change: '+12%',
      icon: FiShoppingBag,
      color: 'blue.500'
    },
    {
      title: 'Total Users',
      value: '1,200',
      change: '+8%',
      icon: FiUsers,
      color: 'green.500'
    },
    {
      title: 'Total Revenue',
      value: '$45,000',
      change: '+15%',
      icon: FiDollarSign,
      color: 'purple.500'
    },
    {
      title: 'Total Orders',
      value: '350',
      change: '+5%',
      icon: FiPackage,
      color: 'orange.500'
    }
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">Admin Dashboard</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {stats.map((stat, index) => (
            <Card key={index} bg={bgColor} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <HStack justify="space-between">
                  <VStack align="start" spacing={1}>
                    <Text color="gray.500" fontSize="sm">{stat.title}</Text>
                    <Stat>
                      <StatNumber fontSize="2xl">{stat.value}</StatNumber>
                      <StatHelpText>
                        <StatArrow type="increase" />
                        {stat.change}
                      </StatHelpText>
                    </Stat>
                  </VStack>
                  <Icon as={stat.icon} boxSize={8} color={stat.color} />
                </HStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Heading size="md" mb={4}>Quick Actions</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Link to="/admin/products">
                  <Card bg="blue.50" _hover={{ bg: 'blue.100' }} transition="all 0.2s">
                    <CardBody>
                      <HStack>
                        <Icon as={FiShoppingBag} boxSize={6} color="blue.500" />
                        <Text>Manage Products</Text>
                      </HStack>
                    </CardBody>
                  </Card>
                </Link>
                <Link to="/admin/orders">
                  <Card bg="green.50" _hover={{ bg: 'green.100' }} transition="all 0.2s">
                    <CardBody>
                      <HStack>
                        <Icon as={FiPackage} boxSize={6} color="green.500" />
                        <Text>View Orders</Text>
                      </HStack>
                    </CardBody>
                  </Card>
                </Link>
              </SimpleGrid>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
            <CardBody>
              <Heading size="md" mb={4}>Recent Activity</Heading>
              <VStack align="stretch" spacing={4}>
                <Text fontSize="sm">New order #1234 received</Text>
                <Text fontSize="sm">Product "Sunglasses" updated</Text>
                <Text fontSize="sm">New user registered</Text>
              </VStack>
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </Container>
  );
};

export default AdminDashboard; 