import React from 'react';
import { Box, Container, Heading, Text, VStack, List, ListItem, ListIcon, keyframes } from '@chakra-ui/react';
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

const PrivacyPolicy = () => {
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
            Privacy Policy
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
              1. Information We Collect
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
                Personal information (name, email, address)
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Payment information
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Prescription details
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
            animation={`${fadeIn} 0.8s ease-out 0.2s`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              2. How We Use Your Information
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
              We use your information to process orders, provide customer support, send updates about 
              your order, and improve our services. We may also use your information to send you 
              promotional offers if you have opted in to receive them.
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
            animation={`${fadeIn} 0.8s ease-out 0.4s`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              3. Information Sharing
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
                We do not sell your personal information
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                We share information only with service providers who assist in our operations
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                We may share information if required by law
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
            animation={`${fadeIn} 0.8s ease-out 0.6s`}
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
            >
              4. Your Rights
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
                Access your personal information
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Correct inaccurate information
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Request deletion of your information
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

export default PrivacyPolicy; 