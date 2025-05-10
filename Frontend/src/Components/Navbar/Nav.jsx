import React, { useContext, useState, useEffect } from "react";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import { AuthContext } from "../../ContextApi/AuthContext";
import { Link, Navigate } from "react-router-dom";
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
  keyframes
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavScroll from "./NavScroll";
import { CiHeart } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";

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
  const { isAuth, Authdata, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const placeholders = [
    "Search for eyeglasses...",
    "Search for sunglasses...",
    "Search for contact lenses...",
    "Search for computer glasses...",
    "Search for blue light glasses..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <Link to="/wishlist">
            <Box _hover={{ color: "blue.500" }}>
              <CiHeart size="24px" color="black" />
            </Box>
          </Link>
          <Link to="/cart">
            <Box _hover={{ color: "blue.500" }}>
              <CgShoppingCart size="24px" color="black" />
            </Box>
          </Link>
          <Button 
            bg="white" 
            onClick={onOpen}
            _hover={{ bg: "gray.100" }}
            border="1px solid"
            borderColor="gray.200"
          >
            <HamburgerIcon color="black" boxSize="20px" />
          </Button>
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
                {isAuth && Authdata && Authdata.length > 0 ? (
                  <Flex
                    borderBottom="2px solid #18CFA8"
                    p="5%"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                  >
                    <Flex w="100%">
                      <Avatar
                        src="https://bit.ly/broken-link"
                        size="lg"
                        mr="2"
                      />
                      <Flex
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Text mt="10px" fontSize="20px" color="blackAlpha.900">
                          {Authdata[0]?.first_name || "User"}
                        </Text>
                        <Text color="gray.500" mt="5%" fontSize="sm">
                          Enjoy Buy 1 Get 1 offer for 365 days
                        </Text>
                      </Flex>
                    </Flex>
                    <Button
                      w="100%"
                      h="35px"
                      mt="5%"
                      colorScheme="blue"
                      fontSize="15px"
                      _hover={{ bg: "blue.400" }}
                    >
                      GET GOLD MEMBERSHIP
                    </Button>
                  </Flex>
                ) : (
                  <Box
                    style={{
                      padding: "5%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginBottom: "-6%"
                      }}
                    >
                      <Box
                        bg="blue.500"
                        p="10px 15px"
                        rounded="lg"
                        _hover={{ bg: "blue.200" }}
                      >
                        <Login />
                      </Box>
                      <Box
                        bg="blue.500"
                        p="10px 15px"
                        rounded="lg"
                        _hover={{ bg: "blue.200" }}
                      >
                        <Signup />
                      </Box>
                    </Box>
                  </Box>
                )}
              </DrawerHeader>
              <DrawerBody borderBottomWidth="1px" bg="whiteAlpha.900">
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link to="/orderhistory">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      onClick={() => navigate("/orderhistory")}
                    >
                      My Orders
                    </Box>
                  </Link>
                  <Link to="/cart">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Cart
                    </Box>
                  </Link>
                  <Link to="/wishlist">
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Wishlist
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Manage Notification
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="1px solid white"
                      fontSize="15px"
                      p="4% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Contact Us
                    </Box>
                  </Link>
                </Box>

                <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  SHOP NOW
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Accordion defaultIndex={[0]} allowMultiple w="100%" m="auto">
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="500"
                          >
                            Men
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Link to="/products">
                          <Box>
                            <Text pb="2">EYEGLASSES</Text>
                            <Text pb="2">COMPUTER GLASSES</Text>
                            <Text pb="2">CONTACT LENSES</Text>
                            <Text pb="2">SUN GLASSES</Text>
                          </Box>
                        </Link>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="500"
                          >
                            Women
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={5}>
                        <Link to="/products">
                          <Box>
                            <Text pb="2">EYEGLASSES</Text>
                            <Text pb="2">COMPUTER GLASSES</Text>
                            <Text pb="2">CONTACT LENSES</Text>
                            <Text pb="2">SUN GLASSES</Text>
                          </Box>
                        </Link>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            fontWeight="500"
                          >
                            Kids
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Link to="/products">
                          <Box>
                            <Text pb="2">EYEGLASSES</Text>
                            <Text pb="2">COMPUTER GLASSES</Text>
                            <Text pb="2">CONTACT LENSES</Text>
                            <Text pb="2">SUN GLASSES</Text>
                          </Box>
                        </Link>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  Our Services
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      fontSize="15px"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                    >
                      Free Home Trail
                    </Box>
                  </Link>
                </Box>
                <Heading mt="15%" color="black" mb="5%" fontSize="15px">
                  HIGHLIGHTS
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Check Frame Size
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Gold Membership
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Try Frames in 3D
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="1px solid white"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Dowloads Apps
                    </Box>
                  </Link>
                </Box>
                <Heading mt="15%" color="black" fontSize="15px" mb="5%">
                  FAQ's & POLICIES
                </Heading>
                <Box display="flex" flexDirection="column" fontSize="16px">
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Frequently Asked Questions
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      borderBottom="0.1px solid gray"
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Cancellation & Return Policy
                    </Box>
                  </Link>
                  <Link>
                    <Box
                      p="5% 0%"
                      color="black"
                      _hover={{ fontWeight: "bold" }}
                      fontSize="15px"
                    >
                      Cobrowsing
                    </Box>
                  </Link>
                </Box>

                <Accordion allowMultiple></Accordion>
              </DrawerBody>
              {isAuth && (
                <DrawerFooter bg="whiteAlpha.900">
                  <LogoutButton 
                    mt="5%"
                    fontSize="18px"
                    borderBottom="1px solid #526171"
                    p="6% 15%"
                    _hover={{ bg: "blue.200" }}
                  />
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
          />
        </Flex>
      </Box>
      <NavScroll />
    </Box>
  );
}

export default Nav;
