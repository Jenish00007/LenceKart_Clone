import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Image, Text, Heading, Button, Flex, Badge, Card, CardBody, CardFooter, Divider, HStack, VStack, Tooltip, Icon, useToast, useDisclosure, Skeleton, Spinner, Center } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { addToCart } from '../../redux/cart/cart.actions';
import { AuthContext } from '../../ContextApi/AuthContext';
import Login from '../../Pages/Login/Login';

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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const cartItems = useSelector((state) => state.cart.cart);

  const handleWishlistToggle = (product) => {
    if (!isAuth) {
      onOpen();
      return;
    }

    const isFavorite = wishlistItems.some(item => item._id === product._id);
    
    if (isFavorite) {
      dispatch(removeFromWishlist(product._id));
      toast({
        title: "Removed from Wishlist",
        description: "Product has been removed from your wishlist",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
    } else {
      dispatch(addToWishlist(product));
      toast({
        title: "Added to Wishlist",
        description: "Product has been added to your wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  const handleAddToCart = async (product) => {
    if (!isAuth) {
      onOpen();
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.productId === product._id);
      
      // Format the product data with all required fields
      const cartItem = {
        productId: product._id,
        quantity: existingItem ? existingItem.quantity + 1 : 1,
        price: product.price,
        name: product.name,
        image: product.imageTsrc,
        productType: product.productType,
        shape: product.shape || "Rectangle",
        gender: product.gender || "Unisex",
        style: product.style || "Classic"
      };

      // Update Redux store
      await dispatch(addToCart(cartItem));

      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add item to cart',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/trending`);
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
    return (
      <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50">
        <Skeleton height="40px" mb={6} />
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={{ base: 3, sm: 4, md: 6 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Skeleton key={item} height={{ base: "350px", md: "450px" }} borderRadius="lg" />
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50">
      <Heading
        textAlign="center"
        mb={{ base: 6, md: 8 }}
        size={{ base: "md", sm: "lg" }}
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
          base: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 3, sm: 4, md: 6 }}
      >
        {trendingProducts?.map((product) => (
          <Card
            key={product._id}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            transition="all 0.3s"
            h="100%"
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg"
            }}
          >
            <CardBody p={{ base: 3, sm: 4 }}>
              <Box 
                position="relative"
                bg="#fbf9f7"
                borderRadius="md"
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
                  src={product.imageTsrc || product.image || '/placeholder-image.png'}
                  alt={product.name || "Product Image"}
                  height={{ base: "120px", sm: "150px", md: "180px" }}
                  width="100%"
                  objectFit="cover"
                  borderRadius="md"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.1)' }}
                  fallbackSrc="/placeholder-image.png"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.png';
                  }}
                />
                <Badge
                  position="absolute"
                  bottom={2}
                  left={2}
                  bgGradient="linear(to-r, #00b9c5, #00a5b0, #008c96)"
                  color="white"
                  fontSize={{ base: "xx-small", sm: "xs" }}
                  px={2}
                  py={0.5}
                  borderRadius="sm"
                >
                  Trending
                </Badge>
              </Box>
              
              <VStack align="start" spacing={{ base: 2, sm: 3 }} mt={3}>
                <Flex 
                  borderRadius="20px"
                  alignItems="center"
                  gap="5px"
                  p="5px 10px"
                  bgColor="#eeeef5"
                  fontSize={{ base: "11px", sm: "13px" }}
                  alignSelf="flex-start"
                >
                  <Text>
                    {product.rating || (Math.random() * (5 - 1) + 1).toFixed(1)}
                  </Text>
                  <AiFillStar size="13px" color="#0fbd95" />
                  <Text>
                    {product.userRated || Math.floor(Math.random() * 999 + 1)}
                  </Text>
                </Flex>

                <Text 
                  fontWeight="bold" 
                  fontSize={{ base: "sm", sm: "md", md: "lg" }} 
                  noOfLines={2} 
                  color="#000042"
                  lineHeight="1.2"
                  minH={{ base: "32px", sm: "40px" }}
                >
                  {product.name || "Product Name"}
                </Text>
                
                <Text 
                  color="gray.600" 
                  fontSize={{ base: "xs", sm: "sm" }}
                  noOfLines={1}
                >
                  {product.productType}
                </Text>
                
                <Text 
                  color="gray.600" 
                  fontSize={{ base: "xs", sm: "sm" }}
                  noOfLines={1}
                >
                  Shape: {product.shape || "Rectangle"}
                </Text>
                
                <Flex justify="space-between" align="center" w="100%">
                  <Text 
                    color="blue.600" 
                    fontSize={{ base: "md", sm: "lg", md: "xl" }} 
                    fontWeight="bold"
                  >
                    ₹{product.price}
                  </Text>
                  <Text 
                    color="gray.500" 
                    fontSize={{ base: "xs", sm: "sm" }} 
                    textDecoration="line-through"
                  >
                    ₹{product.mPrice}
                  </Text>
                </Flex>

                <Box
                  fontSize={{ base: "10px", sm: "12px", md: "13px" }}
                  color="#cbb881"
                  w="100%"
                  padding="2"
                  fontWeight="bold"
                  bgGradient="linear(to-r, #f8f2e0, yellow.50)"
                  textAlign="center"
                  borderRadius="sm"
                >
                  BUY1 GET1 +10% OFF
                </Box>
              </VStack>
            </CardBody>
            
            <Divider />
            
            <CardFooter p={{ base: 2, sm: 3 }}>
              <VStack spacing={2} width="100%">
                <HStack spacing={{ base: 1, sm: 2 }} width="100%" justify="space-around">
                  <Tooltip label="Add to Cart">
                    <Button
                      size={{ base: "xs", sm: "sm" }}
                      fontSize={{ base: "10px", sm: "12px" }}
                      px={{ base: 2, sm: 3 }}
                      leftIcon={<Icon as={FiShoppingCart} boxSize={{ base: 3, sm: 4 }} />}
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => handleAddToCart(product)}
                      flex="1"
                    >
                      <Text display={{ base: "none", sm: "block" }}>Cart</Text>
                    </Button>
                  </Tooltip>
                  
                  <Tooltip label={wishlistItems.some(item => item._id === product._id) ? "Remove from Wishlist" : "Add to Wishlist"}>
                    <Button
                      size={{ base: "xs", sm: "sm" }}
                      fontSize={{ base: "10px", sm: "12px" }}
                      px={{ base: 2, sm: 3 }}
                      leftIcon={<Icon as={FiHeart} boxSize={{ base: 3, sm: 4 }} />}
                      colorScheme="pink"
                      variant="ghost"
                      onClick={() => handleWishlistToggle(product)}
                      flex="1"
                    >
                      <Text display={{ base: "none", sm: "block" }}>Wishlist</Text>
                    </Button>
                  </Tooltip>
                </HStack>
                
                <Tooltip label="View Details">
                  <Button
                    size={{ base: "xs", sm: "sm" }}
                    fontSize={{ base: "10px", sm: "12px" }}
                    leftIcon={<Icon as={FiEye} boxSize={{ base: 3, sm: 4 }} />}
                    colorScheme="teal"
                    variant="ghost"
                    as={Link}
                    to={`/products/${product._id}`}
                    width="100%"
                  >
                    View Details
                  </Button>
                </Tooltip>
              </VStack>
            </CardFooter>
          </Card>
        ))}
      </Grid>
      <Box style={{ display: 'none' }}>
        <Login isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
};

export default TrendingEyeglasses;