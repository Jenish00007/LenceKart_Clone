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
import { setSelectedSubCategory, setSelectedType,} from '../../redux/slices/filterSlice';
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
 
  const personCategory = useSelector((state) => state.filter.selectedCategory);
  const frameType = useSelector((state) => state.filter.frameType);
  const selectedCategoryPrice = useSelector((state) => state.filter?.selectedCategoryType || '');
  const handleSubCategorySelect = (subCategory, type = '', categoryType = '') => {
    dispatch(setSelectedSubCategory(subCategory));
    if (type) {
      dispatch(setSelectedType(type));
    }
   
   
    const queryParams = new URLSearchParams();
    queryParams.append('topPicks', subCategory.toLowerCase().replace(/ /g, '-'));
    if (type) {
      queryParams.append('masterCategory', type);
    }
    if (personCategory) {
      queryParams.append('personCategory', personCategory);
    }
    if (frameType) {
      queryParams.append('frameType', frameType);
    }
    if (selectedCategoryPrice) {
      queryParams.append('selectedCategoryPrice', selectedCategoryPrice);
    }
    navigate(`/products?${queryParams.toString()}`);
  };

  // Common component for Top Picks section
  const TopPicksSection = ({ items, type, categoryType = '' }) => {
    const selectedCategoryType = useSelector((state) => state.filter.selectedCategoryType);
    
    return (
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
            _hover={{ 
              bg: "gray.100",
              color: "teal.500",
              transform: "translateX(5px)",
              transition: "all 0.2s ease-in-out"
            }}
            cursor="pointer"
            p="2"
            borderRadius="md"
            onClick={() => handleSubCategorySelect(item, type, selectedCategoryType)}
          >
            {item}
          </Box>
          ))}
        </Flex>
      </Flex>
    );
  };

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
          pb="5"
        >
          <Box>
            <Grid gridTemplateColumns="repeat(4, 1fr)" w="100%" gap={5}>
              <Box mt="10">
                <CategorySelector />
              </Box>

              <Box>
                <SelectCategory />
              </Box>

              <TopPicksSection 
                items={eyeglassTopPicks} 
                type="eyeglasses"
              />

              <Flex direction="column" gap="6">
                <FrameTypeSelector />
              </Flex>
            </Grid>
          </Box>
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
          <Box>
            <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
              <Box mt="20">
                <CategorySelector />
              </Box>

              <Box>
              <SelectCategory />
              </Box>

              <TopPicksSection 
                items={computerGlassTopPicks} 
                type="computer-glasses"
              />

              <Flex direction="column" gap="6">
                <FrameTypeSelector />
              </Flex>
            </Grid>
          </Box>
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
          SUNGLASSES
        </MenuButton>

        <MenuList
          color="blackAlpha.900"
          h="400px"
          bg="whiteAlpha.800"
          w="100%"
          p="5"
        >
          <Box>
            <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
              <Box mt="20">
                <CategorySelector />
              </Box>

              <Box>
              <SelectCategory />
              </Box>

              <TopPicksSection 
                items={sunglassTopPicks} 
                type="sunglasses"
              />

              <Flex direction="column" gap="6">
                <FrameTypeSelector />
              </Flex>
            </Grid>
          </Box>
        </MenuList>
      </Menu>

      {/* <Menu>
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
          h="400px"
          bg="whiteAlpha.800"
          w="100%"
          p="5"
        >
          <Box>
            <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
              <Box mt="20">
                <CategorySelector />
              </Box>

              <Box>
              <SelectCategory />
              </Box>

              <TopPicksSection 
                items={sunglassTopPicks} 
                type="sunglasses"
              />

              <Flex direction="column" gap="6">
                <FrameTypeSelector />
              </Flex>
            </Grid>
          </Box>
        </MenuList>
      </Menu> */}

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
          w="100%"
          p="5"
        >
          <Box>
            <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%" gap={4}>
              <Box>
                <DisposabilityFilter />
              </Box>

              <Box>
                <PowerFilter />
              </Box>

              <Box>
                <ColorFilter />
              </Box>

              <Box>
                <SolutionFilter />
              </Box>

              <Box>
                <CollectionFilter />
              </Box>
            </Grid>
          </Box>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavbarCard5;
