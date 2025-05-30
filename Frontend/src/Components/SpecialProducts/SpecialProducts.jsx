import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Text,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Badge,
  Flex,
  HStack,
  Tag,
  VStack,
  Container,
  Button,
  useToast,
  Tooltip,
  useDisclosure,
  Grid,
  Wrap,
  Icon,
  Divider,
  TagLabel,
  TagLeftIcon,
  Fade,
  ScaleFade,
  Skeleton,
  useColorModeValue,
  Spinner,
  Center
} from '@chakra-ui/react';
import { FiShoppingCart, FiHeart, FiEye, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import Login from '../../Pages/Login/Login';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlist.actions';
import { addToCart } from '../../redux/cart/cart.actions';

const API_URL = 'http://localhost:8080/api';

const ProductCard = ({ product, onAddToCart, onViewDetails, onWishlistToggle, isInWishlist }) => {
  const discount = product.mPrice > product.price 
    ? Math.round(((product.mPrice - product.price) / product.mPrice) * 100) 
    : 0;

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (product.loading) {
    return (
      <Card
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.3s"
        h="100%"
      >
        <CardBody p={{ base: 3, sm: 4 }}>
          <Center h="200px">
            <Spinner size="xl" color="teal.500" />
          </Center>
        </CardBody>
      </Card>
    );
  }

  return (
    <ScaleFade initialScale={0.9} in={true}>
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
              src={product.imageTsrc || product.image || '/placeholder-image.png'}
              alt={product.name || "Product Image"}
              height={{ base: "120px", sm: "150px", md: "180px" }}
              width="100%"
              objectFit="cover"
              fallbackSrc="/placeholder-image.png"
              borderRadius="md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.png';
              }}
            />
            {discount > 0 && (
              <Badge
                position="absolute"
                top={2}
                right={2}
                colorScheme="green"
                borderRadius="full"
                px={2}
                fontSize={{ base: "xx-small", sm: "xs" }}
              >
                {discount}% OFF
              </Badge>
            )}
            {product.trending && (
              <Badge
                position="absolute"
                top={2}
                left={2}
                colorScheme="purple"
                borderRadius="full"
                px={2}
                fontSize={{ base: "xx-small", sm: "xs" }}
              >
                Trending
              </Badge>
            )}
          </Box>

          <VStack align="start" spacing={2} mt={3}>
            <Heading 
              size={{ base: "xs", sm: "sm" }} 
              noOfLines={2}
              lineHeight="1.2"
              minH={{ base: "32px", sm: "40px" }}
            >
              {product.name || "Product Name"}
            </Heading>

            {/* Rating */}
            <Flex align="center" w="100%">
              <Box display="flex" alignItems="center" minW={0}>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <Box
                      key={i}
                      color={i < Math.floor(product.rating) ? 'yellow.400' : 'gray.300'}
                      fontSize={{ base: "xs", sm: "sm" }}
                    >
                      ★
                    </Box>
                  ))}
                <Text ml={2} color="gray.600" fontSize={{ base: "2xs", sm: "xs" }} isTruncated>
                  ({product.rating})
                </Text>
              </Box>
            </Flex>

            {/* Price */}
            <Flex justify="space-between" align="center" w="100%">
              <VStack align="start" spacing={0} minW={0}>
                <Text color="blue.600" fontSize={{ base: "sm", sm: "md", md: "lg" }} fontWeight="bold">
                  ₹{product.price}
                </Text>
                {product.mPrice > product.price && (
                  <Text color="gray.500" fontSize={{ base: "xs", sm: "sm" }} textDecoration="line-through">
                    ₹{product.mPrice}
                  </Text>
                )}
              </VStack>
            </Flex>

            {/* Tags */}
            <VStack spacing={1} align="start" w="100%">
              <Wrap spacing={1} shouldWrapChildren>
                <Badge colorScheme="blue" variant="subtle" fontSize="xx-small">
                  {product.productType}
                </Badge>
                <Badge colorScheme="purple" variant="subtle" fontSize="xx-small">
                  {product.gender}
                </Badge>
                {product.shape && (
                  <Badge colorScheme="orange" variant="subtle" fontSize="xx-small">
                    {product.shape}
                  </Badge>
                )}
              </Wrap>
              
              {product.quantity < 50 && (
                <Text color="red.500" fontSize={{ base: "xs", sm: "sm" }}>
                  Only {product.quantity} left!
                </Text>
              )}
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
                  onClick={() => onAddToCart(product)}
                  flex="1"
                >
                  <Text display={{ base: "none", sm: "block" }}>Cart</Text>
                </Button>
              </Tooltip>
              
              <Tooltip label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
                <Button
                  size={{ base: "xs", sm: "sm" }}
                  fontSize={{ base: "10px", sm: "12px" }}
                  px={{ base: 2, sm: 3 }}
                  leftIcon={<Icon as={FiHeart} boxSize={{ base: 3, sm: 4 }} color={isInWishlist ? "red.500" : "gray.500"} />}
                  colorScheme="pink"
                  variant="ghost"
                  onClick={() => onWishlistToggle(product)}
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
                onClick={() => onViewDetails(product)}
                width="100%"
              >
                View Details
              </Button>
            </Tooltip>
          </VStack>
        </CardFooter>
      </Card>
    </ScaleFade>
  );
};

