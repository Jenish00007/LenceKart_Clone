import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Text,
  Button,
  Heading,
  Grid,
  useToast,
  Container,
  Image,
  VStack,
  HStack,
  Spinner,
  Card,
  CardBody,
  Badge,
  Flex
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { removeFromWishlist } from "../../redux/wishlist/wishlist.actions";
import { addToCart } from "../../redux/CartPage/action";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wishlist = () => {
  const wishlistItems = useSelector((store) => store.wishlist.wishlist);
  const cartState = useSelector((state) => state.cart || {});
  const cart = cartState.cart || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleDelete = (item) => {
    dispatch(removeFromWishlist(item));
    toast({
      title: "Removed from Wishlist",
      description: "Product has been removed from your wishlist",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "bottom"
    });
  };

  const handleAddToCart = (data) => {
    const existingItem = cart.findIndex((item) => item._id === data._id);
    if (existingItem === -1) {
      const cartItem = {
        ...data,
        quantity: 1
      };
      dispatch(addToCart(cartItem));
      dispatch(removeFromWishlist(data._id));
      toast({
        title: "Added to Cart",
        description: "Product has been added to your cart",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom"
      });
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    } else {
      toast({
        title: "Product Already in Cart",
        description: "This product is already in your cart",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box 
        as="main" 
        pt="140px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Heading
              size="lg"
              textAlign="center"
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              animation={`${fadeIn} 0.8s ease-out`}
            >
              My Wishlist
            </Heading>

            {wishlistItems.length === 0 ? (
              <Card>
                <CardBody>
                  <VStack spacing={6} py={8}>
                    <Text
                      fontSize="xl"
                      color="gray.500"
                      fontWeight="medium"
                    >
                      Your wishlist is empty
                    </Text>
                    <Button
                      colorScheme="teal"
                      size="lg"
                      onClick={() => navigate('/products')}
                      leftIcon={<AddIcon />}
                    >
                      Start Shopping
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                {wishlistItems.map((item, index) => (
                  <Card
                    key={item._id}
                    animation={`${fadeIn} 0.8s ease-out ${index * 0.1}s`}
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "xl"
                    }}
                    transition="all 0.3s"
                  >
                    <CardBody>
                      <Grid
                        templateColumns={{
                          base: "1fr",
                          md: "auto 1fr auto"
                        }}
                        gap={6}
                        alignItems="center"
                      >
                        <Box
                          position="relative"
                          w="200px"
                          h="200px"
                          borderRadius="lg"
                          overflow="hidden"
                        >
                          <Image
                            src={item.imageTsrc || item.image || '/placeholder-image.png'}
                            alt={item.name || "Product Image"}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            fallback={
                              <Box
                                w="100%"
                                h="100%"
                                bg="gray.100"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Text color="gray.500">No Image</Text>
                              </Box>
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-image.png';
                            }}
                          />
                        </Box>

                        <VStack align="start" spacing={3}>
                          <Heading size="md" color="teal.500">
                            {item.name}
                          </Heading>
                          <Text fontSize="xl" fontWeight="bold" color="gray.700">
                            {formatPrice(item.price)}
                          </Text>
                          <HStack spacing={4}>
                            <Badge colorScheme="purple" fontSize="sm">
                              {item.productType}
                            </Badge>
                            <Badge colorScheme="blue" fontSize="sm">
                              {item.colors}
                            </Badge>
                            <Badge colorScheme="green" fontSize="sm">
                              {item.shape}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {item.productRefLink}
                          </Text>
                        </VStack>

                        <VStack spacing={4}>
                          <Button
                            colorScheme="teal"
                            leftIcon={<AddIcon />}
                            onClick={() => handleAddToCart(item)}
                            w="full"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: "lg"
                            }}
                            transition="all 0.2s"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            colorScheme="red"
                            variant="outline"
                            leftIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item._id)}
                            w="full"
                            _hover={{
                              transform: "translateY(-2px)",
                              boxShadow: "lg"
                            }}
                            transition="all 0.2s"
                          >
                            Remove
                          </Button>
                        </VStack>
                      </Grid>
                    </CardBody>
                  </Card>
                ))}
              </Grid>
            )}
          </VStack>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Wishlist;
