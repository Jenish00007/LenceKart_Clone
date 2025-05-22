import React from "react";
import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const HomeCard1 = ({ type, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  if (!type || type.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <Text>No banners available</Text>
      </Box>
    );
  }

  return (
    <Box cursor="pointer" p="-1">
      <Box>
        <Slide>
          {type.map((item) => (
            <Box key={item._id || item.id}>
              <Image src={item.img} alt={item.caption || "Banner image"} w="100%" />
            </Box>
          ))}
        </Slide>
      </Box>
    </Box>
  );
};

export default HomeCard1;
