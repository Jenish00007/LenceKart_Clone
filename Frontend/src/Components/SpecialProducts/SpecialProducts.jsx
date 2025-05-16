import React, { useEffect, useState, useContext } from 'react';
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
  IconButton,
  Button,
  useToast,
  Tooltip,
  useDisclosure,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import Login from '../../Pages/Login/Login';

const API_URL = 'http://localhost:8080/api';

const ProductSection = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const itemsPerPage = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isAuth) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/wishlist`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWishlistItems(response.data.map(item => item.productId));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [isAuth]);

  const handleAuthAction = (action) => {
    if (!isAuth) {
      onOpen();
      return false;
    }
    return true;
  };

  const handleWishlist = async (product) => {
    if (!isAuth) {
      // Store wishlist items in localStorage for non-authenticated users
      const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const isInWishlist = localWishlist.some(item => item._id === product._id);

      if (isInWishlist) {
        const updatedWishlist = localWishlist.filter(item => item._id !== product._id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setWishlistItems(prev => prev.filter(id => id !== product._id));
        toast({
          title: 'Removed from wishlist',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      } else {
        localWishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(localWishlist));
        setWishlistItems(prev => [...prev, product._id]);
        toast({
          title: 'Added to wishlist',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const isInWishlist = wishlistItems.includes(product._id);

      if (isInWishlist) {
        await axios.delete(`${API_URL}/wishlist/remove/${product._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setWishlistItems(prev => prev.filter(id => id !== product._id));
        toast({
          title: 'Removed from wishlist',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        await axios.post(`${API_URL}/wishlist/add`, 
          { productId: product._id },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setWishlistItems(prev => [...prev, product._id]);
        toast({
          title: 'Added to wishlist',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast({
        title: 'Error updating wishlist',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast({
      title: 'Added to cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleBuyNow = (product) => {
    const cart = [{ ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/shipping');
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <Box mb={12} position="relative">
      <Container maxW="container.xl" px={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="lg" fontWeight="bold">
            {title}
          </Heading>
        </Flex>

        <Box
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          bg="gray.50"
          p={4}
        >
          {/* Left Arrow */}
          <IconButton
            icon={<ChevronLeftIcon boxSize={6} color="blue.600" />}
            onClick={handlePrev}
            aria-label="Previous"
            position="absolute"
            left={-4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            colorScheme="blue"
            size="md"
            borderRadius="full"
            boxShadow="md"
            bg="white"
            border="2px solid"
            borderColor="blue.200"
            _hover={{
              bg: "blue.50",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: "lg",
              borderColor: "blue.400"
            }}
            _active={{
              bg: "blue.100",
              borderColor: "blue.500"
            }}
            isDisabled={currentIndex === 0}
            opacity={currentIndex === 0 ? 0.4 : 1}
            transition="all 0.2s"
            _disabled={{
              opacity: 0.4,
              cursor: "not-allowed",
              borderColor: "gray.200",
              _hover: {
                bg: "white",
                transform: "translateY(-50%)",
                boxShadow: "md",
                borderColor: "gray.200"
              }
            }}
          />

          {/* Right Arrow */}
          <IconButton
            icon={<ChevronRightIcon boxSize={6} color="blue.600" />}
            onClick={handleNext}
            aria-label="Next"
            position="absolute"
            right={-4}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            colorScheme="blue"
            size="md"
            borderRadius="full"
            boxShadow="md"
            bg="white"
            border="2px solid"
            borderColor="blue.200"
            _hover={{
              bg: "blue.50",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: "lg",
              borderColor: "blue.400"
            }}
            _active={{
              bg: "blue.100",
              borderColor: "blue.500"
            }}
            isDisabled={currentIndex === totalPages - 1}
            opacity={currentIndex === totalPages - 1 ? 0.4 : 1}
            transition="all 0.2s"
            _disabled={{
              opacity: 0.4,
              cursor: "not-allowed",
              borderColor: "gray.200",
              _hover: {
                bg: "white",
                transform: "translateY(-50%)",
                boxShadow: "md",
                borderColor: "gray.200"
              }
            }}
          />

          <Box
            display="flex"
            transition="transform 0.5s ease"
            transform={`translateX(-${currentIndex * 100}%)`}
            width={`${totalPages * 100}%`}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <Box
                key={pageIndex}
                width={`${100 / totalPages}%`}
                px={2}
              >
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                  {products
                    ?.slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    )
                    .map((product) => (
                      <Card
                        key={product._id}
                        transition="all 0.3s"
                        _hover={{
                          transform: 'translateY(-5px)',
                          boxShadow: 'xl',
                        }}
                      >
                        <CardBody>
                          <Box position="relative">
                            <Image
                              src={product.imageTsrc}
                              alt={product.name}
                              borderRadius="lg"
                              objectFit="contain"
                              height="200px"
                              width="100%"
                            />
                            <IconButton
                              icon={wishlistItems.includes(product._id) ? <FaHeart /> : <CiHeart />}
                              position="absolute"
                              top={2}
                              right={2}
                              colorScheme={wishlistItems.includes(product._id) ? "red" : "gray"}
                              variant="solid"
                              size="sm"
                              onClick={() => handleWishlist(product)}
                              aria-label="Add to wishlist"
                            />
                          </Box>
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

                            <Flex gap={2}>
                              <Button
                                flex={1}
                                colorScheme="blue"
                                size="sm"
                                onClick={() => handleAddToCart(product)}
                              >
                                Add to Cart
                              </Button>
                              <Button
                                flex={1}
                                colorScheme="green"
                                size="sm"
                                onClick={() => handleBuyNow(product)}
                              >
                                Buy Now
                              </Button>
                            </Flex>
                          </Stack>
                        </CardBody>
                      </Card>
                    ))}
                </SimpleGrid>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Enhanced Dots Navigation */}
        <Flex justify="center" mt={4} gap={3}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Box
              key={index}
              w={3}
              h={3}
              borderRadius="full"
              bg={currentIndex === index ? "blue.500" : "gray.300"}
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
              transition="all 0.3s"
              _hover={{ 
                bg: currentIndex === index ? "blue.600" : "gray.400",
                transform: "scale(1.2)"
              }}
              position="relative"
            >
              <Tooltip label={`Slide ${index + 1}`} placement="top">
                <Box position="absolute" w="100%" h="100%" />
              </Tooltip>
            </Box>
          ))}
        </Flex>
      </Container>

      {isOpen && <Login onClose={onClose} />}
    </Box>
  );
};

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