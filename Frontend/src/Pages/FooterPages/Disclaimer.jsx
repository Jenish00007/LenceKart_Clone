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

const Disclaimer = () => {
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
            Disclaimer
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
              1. Limitation of Liability
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
              LenseKart provides this website and its services "as is" without any warranties, 
              expressed or implied. We are not liable for any damages arising from the use of 
              our website or services.
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
              2. Accuracy of Information
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
                Product information may vary
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Prices are subject to change
              </ListItem>
              <ListItem
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Images may not reflect exact product appearance
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
              3. External Links
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
              Our website may contain links to external websites. We are not responsible for the 
              content or practices of these external sites. Users should review the privacy 
              policies and terms of use of any external websites they visit.
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
              4. Medical Advice
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
              The information provided on our website is not intended to be a substitute for 
              professional medical advice. Always consult with a qualified healthcare provider 
              for any medical concerns or questions about your eye health.
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

export default Disclaimer; 