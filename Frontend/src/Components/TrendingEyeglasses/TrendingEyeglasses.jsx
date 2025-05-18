import React, { useState, useEffect, useContext } from "react";
import { Box, Grid, Image, Text, Heading, Button, Flex, Badge, Card, CardBody, CardFooter, Divider, HStack, Tooltip, Icon, useToast, useDisclosure } from "@chakra-ui/react";
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
      toast({
        title: "Authentication Required",
        description: "Please login to add items to your wishlist",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
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
      toast({
        title: "Authentication Required",
        description: "Please login to add items to your cart",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
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

      // Update local storage
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = existingItem
        ? currentCart.map(item => 
            item.productId === product._id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentCart, cartItem];
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));

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
          <Card
            key={product._id}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-5px)",
              shadow: "lg"
            }}
          >
            <CardBody>
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
                  objectFit="cover"
                
                  // p={4}
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
            </CardBody>
            <Divider />
            <CardFooter>
              <HStack spacing={4} width="100%" justify="space-between">
                <Tooltip label="Add to Cart">
                  <Button
                    size="sm"
                    leftIcon={<Icon as={FiShoppingCart} />}
                    colorScheme="blue"
                    variant="ghost"
                    onClick={() => handleAddToCart(product)}
                  >
                    Cart
                  </Button>
                </Tooltip>
                <Tooltip label={wishlistItems.some(item => item._id === product._id) ? "Remove from Wishlist" : "Add to Wishlist"}>
                  <Button
                    size="sm"
                    leftIcon={<Icon as={FiHeart} />}
                    colorScheme={wishlistItems.some(item => item._id === product._id) ? "pink" : "pink"}
                    variant="ghost"
                    onClick={() => handleWishlistToggle(product)}
                  >
                    Wishlist
                  </Button>
                </Tooltip>
                <Tooltip label="View Details">
                  <Button
                    size="sm"
                    leftIcon={<Icon as={FiEye} />}
                    colorScheme="teal"
                    variant="ghost"
                    as={Link}
                    to={`/products/${product._id}`}
                  >
                    View
                  </Button>
                </Tooltip>
              </HStack>
            </CardFooter>
          </Card>
        ))}
      </Grid>
      <Login isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TrendingEyeglasses;