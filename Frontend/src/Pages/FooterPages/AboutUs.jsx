import React from 'react';
import { Box, Container, Heading, Text, VStack, Image, Grid, GridItem, SimpleGrid, keyframes } from '@chakra-ui/react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const AboutUs = () => {
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
            About Lenskart
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
            <VStack spacing={6}>
              <Image
                src="https://static.lenskart.com/media/desktop/img/logo.svg"
                alt="Lenskart Logo"
                maxW="200px"
                animation={`${float} 3s ease-in-out infinite`}
              />
              <Text fontSize="lg" lineHeight="tall">
                Lenskart is India's leading eyewear brand, revolutionizing the eyewear industry with its innovative approach to eyewear retailing. Founded in 2010, we have grown to become the largest eyewear company in India, with a presence in over 100 cities.
              </Text>
            </VStack>
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
              Our Mission
            </Heading>
            <Text fontSize="lg" lineHeight="tall">
              To transform the way people see and experience the world through innovative eyewear solutions. We strive to make quality eyewear accessible to everyone, combining cutting-edge technology with stylish designs.
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
              Our Vision
            </Heading>
            <Text fontSize="lg" lineHeight="tall">
              To be the global leader in eyewear retail, known for our innovation, quality, and customer-centric approach. We aim to revolutionize the eyewear industry through technology and design.
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
              Our Values
            </Heading>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" lineHeight="tall">
                • Innovation: Constantly pushing boundaries in eyewear technology and design
              </Text>
              <Text fontSize="lg" lineHeight="tall">
                • Quality: Delivering the highest quality products and services
              </Text>
              <Text fontSize="lg" lineHeight="tall">
                • Customer First: Putting our customers at the heart of everything we do
              </Text>
              <Text fontSize="lg" lineHeight="tall">
                • Sustainability: Committed to environmentally responsible practices
              </Text>
            </VStack>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4} color="blue.500">
              Why Choose Us
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                <Heading as="h3" size="md" mb={3}>Quality Assurance</Heading>
                <Text>Every pair of glasses undergoes rigorous quality checks to ensure the highest standards.</Text>
              </Box>
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                <Heading as="h3" size="md" mb={3}>Innovative Technology</Heading>
                <Text>State-of-the-art virtual try-on and frame measurement technology.</Text>
              </Box>
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
                <Heading as="h3" size="md" mb={3}>Customer Satisfaction</Heading>
                <Text>Dedicated customer support and hassle-free return policy.</Text>
              </Box>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4} color="blue.500">
              Our Team
            </Heading>
            <Text fontSize="lg" lineHeight="tall">
              Our team consists of passionate professionals from diverse backgrounds, 
              united by our commitment to revolutionizing the eyewear industry. From 
              expert optometrists to fashion designers, we work together to create 
              the perfect blend of style, comfort, and functionality.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs; 