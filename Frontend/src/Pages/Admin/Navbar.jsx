import React, { useContext } from "react";
import {
  Text,
  Box,
  Button,
  Flex,
  Avatar,
  useToast,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  Stack,
  useMediaQuery,
  Image,
  HStack,
  Icon,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  Tooltip,
  VStack,
  Divider,
  useBreakpointValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextApi/AuthContext";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiLogOut, FiMenu, FiHome, FiSettings, FiUsers, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { isAuth, setisAuth } = useContext(AuthContext);
  const toast = useToast();

  // Responsive values
  const logoSize = useBreakpointValue({ base: "sm", md: "md" });
  const titleSize = useBreakpointValue({ base: "lg", md: "xl" });
  const subtitleSize = useBreakpointValue({ base: "xs", md: "sm" });
  const navItemSize = useBreakpointValue({ base: "sm", md: "md" });
  const iconSize = useBreakpointValue({ base: "14px", md: "16px" });
  const avatarSize = useBreakpointValue({ base: "xs", md: "sm" });
  const menuTextSize = useBreakpointValue({ base: "xs", md: "sm" });
  const menuSubtextSize = useBreakpointValue({ base: "2xs", md: "xs" });
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });
  const paddingX = useBreakpointValue({ base: 2, md: 4 });
  const spacing = useBreakpointValue({ base: 2, md: 8 });

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const handleLogout = () => {
    setisAuth(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
    toast({
      title: "Success",
      description: "You have been logged out",
      status: "success",
      duration: 1000,
      isClosable: true
    });
  };

  const NavItem = ({ icon, children, to, ...rest }) => {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Flex
          align="center"
          p={paddingX}
          mx={paddingX}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: hoverBg,
            color: 'blue.500',
          }}
          {...rest}
        >
          <Icon
            mr={paddingX}
            fontSize={iconSize}
            as={icon}
          />
          <Text fontSize={navItemSize} fontWeight="medium">{children}</Text>
        </Flex>
      </Link>
    );
  };

  const renderAuthButtons = () => {
    if (!isAuth) {
      return (
        <HStack spacing={4}>
          <Button
            as={Link}
            to="/admin/login"
            leftIcon={<FiLogIn />}
            colorScheme="blue"
            variant="outline"
            size={buttonSize}
          >
            Login
          </Button>
          <Button
            as={Link}
            to="/admin/signup"
            leftIcon={<FiUserPlus />}
            colorScheme="blue"
            size={buttonSize}
          >
            Sign Up
          </Button>
        </HStack>
      );
    }

    return (
      
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          size={buttonSize}
          px={paddingX}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: hoverBg }}
          _expanded={{ bg: hoverBg }}
          _focus={{ boxShadow: "outline" }}
        >
          <HStack>
            <Avatar size={avatarSize} src="https://bit.ly/broken-link" />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize={menuTextSize}>Admin User</Text>
              <Text fontSize={menuSubtextSize} color="gray.500">
                Administrator
              </Text>
            </VStack>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiSettings />} fontSize={menuTextSize}>Settings</MenuItem>
          <MenuItem icon={<FiUsers />} fontSize={menuTextSize}>Profile</MenuItem>
          <MenuDivider />
          <MenuItem 
            icon={<FiLogOut />} 
            onClick={handleLogout}
            color="red.500"
            fontSize={menuTextSize}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    
    <Box
      bg={bgColor}
      px={paddingX}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo and Brand */}
        <Flex 
          alignItems="center" 
          gap={paddingX} 
          as={Link} 
          to="/admin"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
        >
          <Avatar
            src="https://bit.ly/broken-link"
            size={logoSize}
            border="2px solid"
            borderColor="blue.500"
          />
          <VStack align="start" spacing={0}>
            <Text color={textColor} fontSize={titleSize} fontWeight="bold">
              Admin Dashboard
            </Text>
            <Text color="gray.500" fontSize={subtitleSize}>
              Manage your products
            </Text>
          </VStack>
        </Flex>

        {/* Desktop Navigation */}
        {isLargerThan768 ? (
          <HStack spacing={spacing} alignItems="center">
            {isAuth && (
              <>
                <NavItem icon={FiHome} to="/admin">
                  Dashboard
                </NavItem>
                <NavItem icon={FiShoppingBag} to="/admin/products">
                  Products
                </NavItem>
                <NavItem icon={FiUsers} to="/admin/users">
                  Users
                </NavItem>
              </>
            )}
            {renderAuthButtons()}
          </HStack>
        ) : (
          // Mobile Navigation
          <>
            <Button
              onClick={onOpen}
              variant="ghost"
              p={2}
              size={buttonSize}
              _hover={{ bg: hoverBg }}
            >
              <FiMenu />
            </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <Stack spacing={4}>
                    {isAuth ? (
                      <>
                        <NavItem icon={FiHome} to="/admin">Dashboard</NavItem>
                        <NavItem icon={FiShoppingBag} to="/admin/products">Products</NavItem>
                        <NavItem icon={FiUsers} to="/admin/users">Users</NavItem>
                        <Button
                          leftIcon={<FiLogOut />}
                          onClick={handleLogout}
                          colorScheme="red"
                          variant="ghost"
                          size={buttonSize}
                        >
                          Sign out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          as={Link}
                          to="/admin/login"
                          leftIcon={<FiLogIn />}
                          colorScheme="blue"
                          variant="outline"
                          size={buttonSize}
                        >
                          Login
                        </Button>
                        <Button
                          as={Link}
                          to="/admin/signup"
                          leftIcon={<FiUserPlus />}
                          colorScheme="blue"
                          size={buttonSize}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </Box>
    
  );
};

export default Navbar;
