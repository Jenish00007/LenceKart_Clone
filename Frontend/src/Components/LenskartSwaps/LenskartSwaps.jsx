import React from 'react';
import { Box, Text, Flex, Image, Badge, Tabs, TabList, Tab, keyframes } from '@chakra-ui/react';

// Define keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const LenskartSwaps = () => {
  return (
    <Box w="100%" bg="white" py={4}>
      <Box maxW="100%" px={{ base: 2, md: 4, lg: 6 }}>
        {/* Header Section */}
        <Flex align="center" gap={2} mb={2} pl={{ base: 1, lg: '2%' }}>
          <Text 
            fontSize={{ base: "xl", md: "2xl" }} 
            fontWeight="600" 
            color="#000042"
            animation={`${float} 3s ease-in-out infinite`}
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)",
              transform: "scale(1.05)"
            }}
            transition="all 0.3s ease"
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "100%",
              height: "2px",
              background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)",
              backgroundSize: "200% 100%",
              animation: `${shine} 2s linear infinite`
            }}
          >
            Lenskart Swaps
          </Text>
          <Badge 
            bg="#000042" 
            color="white" 
            fontSize="xs" 
            px={2} 
            py={0.5} 
            borderRadius="full"
            animation={`${pulse} 2s ease-in-out infinite`}
            _hover={{
              transform: "scale(1.2)",
              bg: "purple.500"
            }}
            transition="all 0.3s ease"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)",
              transform: "rotate(45deg)",
              animation: `${shine} 2s linear infinite`
            }}
          >
            New
          </Badge>
        </Flex>
        
        <Text 
          fontSize={{ base: "sm", md: "md" }} 
          color="gray.600" 
          mb={4}
          pl={{ base: 1, lg: '2%' }}
        >
          One Frame. Unlimited Styles
        </Text>

        {/* Navigation Tabs */}
        <Box pl={{ base: 1, lg: '2%' }}>
          <Tabs variant="unstyled" size="sm" defaultIndex={3}>
            <TabList gap={4}>
              <Tab 
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _selected={{ color: "#000042", borderBottom: "2px solid #000042" }}
                px={0}
              >
                The Collection
              </Tab>
              <Tab 
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _selected={{ color: "#000042", borderBottom: "2px solid #000042" }}
                px={0}
              >
                Innovation
              </Tab>
              <Tab 
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _selected={{ color: "#000042", borderBottom: "2px solid #000042" }}
                px={0}
              >
                Combo
              </Tab>
              <Tab 
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _selected={{ color: "#000042", borderBottom: "2px solid #000042" }}
                px={0}
                bg="transparent"
              >
                Design
              </Tab>
              <Tab 
                fontSize="sm"
                fontWeight="500"
                color="gray.600"
                _selected={{ color: "#000042", borderBottom: "2px solid #000042" }}
                px={0}
              >
                Age
              </Tab>
            </TabList>
          </Tabs>
        </Box>

        {/* Banner Image */}
        <Box 
          mt={4} 
          mx={{ base: 0, lg: '2%' }}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="sm"
          bg="#001B58"
          position="relative"
        >
          <Image
            src="https://static1.lenskart.com/media/desktop/img/Apr22/b2.png"
            alt="Lenskart Swaps Banner"
            w="100%"
            h="auto"
            objectFit="cover"
          />
          <Box
            position="absolute"
            bottom={4}
            left={4}
            color="white"
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="600"
            textShadow="0 2px 4px rgba(0,0,0,0.2)"
            bgGradient="linear(to-r, blue.400, purple.500)"
            bgClip="text"
            _hover={{
              bgGradient: "linear(to-r, blue.500, purple.600)"
            }}
            transition="all 0.3s ease"
          >
            50+ Swaps To Match Your Vibe
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LenskartSwaps; 