import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, SimpleGrid, Image, Flex, Spinner, useToast } from '@chakra-ui/react';
import { AuthContext } from '../../ContextApi/AuthContext';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !isAuth) {
          setLoading(false);
          return;
        }

        // Log the request details for debugging
        console.log('Fetching recently viewed products...');
        console.log('Token:', token);
        console.log('API URL:', `${API_URL}/product/lastvisited`);

        const response = await fetch(`${API_URL}/product/lastvisited`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Log the response status
        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
          setProducts(data.products || []);
        } else {
          console.error('API Error:', data.message);
          toast({
            title: "Error",
            description: data.message || "Failed to fetch recently viewed products",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom"
          });
        }
      } catch (error) {
        console.error('Error details:', error);
        toast({
          title: "Error",
          description: "Something went wrong while fetching recently viewed products",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, [isAuth, toast]);

  // Don't render anything if user is not authenticated
  if (!isAuth) {
    return null;
  }

  // Show loading spinner while fetching
  if (loading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Recently Viewed Products
      </Text>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Image
                src={product.imageTsrc}
                alt={product.name}
                height="200px"
                width="100%"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/200"
              />
              <Box p={4}>
                <Text fontWeight="semibold" noOfLines={2}>
                  {product.name}
                </Text>
                <Text color="teal.500" fontWeight="bold">
                  ₹{product.price}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RecentlyViewed; 