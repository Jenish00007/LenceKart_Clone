import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Heading, Button, Flex, Badge,} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';

import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

// Define animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const TrendingEyeglasses = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/trending`);
        const data = await response.json();
        if (data.success) {
          setTrendingProducts(data.products);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending products:", error);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return <Text>Loading trending products...</Text>;
  }

  return (
    <Box p={8} bg="gray.50">
      <Heading
        textAlign="center"
        mb={8}
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
        _hover={{
          bgGradient: "linear(to-r, blue.500, purple.600)",
        }}
      >
        Trending Eyeglasses
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {trendingProducts?.map((product) => (
          <Box
            key={product._id}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
            animation={`${float} 3s ease-in-out infinite`}
          >
            <Box 
              position="relative"
              bg="#fbf9f7"
              _hover={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                  backgroundSize: '200% 200%',
                  animation: `${shine} 2s linear infinite`
                }
              }}
            >
              <Image
                src={product.imageTsrc}
                alt={product.name}
                height="200px"
                width="100%"
                objectFit="contain"
                p={4}
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.1)' }}
              />
              <Badge
                position="absolute"
                bottom={2}
                left={2}
                bgGradient="linear(to-r, #00b9c5, #00a5b0, #008c96)"
                color="white"
                fontSize="xs"
                px={2}
                py={0.5}
                borderRadius="sm"
              >
                Trending
              </Badge>
            </Box>
            <Box p={4}>
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Flex
                  borderRadius="20px"
                  alignItems="center"
                  gap="5px"
                  p="5px 10px"
                  bgColor="#eeeef5"
                  fontSize="13px"
                >
                  <Text>
                    {product.rating || (Math.random() * (5 - 1) + 1).toFixed(1)}
                  </Text>
                  <AiFillStar size="13px" color="#0fbd95" />
                  <Text>
                    {product.userRated || Math.floor(Math.random() * 999 + 1)}
                  </Text>
                </Flex>
              </Flex>

              <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={2} color="#000042">
                {product.name}
              </Text>
              <Text color="gray.600" fontSize="sm" mb={2}>
                {product.productType}
              </Text>
              <Text color="gray.600" fontSize="sm" mb={2}>
                Shape: {product.shape || "Rectangle"}
              </Text>
              
              <Flex justify="space-between" align="center" mb={4}>
                <Text color="blue.600" fontSize="xl" fontWeight="bold">
                  ₹{product.price}
                </Text>
                <Text color="gray.500" fontSize="sm" textDecoration="line-through">
                  ₹{product.mPrice}
                </Text>
              </Flex>

              <Box
                fontSize="13px"
                color="#cbb881"
                w="100%"
                padding="2"
                fontWeight="bold"
                bgGradient="linear(to-r, #f8f2e0, yellow.50)"
                mb={3}
                textAlign="center"
              >
                BUY1 GET1 +10% OFF
              </Box>

              <Link to={`/products/${product._id}`}>
                <Button
                  colorScheme="blue"
                  width="100%"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                  animation={`${pulse} 2s ease-in-out infinite`}
                >
                  View Details
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingEyeglasses;