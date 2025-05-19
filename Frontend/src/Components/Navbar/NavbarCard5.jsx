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
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubCategory } from '../../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import KidsGlassesSelector from "../CategorySelector/KidsGlassesSelector";
import DisposabilityFilter from '../Filters/DisposabilityFilter';
import PowerFilter from '../Filters/PowerFilter';
import ColorFilter from '../Filters/ColorFilter';
import SolutionFilter from '../Filters/SolutionFilter';
import CollectionFilter from '../Filters/CollectionFilter';

function NavbarCard5() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSubCategory = useSelector((state) => state.filter.selectedSubCategory);

  const handleSubCategorySelect = (subCategory, type = '') => {
    dispatch(setSelectedSubCategory(subCategory));
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory.toLowerCase().replace(/ /g, '-'));
    if (type) {
      queryParams.append('type', type);
    }
    navigate(`/products?${queryParams.toString()}`);
  };

  // Common component for Top Picks section
  const TopPicksSection = ({ items, type }) => (
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
        {items.map((item, index) => (
          <Box
            key={index}
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            onClick={() => handleSubCategorySelect(item, type)}
          >
            {item}
          </Box>
        ))}
      </Flex>
    </Flex>
  );

  const eyeglassTopPicks = [
    'New Arrivals',
    'Lenskart BLU lenses',
    'Trending',
    'Tinted Eyeglasses',
    'Computer Eyeglasses',
    'Progressive Eyeglasses'
  ];

  const computerGlassTopPicks = [
    'New Arrivals',
    'Lenskart BLU lenses',
    'Trending'
  ];

  const sunglassTopPicks = [
    'New Arrivals',
    'Pilot Style',
    'Power Sunglasses',
    'Polarized Sunglasses'
  ];

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
          <Link to="/">
            <Box>
              <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
                <Box mt="20">
                  <CategorySelector />
                </Box>

                <Box>
                  <SelectCategory />
                </Box>

                <TopPicksSection items={eyeglassTopPicks} type="eyeglasses" />

                <Flex direction="column" gap="6">

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

                <TopPicksSection items={computerGlassTopPicks} type="computer-glasses" />
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
              <KidsGlassesSelector />
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
          <Link >
            <Box>
              <Grid gridTemplateColumns="repeat(4, 1fr)" p="1" w="100%">
                <DisposabilityFilter />
                <PowerFilter />
                <ColorFilter />
                <SolutionFilter />
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

                <TopPicksSection items={sunglassTopPicks} type="sunglasses" />

                <Flex direction="column" gap="6">
                  <FrameTypeSelector />
                </Flex>

                <CollectionFilter />
              </Grid>
            </Box>
          </Link>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavbarCard5;
