import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Heading, Button } from "@chakra-ui/react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const TrendingEyeglasses = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/product/trending`);
        const data = await response.json();
        setTrendingProducts(data);
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
        {trendingProducts.map((product) => (
          <Box
            key={product._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            transition="transform 0.2s"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {product.name}
              </Text>
              <Text color="blue.600" fontSize="xl" mb={4}>
                ₹{product.price}
              </Text>
              <Button
                colorScheme="blue"
                width="100%"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                View Details
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingEyeglasses; 