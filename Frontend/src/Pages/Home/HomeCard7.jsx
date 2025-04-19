import React from "react";
import { Box, Text, keyframes } from "@chakra-ui/react";

// Define keyframe animations
const titleFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const titleGradient = keyframes`
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
`;

const titlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const HomeCard7 = () => {
  return (
    <Box
      w="100%"
      m="auto"
      bgColor="#000042"
      color="whiteAlpha.900"
      pt={9}
      pl={9}
    >
      <Box fontSize="35px" w="97%" margin="auto">
        <Text
          bgGradient="linear(to-r, white, blue.300)"
          bgSize="200% 200%"
          bgClip="text"
          display="inline-block"
          fontWeight="600"
          animation={`${titleFloat} 3s ease-in-out infinite, ${titleGradient} 3s ease infinite, ${titlePulse} 2s ease-in-out infinite`}
          _hover={{
            bgGradient: "linear(to-r, white, blue.400)",
            transform: "scale(1.05)"
          }}
          transition="all 0.3s ease"
        >
          Buy The Best Eyewear From Lenskart
        </Text>
      </Box>
      <br />
      <Box fontSize="15px" w="97%" margin="auto" pb="5" textAlign="justify">
        <Box w="95%">
          <Text as="span" color="whiteAlpha.900">Buy The Best Eyewear From </Text>
          <Text
            as="span"
            bgGradient="linear(to-r, white, blue.300)"
            bgClip="text"
            fontWeight="600"
            _hover={{
              bgGradient: "linear(to-r, white, blue.400)"
            }}
            transition="all 0.3s ease"
          >
            Lenskart
          </Text>
          <Text as="span" color="whiteAlpha.900">
            {" "}Is The Leading E-Commerce Portal For Eyewear In India. It Has
            Revolutionised The Eyewear Industry In The Country With Its
            Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores
            Across Major Cities In The Country To Innovative Integration Of
            Technology While Purchasing Online, Lenskart Caters To Every Customer
            With Several Deals And Offers.
          </Text>
        </Box>
        <br />
        <Box w="95%" textAlign="justify" color="whiteAlpha.900">
          A One-Stop Online Solution For Purchasing Eyewear And Its Accessories,{" "}
          <Text
            as="span"
            bgGradient="linear(to-r, white, blue.300)"
            bgClip="text"
            fontWeight="600"
            _hover={{
              bgGradient: "linear(to-r, white, blue.400)"
            }}
            transition="all 0.3s ease"
          >
            Lenskart
          </Text>
          {" "}Delivers Them Right At Your Doorstep With Convenient Methods
          Of Payment. Sunglasses As Well As Eyeglasses Are Available For Men And
          Women In A Diverse Array Of Styles And Trendy Colours. If You Want To
          Try Out Contact Lenses, Pick The Ones Of Your Choice From The
          Extensive Variety Of Coloured Contact Lenses From Our Online Store.
        </Box>
      </Box>
    </Box>
  );
};

export default HomeCard7;
