import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
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
import Login from '../../Pages/Login/Login';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !isAuth) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/product/lastvisited`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

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

  if (!isAuth) {
    return null;
  }

  if (loading) {
    return (
      <Box p={4}>
        <Skeleton height="40px" mb={4} />
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} height="300px" borderRadius="lg" />
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Box p={6}>
      <Fade in={true}>
        <VStack spacing={6} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="blue.600">
              Recently Viewed Products
            </Heading>
            <Tag size="lg" colorScheme="blue" borderRadius="full">
              <TagLeftIcon as={FiClock} />
              <TagLabel>Last 24 Hours</TagLabel>
            </Tag>
          </Flex>

          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
            {products.map((product, index) => (
              <ScaleFade key={product._id} initialScale={0.9} in={true} delay={index * 0.1}>
                <Card
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-5px)',
                    shadow: 'lg'
                  }}
                >
                  <Link to={`/products/${product._id}`}>
                    <Box position="relative">
                      <Image
                        src={product.imageTsrc}
                        alt={product.name}
                        height="200px"
                        width="100%"
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/200"
                      />
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="blue"
                        borderRadius="full"
                        px={2}
                      >
                        Recently Viewed
                      </Badge>
                    </Box>
                  </Link>

                  <CardBody>
                    <VStack align="start" spacing={2}>
                      <Link to={`/products/${product._id}`}>
                        <Heading size="sm" noOfLines={2} _hover={{ color: "blue.500" }}>
                          {product.name}
                        </Heading>
                      </Link>
                      <Text color="teal.500" fontWeight="bold" fontSize="lg">
                        ₹{product.price}
                      </Text>
                      <HStack spacing={2}>
                        <Badge colorScheme="green" variant="subtle">
                          In Stock
                        </Badge>
                        <Badge colorScheme="purple" variant="subtle">
                          {product.category}
                        </Badge>
                      </HStack>
                    </VStack>
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
              </ScaleFade>
            ))}
          </SimpleGrid>
        </VStack>
      </Fade>
      <Login isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default RecentlyViewed; 