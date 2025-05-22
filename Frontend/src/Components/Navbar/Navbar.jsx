import React from "react";
import { Box } from "@chakra-ui/react";
import { NavbarCard1, NavbarCard2, NavbarCard4 } from "./NavbarCard";
import Nav from "./Nav";

const Navbar = () => {
  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0"
      right="0"
      zIndex="1000" 
      bg="white"
      boxShadow="sm"
      width="100%"
    >
      <Box overflow="hidden" bg="white" width="100%">
        <Box display={{ base: "none", xl: "inherit" }} color="blackAlpha.800">
          <NavbarCard1 />
          <NavbarCard2 />
          <NavbarCard4 />
        </Box>
        <Nav />
      </Box>
    </Box>
  );
};

export default Navbar;
