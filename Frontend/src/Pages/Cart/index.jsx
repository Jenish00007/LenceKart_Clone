import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../redux/cart";
import Navbar from "../../Components/Navbar/Navbar";
import CartLength from "./CartLength";
import CartItem from "./CartItem";
import PriceDetail from "./priceDetail";
import SaleBox from "./SaleBox";
import CartEmpty from "./CartEmpty";
import CouponBox from "./CouponBox";
import Footer from "../../Components/Footer/Footer";
import { Flex, Text, Button, Box,} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

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
      <>
        <Navbar />
        <Flex justify="center" align="center" minH="60vh">
          <Text>Loading cart...</Text>
        </Flex>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Flex justify="center" align="center" minH="60vh">
          <Text color="red.500">{error}</Text>
        </Flex>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {cart && cart.length > 0 ? (
        <Flex
          width={"90%"}
          margin="auto"
          marginTop={"20px"}
          marginBottom="20px"
          gap={16}
          flexDirection={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
            "2xl": "row"
          }}
          animation={`${fadeIn} 0.8s ease-out`}
        >
          <Flex
            flexDirection={"column"}
            gap="5"
            width={{
              base: "95%",
              sm: "95%",
              md: "95%",
              lg: "60%",
              xl: "65%",
              "2xl": "65%"
            }}
          >
            <Box
              animation={`${fadeIn} 0.8s ease-out`}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              transition="all 0.3s ease"
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
            flexDirection={"column"}
            width={{
              base: "95%",
              sm: "95%",
              md: "95%",
              lg: "35%",
              xl: "27%",
              "2xl": "27%"
            }}
            gap={"5"}
            animation={`${slideIn} 0.8s ease-out 0.4s`}
          >
            <Text
              fontSize="24px"
              fontFamily="sans-serif"
              fontWeight={600}
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
              _hover={{
                transform: "translateX(10px)"
              }}
              transition="all 0.3s ease"
            >
              Bill Details
            </Text>
            <Box
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "xl"
              }}
              transition="all 0.3s ease"
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
            {/* <SaleBox /> */}

            {/* <CouponBox /> */}
            <Button
              backgroundColor={"#12daac"}
              color="#091e52"
              borderRadius={"20px"}
              padding="16px 24px 16px 24px"
              fontSize={"16px"}
              height="56px"
              fontWeight={"700"}
              onClick={() => navigate("/shipping")}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                backgroundColor: "#10c49a"
              }}
              transition="all 0.3s ease"
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
      <Footer />
    </>
  );
};

export default CartPage;
