import React, { useContext, useState, useEffect } from "react";
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
  useToast
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
  const placeholders = [
    "Search for eyeglasses...",
    "Search for sunglasses...",
    "Search for contact lenses...",
    "Search for computer glasses...",
    "Search for blue light glasses..."
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
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
    };

    if (isAuth) {
      fetchUserData();
    }
  }, [isAuth, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleProtectedAction = (action) => {
    if (!isAuth) {
      handleAuthRedirect(navigate, `Please sign in to ${action}`);
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      display={{ lg: "inherit", xl: "none" }}
      cursor="pointer"
      bg="#fbf9f7"
      p={2.5}
    >
      <HStack m="auto" justifyContent="space-between">
        <Box w={{ lg: "20%", md: "20%", sm: "22%", base: "30%" }}>
          <Link to="/">
            <Image
              src="https://i.imgur.com/OHxtfjd.png"
              alt="logo"
              w={{ lg: "50%", md: "50%", sm: "50%", base: "50%" }}
            />
          </Link>
        </Box>
        <HStack spacing={4}>
          <Link 
            to={isAuth ? "/wishlist" : "#"} 
            onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your wishlist'))}
          >
            <Box 
              _hover={{ color: "blue.500" }}
              transition="color 0.2s"
            >
              <CiHeart size="24px" color="black" />
            </Box>
          </Link>
          <Link 
            to={isAuth ? "/cart" : "#"} 
            onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your cart'))}
          >
            <Box 
              _hover={{ color: "blue.500" }}
              transition="color 0.2s"
            >
              <CgShoppingCart size="24px" color="black" />
            </Box>
          </Link>
          {isAuth && userData ? (
            <HStack spacing={2}>
              <Avatar
                size="sm"
                name={`${userData.first_name} ${userData.last_name}`}
                src={userData.avatar || "https://bit.ly/broken-link"}
                bg="blue.500"
                color="white"
                cursor="pointer"
                onClick={onOpen}
              />
              <Text 
                fontSize="sm" 
                fontWeight="medium"
                display={{ base: "none", md: "block" }}
                cursor="pointer"
                onClick={onOpen}
              >
                {userData.first_name}
              </Text>
            </HStack>
          ) : (
            <Button 
              bg="white" 
              onClick={onOpen}
              _hover={{ bg: "gray.100" }}
              border="1px solid"
              borderColor="gray.200"
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
            <DrawerContent color="blackAlpha.900">
              <DrawerCloseButton />
              <DrawerHeader bg="whiteAlpha.900">
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
                        name={`${userData.first_name} ${userData.last_name}`}
                        src={userData.avatar || "https://bit.ly/broken-link"}
                        size="lg"
                        bg="blue.500"
                        color="white"
                      />
                      <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Text 
                          fontSize="xl" 
                          fontWeight="bold" 
                          color="gray.800"
                        >
                          {userData.first_name} {userData.last_name}
                        </Text>
                        <Text color="gray.500" fontSize="sm">
                          {userData.email}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                ) : (
                  <Box
                    p="5%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    gap={4}
                  >
                    <Text fontSize="xl" fontWeight="bold" color="gray.800">
                      Welcome to Lenskart
                    </Text>
                    <HStack spacing={4}>
                      <Button
                        bg="blue.500"
                        color="white"
                        _hover={{ bg: "blue.600" }}
                        px={6}
                        py={2}
                        borderRadius="md"
                        transition="all 0.2s"
                        onClick={onClose}
                      >
                        <Login />
                      </Button>
                      <Button
                        bg="white"
                        color="blue.500"
                        border="2px solid"
                        borderColor="blue.500"
                        _hover={{ bg: "blue.50" }}
                        px={6}
                        py={2}
                        borderRadius="md"
                        transition="all 0.2s"
                        onClick={onClose}
                      >
                        <Signup />
                      </Button>
                    </HStack>
                  </Box>
                )}
              </DrawerHeader>
              <DrawerBody borderBottomWidth="1px" bg="whiteAlpha.900">
                <VStack spacing={4} align="stretch">
                  <Heading size="sm" color="gray.600" px={2}>
                    MY ACCOUNT
                  </Heading>
                  <Box display="flex" flexDirection="column" fontSize="16px">
                    <Link 
                      to={isAuth ? "/orderhistory" : "#"} 
                      onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your orders'))}
                    >
                      <Flex
                        align="center"
                        p={3}
                        _hover={{ 
                          bg: "gray.50",
                          color: "blue.500",
                          transform: "translateX(4px)"
                        }}
                        transition="all 0.2s"
                        borderRadius="md"
                      >
                        <Icon as={FiPackage} mr={3} />
                        <Text>My Orders</Text>
                      </Flex>
                    </Link>
                    <Link 
                      to={isAuth ? "/cart" : "#"} 
                      onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your cart'))}
                    >
                      <Flex
                        align="center"
                        p={3}
                        _hover={{ 
                          bg: "gray.50",
                          color: "blue.500",
                          transform: "translateX(4px)"
                        }}
                        transition="all 0.2s"
                        borderRadius="md"
                      >
                        <Icon as={CgShoppingCart} mr={3} />
                        <Text>Cart</Text>
                      </Flex>
                    </Link>
                    <Link 
                      to={isAuth ? "/wishlist" : "#"} 
                      onClick={(e) => !isAuth && (e.preventDefault(), handleProtectedAction('view your wishlist'))}
                    >
                      <Flex
                        align="center"
                        p={3}
                        _hover={{ 
                          bg: "gray.50",
                          color: "blue.500",
                          transform: "translateX(4px)"
                        }}
                        transition="all 0.2s"
                        borderRadius="md"
                      >
                        <Icon as={CiHeart} mr={3} />
                        <Text>Wishlist</Text>
                      </Flex>
                    </Link>
                  </Box>

                  <Divider my={2} />

                  <Heading size="sm" color="gray.600" px={2}>
                    SHOP BY CATEGORY
                  </Heading>
                  <Accordion defaultIndex={[0]} allowMultiple w="100%">
                    {['Men', 'Women', 'Kids'].map((category) => (
                      <AccordionItem key={category}>
                        <h2>
                          <AccordionButton
                            _hover={{ bg: "gray.50" }}
                            p={3}
                            transition="all 0.2s"
                          >
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontWeight="500"
                            >
                              {category}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <VStack align="stretch" spacing={2} pl={4}>
                            {['EYEGLASSES', 'COMPUTER GLASSES', 'CONTACT LENSES', 'SUN GLASSES'].map((item) => {
                              const subCategoryMap = {
                                'EYEGLASSES': 'EYEGLASSES',
                                'COMPUTER GLASSES': 'COMPUTER_GLASSES',
                                'CONTACT LENSES': 'CONTACT_LENSES',
                                'SUN GLASSES': 'SUNGLASSES'
                              };
                              const mainCategoryMap = {
                                'EYEGLASSES': 'GLASSES',
                                'COMPUTER GLASSES': 'GLASSES',
                                'CONTACT LENSES': 'CONTACT_LENSES',
                                'SUN GLASSES': 'GLASSES'
                              };
                              // Map personCategory to backend enum
                              const personCategoryMap = {
                                'Men': 'men',
                                'Women': 'women',
                                'Kids': 'kids'
                              };
                              return (
                                <Link
                                  key={item}
                                  to={`/products?mainCategory=${mainCategoryMap[item]}&subCategory=${subCategoryMap[item]}&personCategory=${personCategoryMap[category]}`}
                                >
                                  <Text
                                    p={2}
                                    _hover={{ 
                                      color: "blue.500",
                                      transform: "translateX(4px)"
                                    }}
                                    transition="all 0.2s"
                                  >
                                    {item}
                                  </Text>
                                </Link>
                              );
                            })}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <Divider my={2} />

                  <Heading size="sm" color="gray.600" px={2}>
                    HELP & SUPPORT
                  </Heading>
                  <VStack align="stretch" spacing={2}>
                    {[
                      'Free Home Trial',
                      'Check Frame Size',
                      'Gold Membership',
                      'Try Frames in 3D',
                      'Download Apps'
                    ].map((item) => (
                      <Link key={item}>
                        <Flex
                          align="center"
                          p={3}
                          _hover={{ 
                            bg: "gray.50",
                            color: "blue.500",
                            transform: "translateX(4px)"
                          }}
                          transition="all 0.2s"
                          borderRadius="md"
                        >
                          <Text>{item}</Text>
                        </Flex>
                      </Link>
                    ))}
                  </VStack>
                </VStack>
              </DrawerBody>
              {isAuth && (
                <DrawerFooter bg="whiteAlpha.900" borderTop="1px solid" borderColor="gray.200">
                  <Button
                    w="100%"
                    colorScheme="red"
                    variant="ghost"
                    leftIcon={<Icon as={FiLogOut} />}
                    onClick={handleLogout}
                    _hover={{ bg: "red.50" }}
                    transition="all 0.2s"
                  >
                    Logout
                  </Button>
                </DrawerFooter>
              )}
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

export default Nav;