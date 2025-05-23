import React from "react";
import { Box, Flex, Text, Center, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import Slider from "./Slider";

// Define animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const HomeCard2 = ({ type, loading, error }) => {
  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("#444", "gray.200");
  const headingColor = useColorModeValue("#222", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  // Responsive values
  const containerPadding = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" });
  const subHeadingSize = useBreakpointValue({ base: "2xl", md: "3xl", lg: "4xl" });
  const descriptionSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  if (loading) {
    return (
      <Center 
        minH={{ base: "200px", md: "300px" }} 
        w="100%" 
        bg={bgColor}
        animation={`${fadeIn} 0.5s ease-out`}
        px={containerPadding}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} color={textColor}>Loading amazing products...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center 
        minH={{ base: "200px", md: "300px" }} 
        w="100%" 
        bg={bgColor}
        animation={`${fadeIn} 0.5s ease-out`}
        px={containerPadding}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} color="red.500" role="alert">{error}</Text>
      </Center>
    );
  }

  return (
    <Box 
      w="100%" 
      m="auto" 
      mt={{ base: 4, md: 6 }} 
      py={{ base: 4, md: 6, lg: 8 }} 
      bg={bgColor}
      role="region"
      aria-label="Trending Products Section"
      px={containerPadding}
    >
      <Flex 
        direction={{ base: "column", lg: "row" }} 
        align="center" 
        justify="center" 
        w={{ base: "100%", md: "95%" }} 
        m="auto"
        gap={{ base: 6, md: 8, lg: 12 }}
      >
        {/* Left Section: Vertically centered heading/subheading */}
        <Flex 
          w={{ base: "100%", lg: "28%" }} 
          h="100%" 
          align={{ base: "center", md: "flex-start" }}
          justify="center" 
          pr={{ lg: 8 }} 
          mb={{ base: 6, lg: 0 }}
          animation={`${slideIn} 0.8s ease-out`}
          textAlign={{ base: "center", md: "left" }}
        >
          <Box textAlign="center">
            <Text 
              fontSize={headingSize}
              fontWeight="normal" 
              letterSpacing="wide" 
              color={textColor} 
              fontFamily="'Montserrat', Arial, sans-serif"
              mb={{ base: 1, md: 2 }}
            >
              WEAR THE
            </Text>
            <Text 
              fontSize={subHeadingSize}
              fontWeight="bold" 
              letterSpacing="wide" 
              mb={{ base: 2, md: 4 }} 
              color={headingColor} 
              fontFamily="'Playfair Display', serif"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-r, purple.500, blue.400)",
                transition: "all 0.3s ease"
              }}
            >
              TREND
            </Text>
            <Text 
              fontSize={descriptionSize}
              color={textColor} 
              mt={{ base: 1, md: 2 }} 
              fontFamily="'Montserrat', Arial, sans-serif"
              maxW={{ base: "100%", md: "100%" }}
              lineHeight={{ base: "short", md: "tall" }}
            >
              Discover our collections
            </Text>
          </Box>
        </Flex>

        {/* Right Section: Slider */}
        <Box 
          w={{ base: "100%", lg: "72%" }}
          animation={`${fadeIn} 1s ease-out`}
          mt={{ base: 4, md: 0 }}
        >
          <Slider type={type} />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeCard2;
