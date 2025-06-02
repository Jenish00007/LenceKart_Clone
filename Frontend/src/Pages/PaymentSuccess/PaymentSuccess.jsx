import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Box
            p={8}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="lg"
            bg={bgColor}
            borderColor={borderColor}
            textAlign="center"
            maxW="600px"
            w="100%"
          >
            <Icon
              as={CheckCircleIcon}
              w={20}
              h={20}
              color="green.500"
              mb={4}
            />
            
            <Heading size="xl" mb={4}>
              Payment Successful!
            </Heading>
            
            <Text fontSize="lg" mb={6}>
              Thank you for your purchase. Your order has been placed successfully.
            </Text>
            
            <Text fontSize="md" color="gray.500" mb={8}>
              We have sent a confirmation email with your order details.
            </Text>

            <VStack spacing={4} w="100%">
              <Button
                colorScheme="teal"
                size="lg"
                w="100%"
                onClick={() => navigate('/orders')}
              >
                View Orders
              </Button>
              
              <Button
                variant="outline"
                colorScheme="teal"
                size="lg"
                w="100%"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};

export default PaymentSuccess; 