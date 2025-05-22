import { useSelector, useDispatch } from "react-redux";
import { Box, Text, Button, Heading, Grid, useToast, Container } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';

import { removeFromWishlist } from "../../redux/wishlist/wishlist.actions";
import { addToCart } from "../../redux/CartPage/action";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
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
      data.quantity = 1;
      dispatch(addToCart(data));
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

  return (
    <Box>
      <Navbar />
     
      <Box 
        as="main" 
        pt="120px"
      minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
     
        <Heading
          fontSize="25px"
          textAlign="left"
          p="4"
          bgGradient="linear(to-r, teal.400, blue.500)"
          color="whiteAlpha.900"
          w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
          m="auto"
          borderRadius="lg"
          boxShadow="lg"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "xl"
          }}
          transition="all 0.3s ease"
          animation={`${fadeIn} 0.8s ease-out`}
        >
          Wishlist
        </Heading>
        {wishlistItems.length === 0 ? (
          <Text
            textAlign="center"
            fontSize="28px"
            color="gray"
            mt="5%"
            fontWeight="bolder"
            animation={`${fadeIn} 0.8s ease-out`}
          >
            Your wishlist is empty.
          </Text>
        ) : (
          <Box>
            <Grid templateColumns="repeat(1,1fr)" gap={18} w={"100%"}>
              {wishlistItems &&
                wishlistItems &&
                wishlistItems.map((item, index) => (
                  <Box
                    key={item.id}
                    borderWidth="1px"
                    boxShadow="2xl"
                    p="6"
                    my="4"
                    w={{ lg: "80%", md: "90%", sm: "90%", base: "95%" }}
                    m="auto"
                    borderRadius="lg"
                    bg="white"
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: "xl"
                    }}
                    transition="all 0.3s ease"
                    animation={`${fadeIn} 0.8s ease-out ${index * 0.1}s`}
                  >
                    <Grid
                      m="auto"
                      templateColumns={{
                        base: "repeat(1,1fr)",
                        sm: "repeat(1,1fr)",
                        md: "repeat(1,1fr)",
                        lg: "60% 40%",
                        xl: "70% 30%"
                      }}
                      justify="space-between"
                      mb="4"
                    >
                      <Text
                        fontSize="xl"
                        fontWeight="bold"
                        textTransform="capitalize"
                        mb={{ sm: "4", base: "4" }}
                        bgGradient="linear(to-r, blue.500, purple.500)"
                        bgClip="text"
                        _hover={{
                          transform: "translateX(10px)"
                        }}
                        transition="all 0.3s ease"
                      >
                        {item.productRefLink}
                      </Text>
                      <Grid
                        m={{ lg: "auto", sm: "left", base: "right" }}
                        templateColumns={{
                          base: "repeat(1,1fr)",
                          sm: "repeat(2,1fr)",
                          md: "repeat(2,1fr)",
                          lg: "repeat(2,1fr)",
                          xl: "repeat(2,1fr)"
                        }}
                        gap="4"
                        justify="space-between"
                        mb="2"
                      >
                        <Button
                          colorScheme="blue"
                          onClick={() => handleAddToCart(item)}
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg"
                          }}
                          transition="all 0.3s ease"
                        >
                          Add to Cart
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(item._id)}
                          _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "lg"
                          }}
                          transition="all 0.3s ease"
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid
                      m="auto"
                      templateColumns={{
                        base: "repeat(1,1fr)",
                        sm: "40% 50%",
                        md: "30% 60%",
                        lg: "30% 60%",
                        xl: "20% 60%"
                      }}
                      align="center"
                      mb="1"
                    >
                      <Box
                        position="relative"
                        _hover={{
                          transform: "scale(1.05)"
                        }}
                        transition="all 0.3s ease"
                      >
                        <img
                          src={item.imageTsrc}
                          alt={item.name}
                          boxSize="180px"
                          m="auto"
                          borderRadius="lg"
                          boxShadow="md"
                        />
                      </Box>

                      <Box
                        ml="4"
                        textAlign={{
                          lg: "left",
                          md: "left",
                          sm: "left",
                          base: "center"
                        }}
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          textTransform="capitalize"
                          _hover={{
                            color: "blue.500",
                            transform: "translateX(10px)"
                          }}
                          transition="all 0.3s ease"
                        >
                          {item.name}
                        </Text>
                        <Text 
                          fontSize="lg" 
                          fontWeight="bold"
                          _hover={{
                            color: "green.500",
                            transform: "translateX(10px)"
                          }}
                          transition="all 0.3s ease"
                        >
                          Price : ₹ {item.price}.00 /-
                        </Text>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="gray.600"
                          textTransform="capitalize"
                          _hover={{
                            color: "purple.500",
                            transform: "translateX(10px)"
                          }}
                          transition="all 0.3s ease"
                        >
                          {item.productType}
                        </Text>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="gray.600"
                          textTransform="capitalize"
                          _hover={{
                            color: "purple.500",
                            transform: "translateX(10px)"
                          }}
                          transition="all 0.3s ease"
                        >
                          Colour : {item.colors}
                        </Text>
                        <Text
                          fontSize="md"
                          fontWeight="600"
                          color="gray.600"
                          textTransform="capitalize"
                          _hover={{
                            color: "purple.500",
                            transform: "translateX(10px)"
                          }}
                          transition="all 0.3s ease"
                        >
                          Shape : {item.shape}
                        </Text>
                      </Box>
                    </Grid>
                  </Box>
                ))}
            </Grid>
          </Box>
        )}
     
      </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Wishlist;
