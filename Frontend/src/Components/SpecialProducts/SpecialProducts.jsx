import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Badge,
  Flex,
  HStack,
  Tag,
  VStack,
  Container,
  IconButton
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ProductSection = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products?.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= totalPages ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const visibleProducts = products?.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <Box mb={12} position="relative">
      <Container maxW="container.xl" px={4}>
        <Box 
          mb={6} 
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '0',
            width: '60px',
            height: '3px',
            bg: 'blue.500',
            borderRadius: 'full'
          }}
        >
          <Heading
            as="h2"
            size="xl"
            fontWeight="bold"
            color="gray.800"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {title}
            <Box
              as="span"
              fontSize="sm"
              color="blue.500"
              fontWeight="normal"
              ml={2}
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
            >
              View All
            </Box>
          </Heading>
        </Box>

        <Box position="relative">
          <IconButton
            icon={<ChevronLeftIcon />}
            position="absolute"
            left="-40px"
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
            onClick={prevSlide}
            aria-label="Previous slide"
            colorScheme="blue"
            variant="ghost"
            size="lg"
            _hover={{ bg: 'blue.50' }}
          />

          <Box
            display="grid"
            gridTemplateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)"
            }}
            gap={6}
            transition="all 0.3s ease"
          >
            {visibleProducts?.map((product) => (
              <Card
                key={product._id}
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'xl',
                }}
                height="100%"
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
          </Box>

          <IconButton
            icon={<ChevronRightIcon />}
            position="absolute"
            right="-40px"
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
            onClick={nextSlide}
            aria-label="Next slide"
            colorScheme="blue"
            variant="ghost"
            size="lg"
            _hover={{ bg: 'blue.50' }}
          />

          <HStack spacing={2} justify="center" mt={4}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Box
                key={index}
                w="2"
                h="2"
                borderRadius="full"
                bg={currentIndex === index ? 'blue.500' : 'gray.200'}
                cursor="pointer"
                onClick={() => setCurrentIndex(index)}
                transition="all 0.2s"
                _hover={{ bg: 'blue.300' }}
              />
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

const SpecialProducts = () => {
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [offered, setOffered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box py={8} px={4}>
        <Text>Loading products...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={8} px={4}>
        <Text color="red.500">Error loading products: {error}</Text>
      </Box>
    );
  }

  return (
    <Box py={8} bg="gray.50">
      <ProductSection title="Top Rated Products" products={topRated} />
      <ProductSection title="Latest Arrivals" products={latest} />
      <ProductSection title="Exclusive Products" products={exclusive} />
      <ProductSection title="Special Offers" products={offered} />
    </Box>
  );
};

export default SpecialProducts; 