const ProductSection = ({ title, products, loading = false }) => {
  const [page, setPage] = useState(0);
  const productsPerPage = 4;
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);
  const paginatedProducts = products?.slice(
    page * productsPerPage,
    (page + 1) * productsPerPage
  ) || [];
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const cartItems = useSelector((state) => state.cart.cart);

  const handleAuthAction = () => {
    if (!isAuth) {
      onOpen();
      return false;
    }
    return true;
  };

  const handleWishlistToggle = (product) => {
    if (!handleAuthAction()) return;

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
    if (!handleAuthAction()) return;

    try {
      const existingItem = cartItems.find(item => item.productId === product._id);

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

  const handleViewDetails = (product) => {
    navigate(`/products/${product._id}`);
  };

  if (loading) {
    return (
      <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50" mb={8}>
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
            <Skeleton key={item} height={{ base: "320px", md: "400px" }} borderRadius="lg" />
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, sm: 6, md: 8 }} bg="gray.50" mb={8}>
      <Container maxW="container.xl" px={0}>
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
                {title}
              </Heading>
              <Tag size={{ base: "md", sm: "lg" }} colorScheme="purple" borderRadius="full">
                <TagLeftIcon as={FiTrendingUp} />
                <TagLabel>Featured</TagLabel>
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
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  onWishlistToggle={handleWishlistToggle}
                  isInWishlist={wishlistItems.some(item => item._id === product._id)}
                />
              ))}
            </Grid>
            <Flex justify="center" mt={4} gap={2}>
              <Button onClick={() => setPage(p => Math.max(0, p - 1))} isDisabled={page === 0} size="sm">Prev</Button>
              <Text fontSize="sm" color="gray.600" alignSelf="center">Page {page + 1} of {totalPages}</Text>
              <Button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} isDisabled={page === totalPages - 1} size="sm">Next</Button>
            </Flex>
          </VStack>
        </Fade>
      </Container>
      <Box style={{ display: 'none' }}>
        <Login isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
};

const SpecialProducts = () => {
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [offered, setOffered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [topRatedRes, latestRes, exclusiveRes, offeredRes] = await Promise.all([
          axios.get('http://localhost:8080/products/categories/top-rated'),
          axios.get('http://localhost:8080/products/categories/latest'),
          axios.get('http://localhost:8080/products/categories/exclusive'),
          axios.get('http://localhost:8080/products/categories/offered'),
        ]);

        setTopRated(topRatedRes.data);
        setLatest(latestRes.data);
        setExclusive(exclusiveRes.data);
        setOffered(offeredRes.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box py={8}>
      <ProductSection title="Top Rated Products" products={topRated} loading={loading} />
      <ProductSection title="Latest Arrivals" products={latest} loading={loading} />
      <ProductSection title="Exclusive Products" products={exclusive} loading={loading} />
      <ProductSection title="Special Offers" products={offered} loading={loading} />
    </Box>
  );
};

export default SpecialProducts;

