import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
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

  return (
    <Card
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl',
      }}
      p={{ base: 2, sm: 4 }}
    >
      <CardBody p={{ base: 2, sm: 4 }}>
        <Box position="relative">
          <Image
            src={product.imageTsrc}
            alt={product.name}
            borderRadius="lg"
            objectFit="cover"
            height={{ base: "120px", sm: "180px" }}
            width="100%"
          />
        </Box>
        <Stack mt={{ base: 2, sm: 4 }} spacing={{ base: 2, sm: 3 }}>
          <VStack align="start" spacing={1} w="100%">
            <Heading size="sm" noOfLines={1} fontSize={{ base: "sm", sm: "md" }}>
              {product.name}
            </Heading>
            <HStack spacing={1}>
              <Tag size="sm" colorScheme="blue">{product.productType}</Tag>
              {product.trending && <Tag size="sm" colorScheme="green">Trending</Tag>}
            </HStack>
          </VStack>
          <Flex align="center" minW={0}>
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
              <Text ml={2} color="gray.600" fontSize={{ base: "xs", sm: "sm" }}>
                ({product.rating} • {product.userRated} reviews)
              </Text>
            </Box>
          </Flex>
          <HStack spacing={1}>
            <Tag size="sm" colorScheme="purple">{product.gender}</Tag>
            <Tag size="sm" colorScheme="orange">{product.shape}</Tag>
          </HStack>
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={0}>
              <Text color="blue.600" fontSize={{ base: "md", sm: "xl" }} fontWeight="bold">
                ₹{product.price}
              </Text>
              {product.mPrice > product.price && (
                <Text color="gray.500" fontSize={{ base: "xs", sm: "sm" }} textDecoration="line-through">
                  ₹{product.mPrice}
                </Text>
              )}
            </VStack>
            {discount > 0 && (
              <Badge colorScheme="green" fontSize={{ base: "xs", sm: "sm" }}>
                {discount}% OFF
              </Badge>
            )}
          </Flex>
          {product.quantity < 50 && (
            <Text color="red.500" fontSize={{ base: "xs", sm: "sm" }}>
              Only {product.quantity} left!
            </Text>
          )}
          <Flex gap={2}>
            <HStack spacing={{ base: 2, sm: 4 }} width="100%" justify="space-between">
              <Tooltip label="Add to Cart">
                <Button
                  size="sm"
                  leftIcon={<Box as={FiShoppingCart} />}
                  colorScheme="blue"
                  variant="ghost"
                  onClick={() => onAddToCart(product)}
                  fontSize={{ base: "xs", sm: "sm" }}
                  px={{ base: 2, sm: 3 }}
                >
                  Cart
                </Button>
              </Tooltip>
              <Tooltip label="Add to Wishlist">
                <Button
                  size="sm"
                  leftIcon={<Box as={FiHeart} color={isInWishlist ? "red.500" : "gray.500"} />}
                  colorScheme="pink"
                  variant="ghost"
                  onClick={() => onWishlistToggle(product)}
                  fontSize={{ base: "xs", sm: "sm" }}
                  px={{ base: 2, sm: 3 }}
                >
                  Wishlist
                </Button>
              </Tooltip>
              <Tooltip label="View Details">
                <Button
                  size="sm"
                  leftIcon={<Box as={FiEye} />}
                  colorScheme="teal"
                  variant="ghost"
                  onClick={() => onViewDetails(product)}
                  fontSize={{ base: "xs", sm: "sm" }}
                  px={{ base: 2, sm: 3 }}
                >
                  View
                </Button>
              </Tooltip>
            </HStack>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

const ProductSection = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = useBreakpointValue({ base: 2, sm: 2, md: 3, lg: 4 });
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
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

  const handleViewDetails = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const arrowButtonStyles = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    colorScheme: "blue",
    size: "md",
    borderRadius: "full",
    boxShadow: "md",
    bg: "white",
    border: "2px solid",
    borderColor: "blue.200",
    _hover: {
      bg: "blue.50",
      transform: "translateY(-50%) scale(1.1)",
      boxShadow: "lg",
      borderColor: "blue.400"
    },
    _active: {
      bg: "blue.100",
      borderColor: "blue.500"
    },
    transition: "all 0.2s",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      borderColor: "gray.200",
      _hover: {
        bg: "white",
        transform: "translateY(-50%)",
        boxShadow: "md",
        borderColor: "gray.200"
      }
    }
  };

  return (
    <Box mb={12} position="relative">
      <Container maxW="container.xl" px={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h2" size="lg" fontWeight="bold">
            {title}
          </Heading>
        </Flex>

        <Box position="relative" overflow="hidden" borderRadius="lg" bg="gray.50" p={4}>
          <Box position="relative" px={1}>
            <IconButton
              icon={<ChevronLeftIcon boxSize={6} color="blue.600" />}
              onClick={handlePrev}
              aria-label="Previous"
              left={-3}
              isDisabled={currentIndex === 0}
              opacity={currentIndex === 0 ? 0.4 : 1}
              {...arrowButtonStyles}
            />

            <IconButton
              icon={<ChevronRightIcon boxSize={6} color="blue.600" />}
              onClick={handleNext}
              aria-label="Next"
              right={-3}
              isDisabled={currentIndex === totalPages - 1}
              opacity={currentIndex === totalPages - 1 ? 0.4 : 1}
              {...arrowButtonStyles}
            />

            <Box
              display="flex"
              transition="transform 0.5s ease"
              transform={`translateX(-${currentIndex * 100}%)`}
              width={`${totalPages * 100}%`}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <Box key={pageIndex} width="100%" px={2}>
                  <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={{ base: 3, sm: 4, md: 6 }}>
                    {products
                      ?.slice(
                        pageIndex * itemsPerPage,
                        (pageIndex + 1) * itemsPerPage
                      )
                      .map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          onAddToCart={handleAddToCart}
                          onViewDetails={handleViewDetails}
                          onWishlistToggle={handleWishlistToggle}
                          isInWishlist={wishlistItems.some(item => item._id === product._id)}
                        />
                      ))}
                  </SimpleGrid>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

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
            >
              <Tooltip label={`Slide ${index + 1}`} placement="top">
                <Box position="absolute" w="100%" h="100%" />
              </Tooltip>
            </Box>
          ))}
        </Flex>
      </Container>

      {isOpen && <Login isOpen={isOpen} onClose={onClose} />}
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