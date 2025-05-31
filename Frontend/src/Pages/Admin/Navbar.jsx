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
import { FiShoppingBag, FiLogOut, FiMenu, FiHome, FiSettings, FiUsers } from 'react-icons/fi';

const Navbar = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { setisAuth } = useContext(AuthContext);
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

  const handleClick = () => {
    setisAuth(false);
    navigate("/");
    localStorage.removeItem("token");
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
        <Flex alignItems="center" gap={paddingX}>
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
            <NavItem icon={FiHome} to="/admin">
              Dashboard
            </NavItem>
            <NavItem icon={FiShoppingBag} to="/admin/products">
              Products
            </NavItem>
            <NavItem icon={FiUsers} to="/admin/users">
              Users
            </NavItem>

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
                  onClick={handleClick}
                  color="red.500"
                  fontSize={menuTextSize}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
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
              <Icon as={FiMenu} w={5} h={5} />
            </Button>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  <Flex alignItems="center" gap={paddingX}>
                    <Avatar size={avatarSize} src="https://bit.ly/broken-link" />
                    <VStack align="start" spacing={0}>
                      <Text fontSize={menuTextSize} fontWeight="bold">Admin User</Text>
                      <Text fontSize={menuSubtextSize} color="gray.500">Administrator</Text>
                    </VStack>
                  </Flex>
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing={4} mt={4}>
                    <NavItem icon={FiHome} to="/admin">
                      Dashboard
                    </NavItem>
                    <NavItem icon={FiShoppingBag} to="/admin/products">
                      Products
                    </NavItem>
                    <NavItem icon={FiUsers} to="/admin/users">
                      Users
                    </NavItem>
                    <NavItem icon={FiSettings} to="/admin/settings">
                      Settings
                    </NavItem>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button
                    leftIcon={<FiLogOut />}
                    colorScheme="red"
                    variant="outline"
                    onClick={handleClick}
                    w="full"
                    size={buttonSize}
                  >
                    Sign out
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
