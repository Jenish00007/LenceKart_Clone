import React from "react";
import { Box, Text, Image, Grid } from "@chakra-ui/react";
import ReactPlayer from "react-player";

// Default placeholder image URL
const DEFAULT_PLACEHOLDER = "https://placehold.co/160x160/e2e8f0/1a202c?text=No+Image";

export const HomeCard5 = () => {
  return (
    <Box w="85%" m="auto">
      <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center">
        FIND THE PERFECT FIT
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)"
        }}
      >
        <Box>
          <Image
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/eye-square10.jpg"
            alt="img"
            p="2"
            fallbackSrc={DEFAULT_PLACEHOLDER}
          />
          <Image
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/power-sun-square.jpg"
            alt="img"
            p="2"
            fallbackSrc={DEFAULT_PLACEHOLDER}
          />
        </Box>
        <Box>
          <Image
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/ce-square.jpg"
            alt="img"
            p="2"
            fallbackSrc={DEFAULT_PLACEHOLDER}
          />
          <Image
            src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg"
            alt="img"
            p="2"
            fallbackSrc={DEFAULT_PLACEHOLDER}
          />
          <Image
            src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner03_TileDesktop.jpg"
            alt="img"
            p="2"
            fallbackSrc={DEFAULT_PLACEHOLDER}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export const HomeCard5a = ({ type, heading }) => {
  return (
    <Box w="85%" m="auto">
      <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center">
        {heading}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)"
        }}
        gap={6}
      >
        {type.map((item, index) => (
          <Box key={item._id || item.id || index}>
            <Image 
              src={item.img} 
              alt={item.caption || 'Product image'} 
              fallbackSrc={DEFAULT_PLACEHOLDER}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_PLACEHOLDER;
              }}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const HomeCard5b = ({ type, heading }) => {
  return (
    <Box w="95%" m="auto">
      <Text fontSize="30px" pb="7" fontWeight="500" textAlign="center">
        {heading}
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(2,1fr)",
          "2xl": "repeat(2,1fr)"
        }}
        gap={6}
      >
        {type.map((item, index) => (
          <Box key={item._id || item.id || index}>
            <Image 
              src={item.img} 
              alt={item.caption || 'Product image'} 
              fallbackSrc={DEFAULT_PLACEHOLDER}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_PLACEHOLDER;
              }}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export const HomeCard5c = ({ type, heading }) => {
  return (
    <Box bgColor="#fff092" pb="5%" pt="2%">
      <Box w="90%" m="auto">
        <Text 
          fontSize="30px" 
          pb="7" 
          fontWeight="600" 
          textAlign="center"
          bgGradient="linear(to-r, blue.600, blue.400)"
          bgClip="text"
          _hover={{
            bgGradient: "linear(to-r, blue.700, blue.500)"
          }}
          transition="all 0.3s ease"
        >
          {heading}
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(1,1fr)",
            lg: "repeat(2,1fr)",
            xl: "repeat(3,1fr)",
            "2xl": "repeat(3,1fr)"
          }}
          gap={6}
          w="100%"
        >
          {type.map((item, index) => (
            <Box key={item._id || item.id || index}>
              <ReactPlayer 
                url={item.img} 
                width="100%" 
                height="300px"
                controls={true}
                playing={false}
                light={true}
                fallback={<Image src={DEFAULT_PLACEHOLDER} alt="Video thumbnail" />}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
