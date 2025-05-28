import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Badge,
  Flex,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Icon,
  Tooltip,
  Skeleton,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Fade,
  ScaleFade,
  useToast,
  useDisclosure
} from "@chakra-ui/react";
import { API_URL } from "../../config";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiTrendingUp } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { addToCart } from '../../redux/cart';
import { AuthContext } from '../../ContextApi/AuthContext';
import Login from '../../Pages/Login/Login';

const RecommendedCategories = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);

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
      const cartItem = {
        productId: product._id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.imageTsrc
      };

      await dispatch(addToCart(cartItem));
      toast({
        title: 'Added to cart',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add item to cart',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/recommended`);
        const data = await response.json();
        setRecommendedProducts(data.products || []);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch recommended products",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [toast]);

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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} height={{ base: "320px", md: "400px" }} borderRadius="lg" />
          ))}
        </Grid>
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
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              textAlign={{ base: "center", sm: "left" }}
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)",
              }}
            >
              Recommended Products
            </Heading>
            <Tag size={{ base: "md", sm: "lg" }} colorScheme="purple" borderRadius="full">
              <TagLeftIcon as={FiTrendingUp} />
              <TagLabel>Trending Now</TagLabel>
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
            {recommendedProducts?.map((product) => (
              <ScaleFade key={product._id} initialScale={0.9} in={true}>
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
                        colorScheme="purple"
                        borderRadius="full"
                        px={2}
                        fontSize={{ base: "xx-small", sm: "xs" }}
                      >
                        Recommended
                      </Badge>
                    </Box>

                    <VStack align="start" spacing={2} mt={3}>
                      <Heading 
                        size={{ base: "xs", sm: "sm" }} 
                        noOfLines={2}
                        lineHeight="1.2"
                        minH={{ base: "32px", sm: "40px" }}
                      >
                        {product.name}
                      </Heading>
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

export default RecommendedCategories;