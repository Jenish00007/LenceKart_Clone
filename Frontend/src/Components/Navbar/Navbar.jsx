import React, { memo } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { NavbarCard1, NavbarCard2, NavbarCard4 } from "./NavbarCard";
import Nav from "./Nav";

const Navbar = memo(() => {
  const bgColor = useColorModeValue("white", "gray.800");
  const shadowColor = useColorModeValue("sm", "dark-lg");

  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0"
      right="0"
      zIndex="1000" 
      bg={bgColor}
      boxShadow={shadowColor}
      width="100%"
      transition="all 0.3s ease"
    >
      <Box 
        overflow="hidden" 
        bg={bgColor} 
        width="100%"
        transition="all 0.3s ease"
      >
        <Box 
          display={{ base: "none", xl: "inherit" }} 
          color="blackAlpha.800"
          transition="all 0.3s ease"
        >
          <NavbarCard1 />
          <NavbarCard2 />
          <NavbarCard4 />
        </Box>
        <Nav />
      </Box>
    </Box>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
