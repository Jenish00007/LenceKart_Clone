import React, { useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGlasses, FaDesktop, FaChild, FaEye } from "react-icons/fa";

const NavScroll = () => {
  const [activeItem, setActiveItem] = useState("EYEGLASSES");

  const items = [
    { name: "EYEGLASSES", icon: <FaGlasses />, mainCategory: "GLASSES", subCategory: "EYEGLASSES"},
    { name: "COMPUTER GLASSES", icon: <FaDesktop />, mainCategory: "GLASSES", subCategory: "COMPUTER_GLASSES"},
    { name: "KIDS GLASSES", icon: <FaChild />, mainCategory: "GLASSES", subCategory: "EYEGLASSES", personCategory: "kids" },
    { name: "CONTACT LENSES", icon: <FaEye />, mainCategory: "CONTACT_LENSES", subCategory: "CONTACT_LENSES"}
  ];

  return (
    <Box
      display={{ base: "block", xl: "none" }}
      overflowX="auto"
      whiteSpace="nowrap"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      py={2}
      px={2}
      mt={4}
    >
      <Flex gap={4}>
        {items.map((item) => {
          // Build query string dynamically
          let query = `mainCategory=${item.mainCategory}&subCategory=${item.subCategory}`;
          if (item.personCategory) {
            query += `&personCategory=${item.personCategory}`;
          }
          return (
            <Link
              to={`/products?${query}`}
              key={item.name}
            >
              <Flex
                align="center"
                position="relative"
                onClick={() => setActiveItem(item.name)}
                px={1}
                gap={2}
              >
                <Box 
                  fontSize="20px" 
                  color={activeItem === item.name ? "black" : "gray.400"}
                >
                  {item.icon}
                </Box>
                <Text
                  fontSize="12px"
                  fontWeight="500"
                  _hover={{ color: "blue.500" }}
                  minW="max-content"
                  color={activeItem === item.name ? "black" : "gray.400"}
                >
                  {item.name}
                </Text>
                {activeItem === item.name && (
                  <Box
                    position="absolute"
                    bottom="-2px"
                    left="0"
                    right="0"
                    height="2px"
                    bg="black"
                  />
                )}
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default NavScroll; 