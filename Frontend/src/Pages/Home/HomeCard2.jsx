import React from "react";
import { Box, Flex, Image, Spacer, Text, Center } from "@chakra-ui/react";
import Slider from "./Slider";

const HomeCard2 = ({ type, loading, error }) => {
  if (loading) {
    return <Center>Loading...</Center>;
  }

  if (error) {
    return <Center color="red.500">{error}</Center>;
  }

  return (
    <Box justifyContent="left" w="95%" m="auto" mt="6" cursor="pointer">
      <Flex mt="7" direction={{ base: "column", xl: "row" }}>
        <Box
          w={{ base: "100%", xl: "25%" }}
          cursor="pointer"
          pr={{ lg: "4", sm: "0", base: "0" }}
          mb={{ base: "4", xl: "0" }}
        >
          <Center>
            <Text fontSize="2xl" fontWeight="bold" mb="4">
              Frame Shapes
            </Text>
          </Center>
        </Box>
        <Box
          w={{ base: "100%", xl: "75%" }}
        >
          <Slider type={type} />
        </Box>
      </Flex>
    </Box>
  );
};

export default HomeCard2;
