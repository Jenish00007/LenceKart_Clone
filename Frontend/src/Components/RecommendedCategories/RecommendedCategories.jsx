import React, { useState, useEffect } from "react";
import { Box, Grid, Image, Text, Heading, Button } from "@chakra-ui/react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const RecommendedCategories = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/recommended`);
        const data = await response.json();
        setRecommendedProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, []);

  if (loading) {
    return <Text>Loading recommended products...</Text>;
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
        Recommended Products
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {recommendedProducts.map((product) => (
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
              src={product.imageTsrc}
              alt={product.name}
              height="200px"
              width="100%"
              objectFit="cover"
            />
            <Box p={4}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {product.name}
              </Text>
              <Text fontSize="sm" color="gray.600" mb={2}>
                {product.description}
              </Text>
              <Box display="flex" alignItems="center" mb={2}>
                <Text color="blue.600" fontSize="xl" mr={2}>
                  ₹{product.price}
                </Text>
                <Text as="s" color="gray.500" fontSize="sm">
                  ₹{product.originalPrice}
                </Text>
                <Text color="green.500" fontSize="sm" ml={2}>
                  {product.offer}
                </Text>
              </Box>
              <Button
                colorScheme="blue"
                width="100%"
                onClick={() => navigate(`/products/${product._id}`)}
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

export default RecommendedCategories; 