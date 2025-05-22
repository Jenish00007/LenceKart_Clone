import React, { useContext, useState, useEffect, useCallback } from "react";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import { AuthContext } from "../../ContextApi/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import LogoutButton from "../LogoutButton";
import {
  DrawerCloseButton,
  Button,
  Box,
  useDisclosure,
  HStack,
  Image,
  Input,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  Heading,
  Avatar,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Badge,
  VStack,
  Divider,
  Icon,
  useToast,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Tooltip
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import NavScroll from "./NavScroll";
import { CiHeart } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { FiPackage, FiLogOut } from "react-icons/fi";
import { API_URL } from "../../config";
import { handleAuthRedirect } from '../../utils/auth';

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

function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const { isAuth, authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const placeholders = [
    "Search for eyeglasses...",
    "Search for sunglasses...",
    "Search for contact lenses...",
    "Search for computer glasses...",
    "Search for blue light glasses..."
  ];

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/user/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        const currentUser = data.find(user => user._id === JSON.parse(atob(token.split('.')[1])).id);
        if (currentUser) {
          setUserData(currentUser);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    if (isAuth) {
      fetchUserData();
    }
  }, [isAuth, fetchUserData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = useCallback((e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  }, [searchQuery, navigate]);

  const handleProtectedAction = useCallback((action) => {
    if (!isAuth) {
      handleAuthRedirect(navigate, `Please sign in to ${action}`);
      return false;
    }
    return true;
  }, [isAuth, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    onClose();
    navigate('/');
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [logout, onClose, navigate, toast]);

  return (
    <Box
      display={{ lg: "inherit", xl: "none" }}
      cursor="pointer"
      bg={bgColor}
      p={2.5}
      transition="all 0.3s ease"
    >
      <HStack m="auto" justifyContent="space-between">
        <Box w={{ lg: "20%", md: "20%", sm: "22%", base: "30%" }}>
          <Link to="/">
            <Image
              src="https://i.imgur.com/OHxtfjd.png"
              alt="LenceKart Logo"
              w={{ lg: "50%", md: "50%", sm: "50%", base: "50%" }}
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Link>
        </Box>
        <HStack spacing={4}>
          <Tooltip label="Wishlist" placement="bottom">
            <Link 
              to={isAuth ? "/wishlist" : "#"} 
              onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your wishlist'))}
            >
              <Box 
                _hover={{ color: "blue.500", transform: "scale(1.1)" }}
                transition="all 0.2s"
              >
                <CiHeart size="24px" color="black" />
              </Box>
            </Link>
          </Tooltip>
          <Tooltip label="Cart" placement="bottom">
            <Link 
              to={isAuth ? "/cart" : "#"} 
              onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your cart'))}
            >
              <Box 
                _hover={{ color: "blue.500", transform: "scale(1.1)" }}
                transition="all 0.2s"
              >
                <CgShoppingCart size="24px" color="black" />
              </Box>
            </Link>
          </Tooltip>
          {isAuth && userData ? (
            <HStack spacing={2}>
              <Tooltip label="Account" placement="bottom">
                <Avatar
                  size="sm"
                  name={`${userData.first_name} ${userData.last_name}`}
                  src={userData.avatar || "https://bit.ly/broken-link"}
                  bg="blue.500"
                  color="white"
                  cursor="pointer"
                  onClick={onOpen}
                  transition="transform 0.2s"
                  _hover={{ transform: "scale(1.1)" }}
                />
              </Tooltip>
              <Text 
                fontSize="sm" 
                fontWeight="medium"
                display={{ base: "none", md: "block" }}
                cursor="pointer"
                onClick={onOpen}
                _hover={{ color: "blue.500" }}
                transition="color 0.2s"
              >
                {userData.first_name}
              </Text>
            </HStack>
          ) : (
            <Button 
              bg={bgColor}
              onClick={onOpen}
              _hover={{ bg: hoverBg }}
              border="1px solid"
              borderColor={borderColor}
              transition="all 0.2s"
            >
              <HamburgerIcon color="black" boxSize="20px" />
            </Button>
          )}
          <Drawer
            size="xs"
            isOpen={isOpen}
            placement="right"
            initialFocusRef={firstField}
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent bg={bgColor}>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
                {isAuth && userData ? (
                  <Flex
                    borderBottom="2px solid #18CFA8"
                    p="5%"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                  >
                    <Flex w="100%" align="center" gap={4}>
                      <Avatar
                        size="lg"
                        name={`${userData.first_name} ${userData.last_name}`}
                        src={userData.avatar || "https://bit.ly/broken-link"}
                        bg="blue.500"
                        color="white"
                      />
                      <VStack align="start" spacing={1}>
                        <Heading size="md">
                          {userData.first_name} {userData.last_name}
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                          {userData.email}
                        </Text>
                      </VStack>
                    </Flex>
                  </Flex>
                ) : (
                  <Heading size="md">Menu</Heading>
                )}
              </DrawerHeader>
              <DrawerBody>
                {isAuth ? (
                  <VStack spacing={4} align="stretch">
                    <Button
                      leftIcon={<FiPackage />}
                      variant="ghost"
                      justifyContent="flex-start"
                      onClick={() => {
                        navigate("/orderhistory");
                        onClose();
                      }}
                    >
                      My Orders
                    </Button>
                    <Button
                      leftIcon={<FiLogOut />}
                      variant="ghost"
                      justifyContent="flex-start"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </VStack>
                ) : (
                  <VStack spacing={4}>
                    <Login />
                    <Signup />
                  </VStack>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
      </HStack>
      <Box w="100%" mt={2}>
        <Flex position="relative" align="center">
          <Input
            placeholder={placeholders[currentPlaceholder]}
            border="1px solid black"
            w="100%"
            fontSize="16px"
            h="35px"
            pl="40px"
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
          <SearchIcon 
            position="absolute" 
            left="10px" 
            color="gray.500"
            boxSize="20px"
            _hover={{ color: "blue.400" }}
            transition="color 0.2s"
          />
        </Flex>
      </Box>
      <NavScroll />
    </Box>
  );
}

export default React.memo(Nav);
