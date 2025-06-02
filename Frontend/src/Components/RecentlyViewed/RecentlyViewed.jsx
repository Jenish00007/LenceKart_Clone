import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Text,
  Grid,
  Image,
  Flex,
  Spinner,
  useToast,
  Heading,
  Badge,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Button,
  Tooltip,
  Skeleton,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Fade,
  ScaleFade,
  useDisclosure
} from '@chakra-ui/react';
import { AuthContext } from '../../ContextApi/AuthContext';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';
import { FiEye, FiClock, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { addToCart } from '../../redux/cart/cart.actions';
import Login from '../../Pages/Login/Login';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const cartItems = useSelector((state) => state.cart.cart);

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.400");

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
    const fetchRecentlyViewed = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug log
        console.log('isAuth:', isAuth); // Debug log
        
        if (!token || !isAuth) {
          console.log('No token or not authenticated'); // Debug log
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/products/lastvisited`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('Response data:', data); // Debug log

        if (data.success) {
          setProducts(data.products || []);
        } else {
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
        console.error('Error fetching recently viewed:', error); // Debug log
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
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} height={{ base: "350px", md: "450px" }} borderRadius="lg" />
          ))}
        </Grid>
      </Box>
    );
  }

  if (!isAuth) {
    return (
      <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50">
        <Heading
          textAlign="center"
          mb={{ base: 6, md: 8 }}
          size={{ base: "md", sm: "lg" }}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Recently Viewed Products
        </Heading>
        <Box textAlign="center" p={8}>
          <Text fontSize="lg" color="gray.600">
            Please login to see your recently viewed products
          </Text>
        </Box>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50">
        <Heading
          textAlign="center"
          mb={{ base: 6, md: 8 }}
          size={{ base: "md", sm: "lg" }}
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
        >
          Recently Viewed Products
        </Heading>
        <Box textAlign="center" p={8}>
          <Text fontSize="lg" color="gray.600">
            You haven't viewed any products yet
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50">
      <Fade in={true}>
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <Flex 
            justify="space-between" 
            align="center" 
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 3, sm: 0 }}
          >
            <Heading
              size={{ base: "md", sm: "lg" }}
              color="blue.600"
              textAlign={{ base: "center", sm: "left" }}
              _hover={{
                color: "blue.700",
              }}
            >
              Recently Viewed Products
            </Heading>
            <Tag size={{ base: "md", sm: "lg" }} colorScheme="blue" borderRadius="full">
              <TagLeftIcon as={FiClock} />
              <TagLabel>Last 24 Hours</TagLabel>
            </Tag>
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 3, sm: 4, md: 6 }}
          >
            {products.map((product, index) => (
              <ScaleFade key={product._id} initialScale={0.9} in={true} delay={index * 0.1}>
                <Card
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  overflow="hidden"
                  transition="all 0.3s"
                  h="100%"
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'lg'
                  }}
                >
                  <CardBody p={{ base: 3, sm: 4 }}>
                    <Link to={`/products/${product._id}`}>
                      <Box position="relative">
                        <Image
                          src={product.imageTsrc}
                          alt={product.name}
                          height={{ base: "120px", sm: "150px", md: "180px" }}
                          width="100%"
                          objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/200"
                          borderRadius="md"
                        />
                        <Badge
                          position="absolute"
                          top={2}
                          right={2}
                          colorScheme="blue"
                          borderRadius="full"
                          px={2}
                          fontSize={{ base: "xx-small", sm: "xs" }}
                        >
                          Recently Viewed
                        </Badge>
                      </Box>
                    </Link>

                    <VStack align="start" spacing={2} mt={3}>
                      <Link to={`/products/${product._id}`}>
                        <Heading 
                          size={{ base: "xs", sm: "sm" }} 
                          noOfLines={2} 
                          _hover={{ color: "blue.500" }}
                          lineHeight="1.2"
                          minH={{ base: "32px", sm: "40px" }}
                        >
                          {product.name}
                        </Heading>
                      </Link>
                      <Text 
                        color="teal.500" 
                        fontWeight="bold" 
                        fontSize={{ base: "sm", sm: "md", md: "lg" }}
                      >
                        ₹{product.price}
                      </Text>
                      <VStack spacing={1} align="start" w="100%">
                        <Badge colorScheme="green" variant="subtle" fontSize="xx-small">
                          In Stock
                        </Badge>
                        <Badge 
                          colorScheme="purple" 
                          variant="subtle" 
                          fontSize="xx-small"
                          noOfLines={1}
                        >
                          {product.category}
                        </Badge>
                      </VStack>
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
              </ScaleFade>
            ))}
          </Grid>
        </VStack>
      </Fade>
      <Box style={{ display: 'none' }}>
        <Login isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
};

export default RecentlyViewed;