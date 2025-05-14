import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Badge,
  Flex,
  HStack,
  Tag,
  VStack
} from '@chakra-ui/react';

const ProductSection = ({ title, products }) => (
  <Box mb={8}>
    <Heading as="h2" size="lg" mb={4} fontWeight="bold">
      {title}
    </Heading>
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
      {products?.map((product) => (
        <Card
          key={product._id}
          transition="transform 0.2s"
          _hover={{
            transform: 'scale(1.02)',
            boxShadow: 'lg',
          }}
        >
          <CardBody>
            <Image
              src={product.imageTsrc}
              alt={product.name}
              borderRadius="lg"
              objectFit="contain"
              height="200px"
              width="100%"
            />
            <Stack mt="6" spacing="3">
              <VStack align="start" spacing={1}>
                <Heading size="md" noOfLines={1}>
                  {product.name}
                </Heading>
                <HStack spacing={2}>
                  <Tag size="sm" colorScheme="blue">{product.productType}</Tag>
                  {product.trending && <Tag size="sm" colorScheme="green">Trending</Tag>}
                </HStack>
              </VStack>
              
              <Flex align="center">
                <Box display="flex" alignItems="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Box
                        key={i}
                        color={i < Math.floor(product.rating) ? 'yellow.400' : 'gray.300'}
                      >
                        ★
                      </Box>
                    ))}
                  <Text ml={2} color="gray.600" fontSize="sm">
                    ({product.rating} • {product.userRated} reviews)
                  </Text>
                </Box>
              </Flex>

              <HStack spacing={2}>
                <Tag size="sm" colorScheme="purple">{product.gender}</Tag>
                <Tag size="sm" colorScheme="orange">{product.shape}</Tag>
              </HStack>

              <Flex justify="space-between" align="center">
                <VStack align="start" spacing={0}>
                  <Text color="blue.600" fontSize="xl" fontWeight="bold">
                    ₹{product.price}
                  </Text>
                  {product.mPrice > product.price && (
                    <Text color="gray.500" fontSize="sm" textDecoration="line-through">
                      ₹{product.mPrice}
                    </Text>
                  )}
                </VStack>
                {product.mPrice > product.price && (
                  <Badge colorScheme="green" fontSize="sm">
                    {Math.round(((product.mPrice - product.price) / product.mPrice) * 100)}% OFF
                  </Badge>
                )}
              </Flex>

              {product.quantity < 50 && (
                <Text color="red.500" fontSize="sm">
                  Only {product.quantity} left!
                </Text>
              )}
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  </Box>
);

const SpecialProducts = () => {
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [offered, setOffered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [topRatedRes, latestRes, exclusiveRes, offeredRes] = await Promise.all([
          axios.get('http://localhost:8080/product/categories/top-rated'),
          axios.get('http://localhost:8080/product/categories/latest'),
          axios.get('http://localhost:8080/product/categories/exclusive'),
          axios.get('http://localhost:8080/product/categories/offered'),
        ]);

        setTopRated(topRatedRes.data);
        setLatest(latestRes.data);
        setExclusive(exclusiveRes.data);
        setOffered(offeredRes.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box py={8} px={4}>
      <ProductSection title="Top Rated Products" products={topRated} />
      <ProductSection title="Latest Arrivals" products={latest} />
      <ProductSection title="Exclusive Products" products={exclusive} />
      <ProductSection title="Special Offers" products={offered} />
    </Box>
  );
};

export default SpecialProducts; 