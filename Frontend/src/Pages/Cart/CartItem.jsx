import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decrement,
  increment
} from "../../redux/CartPage/action";
import {
  Flex,
  Heading,
  Button,
  Image,
  Text,
  Box,
  Grid,
  keyframes
} from "@chakra-ui/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const CartItem = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const handleDelete = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecrementChange = (id, qty) => {
    if (qty < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(decrement(id));
    }
  };

  const handleIncrementChange = (id) => {
    dispatch(increment(id));
  };

  return (
    <Box>
      {cart &&
        cart &&
        cart.map((item, index) => (
          <Grid
            key={item.id}
            templateColumns={{
              lg: "20% 80%",
              md: "20% 80%",
              base: "repeat(1, 1fr)"
            }}
            gap={6}
            borderRadius="lg"
            boxShadow="lg"
            padding="20px"
            w="100%"
            justifyContent="space-between"
            bg="white"
            mb={4}
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out ${index * 0.1}s`}
          >
            <Box
              position="relative"
              _hover={{
                transform: "scale(1.05)"
              }}
              transition="all 0.3s ease"
            >
              <Image
                w={{
                  base: "60%",
                  sm: "50%",
                  md: "100%",
                  lg: "100%",
                  xl: "100%",
                  "2xl": "100%"
                }}
                margin={{
                  base: "auto",
                  sm: "auto",
                  md: "auto",
                  lg: "unset",
                  xl: "unset",
                  "2xl": "unset"
                }}
                src={item.imageTsrc}
                borderRadius="lg"
                boxShadow="md"
              />
            </Box>
            <Flex
              flexDirection={"column"}
              gap="4"
              width={{
                base: "90%",
                sm: "90%",
                md: "90%",
                lg: "90%",
                xl: "90%",
                "2xl": "90%"
              }}
              margin={{
                base: "auto",
                sm: "auto",
                md: "auto",
                lg: "unset",
                xl: "unset",
                "2xl": "unset"
              }}
            >
              <Flex
                justifyContent={"space-between"}
                gap="20"
                marginTop={5}
              >
                <Heading
                  as="h1"
                  fontSize={"18px"}
                  lineHeight="22px"
                  textTransform={"capitalize"}
                  letterSpacing="-0.32px"
                  fontWeight={500}
                  bgGradient="linear(to-r, blue.500, purple.500)"
                  bgClip="text"
                  _hover={{
                    transform: "translateX(10px)"
                  }}
                  transition="all 0.3s ease"
                >
                  {item.productRefLink}
                </Heading>
                <Flex gap={"2"}>
                  <Text 
                    fontSize={"18px"} 
                    fontWeight="500" 
                    color="gray.600"
                    _hover={{
                      color: "green.500",
                      transform: "translateX(-10px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    ₹{item.mPrice}
                  </Text>
                </Flex>
              </Flex>
              <Box 
                border={"1px dashed #CECEDF"}
                _hover={{
                  borderColor: "blue.500"
                }}
                transition="all 0.3s ease"
              />
              <Flex justifyContent={"space-between"}>
                <Heading
                  as="h1"
                  fontSize={"18px"}
                  lineHeight="22px"
                  textTransform={"capitalize"}
                  fontWeight={500}
                  _hover={{
                    color: "blue.500",
                    transform: "translateX(10px)"
                  }}
                  transition="all 0.3s ease"
                >
                  Final Price
                </Heading>
                <Flex gap={"2"}>
                  <Text 
                    fontSize={"18px"} 
                    fontWeight="500" 
                    color="gray.600"
                    _hover={{
                      color: "green.500",
                      transform: "translateX(-10px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    ₹{item.mPrice}
                  </Text>
                </Flex>
              </Flex>
              <Box 
                border={"1px dashed #CECEDF"}
                _hover={{
                  borderColor: "blue.500"
                }}
                transition="all 0.3s ease"
              />
              <Flex
                gap="5"
                justifyContent="space-between"
              >
                <Button
                  backgroundColor={"white"}
                  _hover={{
                    color: "red.500",
                    transform: "translateX(10px)"
                  }}
                  textDecoration="underline"
                  fontSize={"18"}
                  ml="-1.5"
                  onClick={() => handleDelete(item._id)}
                  transition="all 0.3s ease"
                >
                  Remove
                </Button>

                <Flex
                  align="center"
                  border="1px"
                  borderColor="gray.400"
                  borderRadius="3xl"
                  _hover={{
                    borderColor: "blue.500",
                    boxShadow: "md"
                  }}
                  transition="all 0.3s ease"
                >
                  <Button
                    bg="whiteAlpha.900"
                    size="md"
                    borderRadius="50%"
                    fontSize="20px"
                    onClick={() => handleDecrementChange(item.id, item.quantity)}
                    _hover={{
                      bg: "gray.100",
                      transform: "scale(1.1)"
                    }}
                    transition="all 0.3s ease"
                  >
                    -
                  </Button>

                  <Box 
                    mx="2"
                    fontWeight="bold"
                    _hover={{
                      color: "blue.500"
                    }}
                    transition="all 0.3s ease"
                  >
                    {item.quantity}
                  </Box>
                  <Button
                    bg="whiteAlpha.900"
                    borderRadius="50%"
                    fontSize="20px"
                    size="md"
                    onClick={() => handleIncrementChange(item.id)}
                    _hover={{
                      bg: "gray.100",
                      transform: "scale(1.1)"
                    }}
                    transition="all 0.3s ease"
                  >
                    +
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        ))}
    </Box>
  );
};

export default CartItem;
