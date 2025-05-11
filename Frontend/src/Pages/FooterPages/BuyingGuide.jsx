import React from 'react';
import { Box, Container, Heading, Text, VStack, List, ListItem, ListIcon, keyframes } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const BuyingGuide = () => {
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
            _hover={{
              animation: `${pulse} 1s ease-in-out infinite`
            }}
          >
            Complete Buying Guide for Eyewear
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
              How to Choose the Perfect Eyewear
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
                <Text as="span" fontWeight="bold">Face Shape:</Text> Determine your face shape (round, square, oval, heart) to find the most flattering frames
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Frame Size:</Text> Ensure the frame width matches your face width and the bridge fits comfortably
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Lens Material:</Text> Choose between glass, plastic, or polycarbonate based on your needs
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Style Preference:</Text> Consider your personal style and daily activities
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
              Types of Lenses
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
                <Text as="span" fontWeight="bold">Single Vision:</Text> For distance or near vision correction
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Bifocal:</Text> For both distance and near vision
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Progressive:</Text> Seamless transition between different prescriptions
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
              Frame Materials
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
                <Text as="span" fontWeight="bold">Metal:</Text> Durable and lightweight, perfect for everyday wear
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Plastic:</Text> Versatile and available in various colors and styles
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text as="span" fontWeight="bold">Titanium:</Text> Premium material known for durability and hypoallergenic properties
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
              Care and Maintenance
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
                Clean lenses regularly with a microfiber cloth
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Store glasses in a protective case when not in use
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Avoid placing glasses face down on surfaces
              </ListItem>
              <ListItem 
                _hover={{
                  transform: "translateX(10px)",
                  color: "blue.500"
                }}
                transition="all 0.3s ease"
              >
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Regular professional adjustments for optimal fit
              </ListItem>
            </List>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default BuyingGuide; 