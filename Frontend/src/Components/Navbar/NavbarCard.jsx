import React, { useState, useEffect } from "react";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import NavbarCard5 from "./NavbarCard5";
import { NavbarDetail1 } from "./NavbarDetail";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { TriangleDownIcon, SearchIcon } from "@chakra-ui/icons";
import { keyframes } from '@emotion/react';
import { useSelector } from "react-redux";

import {
  Box,
  Text,
  Flex,
  Spacer,
  Image,
  Input,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import LogoutButton from "../LogoutButton";

const typingAnimation = keyframes`
  0% { width: 0; opacity: 0; }
  50% { opacity: 1; }
  100% { width: 100%; opacity: 0; }
`;

const slideAnimation = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  20% { transform: translateX(0); opacity: 1; }
  80% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const glowAnimation = keyframes`
  0% { text-shadow: 0 0 5px rgba(0, 0, 0, 0.2); }
  50% { text-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }
  100% { text-shadow: 0 0 5px rgba(0, 0, 0, 0.2); }
`;

export const NavbarCard1 = () => {
  return (
    <Box cursor="pointer">
      <Flex gap={2} pl={5} pt={2}>
        {NavbarDetail1.map((i, index) => (
          <Box key={index}>
            <Text fontSize="12px" _hover={{ textDecoration: "underline" }}>
              {i.labels}
            </Text>
            <Spacer />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export const NavbarCard2 = () => {
  const { isAuth, setisAuth, Authdata } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const placeholders = [
    "Search for eyeglasses...",
    "Search for sunglasses...",
    "Search for contact lenses...",
    "Search for computer glasses...",
    "Search for blue light glasses..."
  ];

  const wishlistItems = useSelector((state) => state.wishlist.wishlist || []);
  const wishlistCount = wishlistItems.length;

  const cart = useSelector((state) => state.cart.cart || []);
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <Box cursor="pointer">
      <HStack m="auto">
        <Box w="20%">
          <Link to="/">
            <Image src="https://i.imgur.com/OHxtfjd.png" alt="logo" w="50%" />
          </Link>
        </Box>
        <HStack w="85%" m="auto">
          <Box w="15%">
            <HStack fontSize="18px" fontWeight="bold">
              <FiPhoneCall />
              <Text>1800-111-111</Text>
            </HStack>
          </Box>
          <Box w="55%">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" boxSize="20px" />}
                pl="10px"
              />
              <Input
                placeholder={placeholders[currentPlaceholder]}
                border="1px solid black"
                w="95%"
                fontSize="17px"
                h="45px"
                pl="45px"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                _placeholder={{
                  animation: `${typingAnimation} 3s steps(40, end) infinite, ${slideAnimation} 3s ease-in-out infinite, ${glowAnimation} 3s ease-in-out infinite`,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  opacity: 0.8,
                  color: "gray.600"
                }}
                _focus={{
                  borderColor: "blue.400",
                  boxShadow: "0 0 0 1px blue.400"
                }}
              />
            </InputGroup>
          </Box>
          <HStack w="35%">
            <Button
              size="lg"
              bg="whiteAlpha.900"
              fontSize="14px"
              fontWeight="400"
              onClick={() => navigate("/orderhistory")}
            >
              Track Order
            </Button>
            {isAuth === true && Authdata && Authdata.length > 0 ? (
              <Popover trigger="hover">
                <PopoverTrigger>
                  <Box
                    fontWeight={"600"}
                    fontSize="15px"
                    m="auto"
                    mt="-2px"
                    w="90px"
                    textAlign="center"
                  >
                    {Authdata[0]?.first_name || "User"}
                    <TriangleDownIcon
                      ml="2px"
                      fontSize={"9px"}
                      _hover={{ transform: "rotate(180deg)" }}
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  w="120px"
                  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                >
                  <PopoverBody
                    h={"40px"}
                    pl="6"
                    fontSize="15px"
                    _hover={{ fontWeight: "bold" }}
                  >
                    <LogoutButton
                      color="#333368"
                      variant="ghost"
                      h="auto"
                      p="0"
                      fontWeight="normal"
                      fontSize="15px"
                      _hover={{ fontWeight: "bold" }}
                      customText="Sign Out"
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <Box display={"flex"}>
                <Login />
                <Signup />
              </Box>
            )}
            <Button
              leftIcon={<CiHeart color="black" size="20px" />}
              size="lg"
              bg="white"
              fontSize="14px"
              fontWeight="400"
              onClick={() => navigate("/wishlist")}
              _hover={{ bg: "gray.100" }}
              border="1px solid"
              borderColor="gray.200"
              position="relative"
            >
              Wishlist
              {wishlistCount > 0 && (
                <Box
                  position="absolute"
                  top="-8px"
                  right="-1px"
                  bg="teal.500"
                  color="white"
                  borderRadius="full"
                  minW="20px"
                    h="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                fontSize="10px"
                  zIndex={1}
                  boxShadow="md"
                  border="2px solid white"
                  transition="all 0.2s"
                  p={0}
                >
                  {wishlistCount}
                </Box>
              )}
            </Button>
            <Link to="/cart">
              <Button
                leftIcon={<CgShoppingCart color="black" size="20px" />}
                size="lg"
                bg="white"
                fontSize="14px"
                fontWeight="400"
                _hover={{ bg: "gray.100" }}
                border="1px solid"
                borderColor="gray.200"
                position="relative"
              >
                Cart
                {cartCount > 0 && (
                  <Box
                    position="absolute"
                    top="-8px"
                    right="-2px"
                    bg="teal.500"
                    color="white"
                    borderRadius="full"
                    minW="20px"
                    h="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="10px"
                    zIndex={1}
                    boxShadow="md"
                    border="2px solid white"
                    transition="all 0.2s"
                    p={0}
                  >
                    {cartCount}
                  </Box>
                )}
              </Button>
            </Link>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export const NavbarCard4 = () => {
  return (
    <Box cursor="pointer" bg="#fbf9f7" p={2.5}>
      <Flex gap={4} pl={5} pt={2} justifyContent="space-between">
        <NavbarCard5 />
        <HStack w="20%" ml="5%" justifyContent="right">
          {/* Images removed */}
        </HStack>
      </Flex>
    </Box>
  );
};