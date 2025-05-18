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
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/recommended`);
        const data = await response.json();
        setRecommendedProducts(data);
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
      <Box p={8} bg="gray.50">
        <Skeleton height="40px" mb={8} />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} height="400px" borderRadius="lg" />
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={8} bg="gray.50">
      <Fade in={true}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading
              size="lg"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)",
              }}
            >
              Recommended Products
            </Heading>
            <Tag size="lg" colorScheme="purple" borderRadius="full">
              <TagLeftIcon as={FiTrendingUp} />
              <TagLabel>Trending Now</TagLabel>
            </Tag>
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
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
                  _hover={{
                    transform: 'translateY(-5px)',
                    shadow: 'lg'
                  }}
                >
                  <CardBody>
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
                        colorScheme="purple"
                        borderRadius="full"
                        px={2}
                      >
                        Recommended
                      </Badge>
                    </Box>

                    <VStack align="start" spacing={2} mt={4}>
                      <Heading size="sm" noOfLines={2}>
                        {product.name}
                      </Heading>
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
          </Grid>
        </VStack>
      </Fade>
      <Login isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default RecommendedCategories; 