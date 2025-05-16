import React from 'react';
import { Box, Container, Heading, Text, VStack, List, ListItem, ListIcon,} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

import { CheckCircleIcon } from '@chakra-ui/icons';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading 
            as="h1" 
            size="xl" 
            textAlign="center"
            bgGradient="linear(to-r, blue.600, purple.600)"
            bgClip="text"
            animation={`${fadeIn} 0.8s ease-out`}
          >
            Terms and Conditions
          </Heading>

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              1. Acceptance of Terms
            </Heading>
            <Text 
              fontSize="lg" 
              lineHeight="tall"
              _hover={{
                color: "blue.500",
                transform: "translateX(10px)"
              }}
              transition="all 0.3s ease"
            >
              By accessing and using LenseKart's website and services, you agree to be bound by these 
              Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </Text>
          </Box>

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out 0.2s`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              2. Use of Services
            </Heading>
            <List spacing={3}>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                You must be at least 18 years old to use our services
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                You must provide accurate and complete information when placing orders
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                You are responsible for maintaining the confidentiality of your account
              </ListItem>
            </List>
          </Box>

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out 0.4s`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              3. Product Information
            </Heading>
            <Text 
              fontSize="lg" 
              lineHeight="tall"
              _hover={{
                color: "blue.500",
                transform: "translateX(10px)"
              }}
              transition="all 0.3s ease"
            >
              While we strive to display accurate product information, we do not guarantee that all 
              product descriptions, prices, or other content on our website are accurate, complete, 
              reliable, current, or error-free.
            </Text>
          </Box>

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out 0.6s`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              4. Pricing and Payment
            </Heading>
            <List spacing={3}>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                All prices are in the currency specified on the website
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                We reserve the right to change prices at any time
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Payment must be made in full before order processing
              </ListItem>
            </List>
          </Box>

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out 0.8s`}
          >
            <Text 
              fontSize="lg"
              textAlign="center"
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
              fontWeight="bold"
            >
              Last updated: March 2024
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions; 