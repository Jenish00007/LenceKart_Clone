import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../redux/cart";
import Navbar from "../../Components/Navbar/Navbar";
import CartLength from "./CartLength";
import CartItem from "./CartItem";
import PriceDetail from "./priceDetail";
import CartEmpty from "./CartEmpty";
import Footer from "../../Components/Footer/Footer";
import {
  Flex,
  Text,
  Button,
  Box,
  Container,
  VStack,
  Spinner,
  useToast,
  Heading
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const getTotalPrice = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return totalPrice;
  };

  const getdiscountPrice = () => {
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.mPrice * item.quantity,
      0
    );
    return totalPrice; 
  };

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Box 
          as="main" 
          pt="140px"
          minH="calc(100vh - 140px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={4}>
            <Spinner size="xl" color="teal.500" />
            <Text color="gray.600">Loading your cart...</Text>
          </VStack>
        </Box>
        <Footer />
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Navbar />
        <Box 
          as="main" 
          pt="140px"
          minH="calc(100vh - 140px)"
        >
          <Container maxW="container.xl" py={8}>
            <VStack spacing={6}>
              <Text color="red.500" fontSize="lg">{error}</Text>
              <Button
                colorScheme="teal"
                onClick={() => dispatch(getCart())}
              >
                Try Again
              </Button>
            </VStack>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box 
        as="main" 
        pt="140px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
          {cart && cart.length > 0 ? (
            <Flex
              width="100%"
              gap={8}
              flexDirection={{
                base: "column",
                lg: "row"
              }}
              animation={`${fadeIn} 0.8s ease-out`}
            >
              <Flex
                flexDirection="column"
                gap={6}
                width={{
                  base: "100%",
                  lg: "65%"
                }}
              >
                <Box
                  animation={`${fadeIn} 0.8s ease-out`}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                  transition="all 0.3s"
                >
                  <CartLength cartLength={cart.length} />
                </Box>
                <Box
                  animation={`${fadeIn} 0.8s ease-out 0.2s`}
                >
                  <CartItem />
                </Box>
              </Flex>

              <Flex
                flexDirection="column"
                width={{
                  base: "100%",
                  lg: "35%"
                }}
                gap={6}
              >
                <Heading
                  size="md"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  bgClip="text"
                  _hover={{
                    transform: "translateX(10px)"
                  }}
                  transition="all 0.3s"
                >
                  Bill Details
                </Heading>

                <Box
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl"
                  }}
                  transition="all 0.3s"
                  p={6}
                  borderRadius="lg"
                  boxShadow="lg"
                  bg="white"
                >
                  <PriceDetail
                    totalPrice={getTotalPrice()}
                    discountPrice={getdiscountPrice()}
                  />
                </Box>

                <Button
                  colorScheme="teal"
                  size="lg"
                  height="56px"
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/shipping")}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                  transition="all 0.3s"
                  animation={`${fadeIn} 0.8s ease-out 0.6s`}
                >
                  Proceed To Checkout
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Box animation={`${fadeIn} 0.8s ease-out`}>
              <CartEmpty />
            </Box>
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default CartPage;
