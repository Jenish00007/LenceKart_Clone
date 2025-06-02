import React from 'react';
import { Box, Container, Heading, Text, VStack, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const FrameSize = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading 
            as="h1" 
            size="xl" 
            textAlign="center" 
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Frame Size Guide
          </Heading>

          <Box>
            <Heading 
              as="h2" 
              size="lg" 
              mb={6} 
              color="blue.500"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '60px',
                height: '3px',
                bg: 'blue.500',
                borderRadius: 'full'
              }}
            >
              Understanding Frame Measurements
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
              <GridItem>
                <VStack align="stretch" spacing={6}>
                  <Box 
                    p={6} 
                    bg={bgColor}
                    borderRadius="xl"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'xl',
                      bg: hoverBg
                    }}
                    transition="all 0.3s ease"
                  >
                    <Text fontWeight="bold" fontSize="xl" mb={2} color="blue.500">Frame Width</Text>
                    <Text>The total width of the frame from temple to temple</Text>
                  </Box>
                  <Box 
                    p={6} 
                    bg={bgColor}
                    borderRadius="xl"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'xl',
                      bg: hoverBg
                    }}
                    transition="all 0.3s ease"
                  >
                    <Text fontWeight="bold" fontSize="xl" mb={2} color="blue.500">Lens Width</Text>
                    <Text>The width of each individual lens</Text>
                  </Box>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="stretch" spacing={6}>
                  <Box 
                    p={6} 
                    bg={bgColor}
                    borderRadius="xl"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'xl',
                      bg: hoverBg
                    }}
                    transition="all 0.3s ease"
                  >
                    <Text fontWeight="bold" fontSize="xl" mb={2} color="blue.500">Bridge Width</Text>
                    <Text>The distance between the lenses</Text>
                  </Box>
                  <Box 
                    p={6} 
                    bg={bgColor}
                    borderRadius="xl"
                    boxShadow="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    _hover={{
                      transform: 'translateY(-5px)',
                      boxShadow: 'xl',
                      bg: hoverBg
                    }}
                    transition="all 0.3s ease"
                  >
                    <Text fontWeight="bold" fontSize="xl" mb={2} color="blue.500">Temple Length</Text>
                    <Text>The length of the arms that extend to your ears</Text>
                  </Box>
                </VStack>
              </GridItem>
            </Grid>
          </Box>

          <Box>
            <Heading 
              as="h2" 
              size="lg" 
              mb={6} 
              color="blue.500"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '60px',
                height: '3px',
                bg: 'blue.500',
                borderRadius: 'full'
              }}
            >
              How to Measure Your Frame Size
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              {[
                {
                  step: "Step 1",
                  title: "Find Your Current Frame",
                  description: "Look for the measurements on your current glasses, usually found on the inside of the temple arm"
                },
                {
                  step: "Step 2",
                  title: "Measure Your Face",
                  description: "Use a ruler to measure the width of your face at the temples"
                },
                {
                  step: "Step 3",
                  title: "Consider Your Features",
                  description: "Take into account your nose bridge width and temple-to-temple distance"
                }
              ].map((item, index) => (
                <Box 
                  key={index}
                  p={6}
                  bg={bgColor}
                  borderRadius="xl"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: 'xl',
                    bg: hoverBg
                  }}
                  transition="all 0.3s ease"
                >
                  <Text color="blue.500" fontWeight="bold" mb={2}>{item.step}</Text>
                  <Text fontWeight="bold" fontSize="lg" mb={2}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </Box>
              ))}
            </Grid>
          </Box>

          <Box>
            <Heading 
              as="h2" 
              size="lg" 
              mb={6} 
              color="blue.500"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '60px',
                height: '3px',
                bg: 'blue.500',
                borderRadius: 'full'
              }}
            >
              Size Recommendations
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              {[
                {
                  title: "Small Frames",
                  width: "125-129mm",
                  bridge: "14-16mm",
                  bestFor: "Narrow faces"
                },
                {
                  title: "Medium Frames",
                  width: "130-139mm",
                  bridge: "16-18mm",
                  bestFor: "Average faces"
                },
                {
                  title: "Large Frames",
                  width: "140-149mm",
                  bridge: "18-20mm",
                  bestFor: "Wide faces"
                }
              ].map((item, index) => (
                <Box 
                  key={index}
                  p={6}
                  bg={bgColor}
                  borderRadius="xl"
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: 'xl',
                    bg: hoverBg
                  }}
                  transition="all 0.3s ease"
                >
                  <Heading as="h3" size="md" mb={4} color="blue.500">{item.title}</Heading>
                  <VStack align="stretch" spacing={2}>
                    <Text><Text as="span" fontWeight="bold">Frame width:</Text> {item.width}</Text>
                    <Text><Text as="span" fontWeight="bold">Bridge:</Text> {item.bridge}</Text>
                    <Text><Text as="span" fontWeight="bold">Best for:</Text> {item.bestFor}</Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </Box>

          <Box 
            p={8}
            bg={bgColor}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            textAlign="center"
          >
            <Heading 
              as="h2" 
              size="lg" 
              mb={4} 
              color="blue.500"
            >
              Virtual Try-On
            </Heading>
            <Text fontSize="lg">
              Use our virtual try-on feature to see how different frame sizes look on your face. 
              This helps ensure you choose the perfect size for your features.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default FrameSize; 