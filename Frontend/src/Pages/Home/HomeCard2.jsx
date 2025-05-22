import React from "react";
import { Box, Flex, Text, Center } from "@chakra-ui/react";
import Slider from "./Slider";

const HomeCard2 = ({ type, loading, error }) => {
  if (loading) {
    return <Center>Loading...</Center>;
  }

  if (error) {
    return <Center color="red.500">{error}</Center>;
  }

  return (
    <Box w="100%" m="auto" mt="6" py={8} bg="white">
      <Flex direction={{ base: "column", xl: "row" }} align="center" justify="center" w="95%" m="auto">
        {/* Left Section: Vertically centered heading/subheading */}
        <Flex w={{ base: "100%", xl: "28%" }} h="100%" align="center" justify="center" pr={{ xl: 8 }} mb={{ base: 8, xl: 0 }}>
          <Box textAlign="left">
            <Text fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }} fontWeight="normal" letterSpacing="wide" color="#444" fontFamily="'Montserrat', Arial, sans-serif">
              WEAR THE
            </Text>
            <Text fontSize={{ base: "3xl", md: "5xl", xl: "6xl" }} fontWeight="bold" letterSpacing="wide" mb={2} color="#222" fontFamily="'Playfair Display', serif">
              TREND
            </Text>
            <Text fontSize="lg" color="#222" mt={2} fontFamily="'Montserrat', Arial, sans-serif">
              Our hottest collections
            </Text>
          </Box>
        </Flex>
        {/* Right Section: Slider (with its own arrows) */}
        <Box w={{ base: "100%", xl: "72%" }}>
          <Slider type={type} />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeCard2;
