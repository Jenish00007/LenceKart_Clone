import React from "react";
import { Box, Text, Image, Flex, Center, Grid, Icon, VStack, HStack,} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { TfiTwitter } from "react-icons/tfi";
import { Link } from "react-router-dom";

// Define keyframe animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(60deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0); }
  25% { transform: translateY(-8px) rotate(1deg); }
  75% { transform: translateY(8px) rotate(-1deg); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const borderSync = keyframes`
  0% { border-color: #0066ff; }
  50% { border-color: #ff66cc; }
  100% { border-color: #0066ff; }
`;

export const FooterCard1 = ({ type, heading }) => {
  return (
    <VStack align="flex-start" spacing={4}>
      <Text 
        fontSize="xl" 
        fontWeight="600" 
        borderBottom="2px solid" 
        borderColor="whiteAlpha.300"
        pb={2}
        w="fit-content"
        position="relative"
        display="inline-block"
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
        transition="all 0.3s ease"
        _after={{
          content: '""',
          position: "absolute",
          bottom: "-2px",
          left: "0",
          width: "0",
          height: "2px",
          bgGradient: "linear(to-r, blue.400, purple.500)",
          transition: "width 0.3s ease"
        }}
        _hover={{
          bgGradient: "linear(to-r, blue.500, purple.600)",
          transform: "scale(1.05)",
          borderColor: "blue.400",
          _after: {
            width: "100%"
          }
        }}
      >
        {heading}
      </Text>
      <VStack align="flex-start" spacing={3}>
        {type.map((i, index) => (
          <Link to={i.path} key={index}>
            <Text
              fontSize="15px"
              position="relative"
              transition="all 0.3s ease"
              cursor="pointer"
              _before={{
                content: '""',
                position: "absolute",
                left: "-15px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                bgGradient: "linear(to-r, blue.400, purple.500)",
                opacity: 0,
                transition: "all 0.3s ease"
              }}
              _after={{
                content: '""',
                position: "absolute",
                bottom: "-2px",
                left: "0",
                width: "0",
                height: "1px",
                bgGradient: "linear(to-r, blue.400, purple.500)",
                transition: "width 0.3s ease"
              }}
              _hover={{ 
                bgGradient: "linear(to-r, blue.400, purple.500)",
                bgClip: "text",
                transform: "translateX(5px)",
                fontWeight: "500",
                _before: {
                  opacity: 1,
                  left: "-10px",
                  animation: `${pulse} 1s ease-in-out infinite`
                },
                _after: {
                  width: "100%"
                }
              }}
              sx={{
                "&:hover": {
                  textShadow: "0 0 8px rgba(66, 153, 225, 0.5)"
                }
              }}
            >
              {i.labels}
            </Text>
          </Link>
        ))}
      </VStack>
    </VStack>
  );
};

export const FooterCard2 = () => {
  return (
    <VStack spacing={6} w="full" py={4}>
      <Box 
        position="relative"
        maxW="200px"
        _before={{
          content: '""',
          position: "absolute",
          top: "-10px",
          left: "-10px",
          right: "-10px",
          bottom: "-10px",
          background: "linear-gradient(45deg, #0066ff33, #ff66cc33)",
          filter: "blur(15px)",
          opacity: 0,
          transition: "opacity 0.3s ease"
        }}
        _hover={{
          _before: {
            opacity: 1
          }
        }}
      >
        <Box
          position="relative"
          overflow="hidden"
          animation={`${float} 6s ease-in-out infinite`}
          background="linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
          backgroundSize="200% 100%"
          border="2px solid"
          borderColor="whiteAlpha.300"
          _hover={{
            animation: `${shine} 1.5s linear infinite, ${borderSync} 2s linear infinite`,
            transform: "scale(1.05) translateY(-5px)",
            boxShadow: "xl"
          }}
          transition="all 0.3s ease"
          cursor="pointer"
        >
          <Image
            src="https://static.lenskart.com/media/desktop/img/play-store.svg"
            alt="Play Store"
            w="full"
            h="auto"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
          />
        </Box>
      </Box>
      <Text
        fontSize="sm"
        maxW="300px"
        textAlign="center"
        fontWeight="medium"
        letterSpacing="wide"
      >
        <Text as="span">Download </Text>
        <Text
          as="span"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          fontWeight="bold"
          _hover={{
            bgGradient: "linear(to-r, blue.500, purple.600)"
          }}
          transition="all 0.3s ease"
        >
          Lenskart
        </Text>
        <Text as="span"> App to buy Eyeglasses, Sunglasses and Contact Lenses</Text>
      </Text>
    </VStack>
  );
};

export const FooterCard = () => {
  const socialIcons = [
    { 
      icon: AiFillFacebook, 
      label: "Facebook",
      animation: `${bounce} 2s ease-in-out infinite`,
      hoverColor: "facebook.400"
    },
    { 
      icon: AiOutlineInstagram, 
      label: "Instagram",
      animation: `${pulse} 2s ease-in-out infinite`,
      hoverColor: "pink.500"
    },
    { 
      icon: TfiTwitter, 
      label: "Twitter",
      animation: `${rotate} 3s linear infinite`,
      hoverColor: "twitter.400"
    }
  ];

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)"
      }}
      gap={8}
      py={6}
      px={4}
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
    >
      <HStack 
        spacing={6} 
        justify={{ base: "center", md: "flex-start" }}
        wrap="wrap"
      >
        <Link to="/terms-and-conditions">
          <Text
            fontSize="sm"
            cursor="pointer"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "1px",
              bgGradient: "linear(to-r, blue.400, purple.500)",
              transition: "width 0.3s ease"
            }}
            _hover={{ 
              bgGradient: "linear(to-r, blue.400, purple.500)",
              bgClip: "text",
              transform: "translateX(5px)",
              _before: {
                width: "100%"
              }
            }}
            transition="all 0.3s ease"
          >
            T&C
          </Text>
        </Link>
        <Link to="/privacy-policy">
          <Text
            fontSize="sm"
            cursor="pointer"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "1px",
              bgGradient: "linear(to-r, blue.400, purple.500)",
              transition: "width 0.3s ease"
            }}
            _hover={{ 
              bgGradient: "linear(to-r, blue.400, purple.500)",
              bgClip: "text",
              transform: "translateX(5px)",
              _before: {
                width: "100%"
              }
            }}
            transition="all 0.3s ease"
          >
            Privacy
          </Text>
        </Link>
        <Link to="/disclaimer">
          <Text
            fontSize="sm"
            cursor="pointer"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              bottom: "-2px",
              left: "0",
              width: "0",
              height: "1px",
              bgGradient: "linear(to-r, blue.400, purple.500)",
              transition: "width 0.3s ease"
            }}
            _hover={{ 
              bgGradient: "linear(to-r, blue.400, purple.500)",
              bgClip: "text",
              transform: "translateX(5px)",
              _before: {
                width: "100%"
              }
            }}
            transition="all 0.3s ease"
          >
            Disclaimer
          </Text>
        </Link>
      </HStack>

      <VStack 
        spacing={4} 
        align={{ base: "center", md: "flex-end" }}
      >
        <Text 
          fontSize="sm" 
          fontWeight="600"
          letterSpacing="wide"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          _hover={{
            bgGradient: "linear(to-r, blue.500, purple.600)"
          }}
          transition="all 0.3s ease"
        >
          FOLLOW US ON
        </Text>
        <HStack spacing={6}>
          {socialIcons.map((item, index) => (
            <Box
              key={index}
              position="relative"
              _hover={{
                "& > div": {
                  opacity: 1,
                  transform: "translateY(-20px)"
                }
              }}
            >
              <Icon
                as={item.icon}
                boxSize={7}
                cursor="pointer"
                color="whiteAlpha.900"
                _hover={{ 
                  bgGradient: "linear(to-r, blue.400, purple.500)",
                  bgClip: "text",
                  transform: "scale(1.2)"
                }}
                transition="all 0.3s ease"
                animation={item.animation}
                sx={{
                  "&:hover": {
                    animation: "none"
                  }
                }}
                aria-label={item.label}
              />
              <Box
                position="absolute"
                top="-2"
                left="50%"
                transform="translateX(-50%) translateY(0)"
                opacity="0"
                bg="whiteAlpha.900"
                color="gray.800"
                px="2"
                py="1"
                borderRadius="md"
                fontSize="xs"
                pointerEvents="none"
                transition="all 0.3s ease"
                whiteSpace="nowrap"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
              >
                {item.label}
              </Box>
            </Box>
          ))}
        </HStack>
      </VStack>
    </Grid>
  );
};
