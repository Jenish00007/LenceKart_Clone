import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Image,
  Heading,
  Box,
  Button,
  Flex,
  Text,
  Grid,
  Menu,
  MenuButton,
  MenuList
} from "@chakra-ui/react";
import CategorySelector from "../CategorySelector/CategorySelector";
import SelectCategory from "../CategorySelector/SelectCategory";
import ComputerSelectCategory from "../CategorySelector/ComputerSelectCategory";
import SunglassesSelectCategory from "../CategorySelector/SunglassesSelectCategory";
import FrameTypeSelector from "../CategorySelector/FrameTypeSelector";
import "../../App.css";

function NavbarCard5() {
  return (
    <Flex bg="#fbf9f7" cursor="pointer" gap="6">
      <Menu>
        <MenuButton
          bg="#fbf9f7"
          fontSize="15px"
          fontWeight="600"
          _hover={{
            borderBottom: "4px solid teal"
          }}
        >
          EYEGLASSES
        </MenuButton>

        <MenuList
          color="blackAlpha.900"
          h="400px"
          bg="whiteAlpha.800"
          w="100%"
          p="5"
        >
          <Link to="/products">
            <Box>
              <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
                <Box mt="20">
                  <CategorySelector />
                </Box>

                <Box>
                  <SelectCategory />
                </Box>

                <Flex direction="column" gap="6" pl={6}>
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Our Top Picks
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>New Arrivals</Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      Lenskart BLU lenses
                    </Box>
                    <Box _hover={{ fontWeight: "bold" }}>Trending</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Tinted Eyeglasses</Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      Computer Eyeglasses
                    </Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      Progressive Eyeglasses
                    </Box>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Frame Type
                  </Box>
                  <FrameTypeSelector />
                </Flex>

               {/*   <Flex direction="column" gap="6">
                 <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Brands
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>Vincent Chase</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Lenskart Air</Box>
                    <Box _hover={{ fontWeight: "bold" }}>f Jacobs</Box>
                    <Box _hover={{ fontWeight: "bold" }}>OJOS</Box>
                    <Box _hover={{ fontWeight: "bold" }}>New Balance</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Carrera</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Fossil</Box>
                  </Flex>
                </Flex> */}
              </Grid>
            </Box>
          </Link>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          bg="#fbf9f7"
          fontSize="15px"
          fontWeight="600"
          _hover={{
            borderBottom: "4px solid teal"
          }}
        >
          COMPUTER GLASSES
        </MenuButton>

        <MenuList
          color="blackAlpha.900"
          h="400px"
          bg="whiteAlpha.800"
          w="100%"
          p="5"
        >
          <Link to="/products">
            <Box>
              <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
                <Box mt="20">
                  <CategorySelector />
                </Box>

                <Box>
                  <ComputerSelectCategory />
                </Box>

                <Flex direction="column" gap="6" pl={6}>
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Our Top Picks
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>New Arrivals</Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      Lenskart BLU lenses
                    </Box>
                    <Box _hover={{ fontWeight: "bold" }}>Trending</Box>
                  </Flex>
                </Flex>
              </Grid>
            </Box>
          </Link>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          bg="#fbf9f7"
          fontSize="15px"
          fontWeight="600"
          _hover={{
            borderBottom: "4px solid teal"
          }}
        >
          KIDS GLASSES
        </MenuButton>

        <MenuList
          color="blackAlpha.900"
          h="100%"
          bg="whiteAlpha.800"
          w="100%"
          p="2"
        >
          <Link to="/products">
            <Box>
              <Grid
                gridTemplateColumns="repeat(3, 1fr)"
                justifyContent="center"
                p="5"
              >
                <Box bg="whiteAlpha.900" h="250px" w="240px">
                  <img
                    className="navImg1"
                    src="https://static1.lenskart.com/media/desktop/img/May22/glasses.jpg"
                    alt="kidsIcon_1"
                  />
                  <Box mt="10px" textAlign="center" fontSize="lg">
                    Eye Glasses
                  </Box>
                </Box>
                <Box bg="whiteAlpha.900" h="250px" w="240px">
                  <img
                    className="navImg2"
                    src="https://static1.lenskart.com/media/desktop/img/May22/computer-glasses.jpg"
                    alt="kidsIcon_2"
                  />
                  <Box mt="10px" textAlign="center" fontSize="lg">
                    Zero Power Computer Glasses
                  </Box>
                </Box>
                <Box bg="whiteAlpha.900" h="250px" w="240px">
                  <img
                    className="navImg2"
                    src="https://static1.lenskart.com/media/desktop/img/May22/Sunnies.jpg"
                    alt="kidsIcon_3"
                  />
                  <Box mt="10px" textAlign="center" fontSize="lg">
                    Sun Glasses
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Link>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          bg="#fbf9f7"
          fontSize="15px"
          fontWeight="600"
          _hover={{
            borderBottom: "4px solid teal"
          }}
        >
          CONTACT LENSES
        </MenuButton>

        <MenuList
          color="blackAlpha.900"
          h="400px"
          bg="whiteAlpha.800"
          p="5"
          w="100%"
        >
          <Link to="/newproduct">
            <Box>
              <Grid gridTemplateColumns="repeat(5, 1fr)" p="1" w="100%">
                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Explore by Disposability
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}> Monthly</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Day & Night</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Daily</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Yearly</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Bi-weekly</Box>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Explore by Power
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>Spherical - CYL</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Spherical + CYL</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Cylindrical Power</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Toric Power</Box>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Explore by Colors
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>Green</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Blue</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Brown</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Turquoise</Box>
                    <Box _hover={{ fontWeight: "bold" }}>View all colors</Box>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Solution
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>Small</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Large</Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      View all solutions
                    </Box>
                  </Flex>
                </Flex>
              </Grid>
            </Box>
          </Link>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          bg="#fbf9f7"
          fontSize="15px"
          fontWeight="600"
          _hover={{
            borderBottom: "4px solid teal"
          }}
        >
          SUN GLASSES
        </MenuButton>

        <MenuList
          color="blackAlpha.900"
          h="400px"
          bg="whiteAlpha.800"
          w="100%"
          p="5"
        >
          <Link to="/products">
            <Box>
              <Grid gridTemplateColumns="repeat(5, 1fr)">
                <Box mt="20">
                  <CategorySelector />
                </Box>

                <Box>
                  <SunglassesSelectCategory />
                </Box>

                <Flex direction="column" gap="6" pl={6}>
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Our Top Picks
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>New Arrivals</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Pilot Style</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Power Sunglasses</Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      Polarized Sunglasses
                    </Box>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Shape
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>Aviator</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Rounders</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Wayfarer</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Rectangle</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Hexagon</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Cat-Eye</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Clubmaster</Box>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="6">
                  <Box
                    fontSize="md"
                    fontWeight="bold"
                    borderBottom="1px solid black"
                    p="1"
                  >
                    Collections
                  </Box>
                  <Flex direction="column" fontSize="md" gap="2">
                    <Box _hover={{ fontWeight: "bold" }}>Glam Slam</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Havana</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Polarized</Box>
                    <Box _hover={{ fontWeight: "bold" }}>Power Sunglasses</Box>
                    <Box _hover={{ fontWeight: "bold" }}>
                      Designer Sunglasses
                    </Box>
                  </Flex>
                </Flex>
              </Grid>
            </Box>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
}
export default NavbarCard5;
