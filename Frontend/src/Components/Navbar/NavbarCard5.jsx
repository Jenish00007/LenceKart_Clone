import React, { useState, useEffect } from 'react';
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
import {
  setSelectedSubCategory,
  setPersonCategory,
  setFrameType,
  setSelectedCategoryType,
  setMasterCategory
} from '../../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import KidsGlassesSelector from "../CategorySelector/KidsGlassesSelector";
import DisposabilityFilter from '../Filters/DisposabilityFilter';
import PowerFilter from '../Filters/PowerFilter';
import ColorFilter from '../Filters/ColorFilter';
import SolutionFilter from '../Filters/SolutionFilter';
import BrandsFilter from '../Filters/BrandsFilter';

function NavbarCard5() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const personCategory = useSelector((state) => state.filter.selectedCategory);
  const frameType = useSelector((state) => state.filter.frameType);
  const selectedCategoryPrice = useSelector((state) => state.filter?.selectedCategoryType || '');
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);
  const masterCategory = useSelector((state) => state.filter.masterCategory);

  const handleSubCategorySelect = (subCategory, isSubFilter = false) => {
    dispatch(setSelectedSubCategory(subCategory));
    
    // Only update URL if it's a sub-filter click
    if (isSubFilter) {
      const queryParams = new URLSearchParams();
      
      // Map masterCategory to the correct subCategory format
      const subCategoryMap = {
        'EYEGLASSES': 'EYEGLASSES',
        'COMPUTER GLASSES': 'COMPUTER_GLASSES',
        'SUNGLASSES': 'SUNGLASSES',
        'CONTACT LENSES': 'CONTACT_LENSES'
      };

      // Map masterCategory to selectedCategoryPrice
      const selectedCategoryPriceMap = {
        'EYEGLASSES': 'classic-eyeglasses',
        'COMPUTER GLASSES': 'classic-computer-glasses',
        'SUNGLASSES': 'classic-sunglasses',
        'CONTACT LENSES': 'classic-contact-lenses'
      };
      
      // Add subCategory based on masterCategory
      queryParams.append('subCategory', subCategoryMap[masterCategory] || 'EYEGLASSES');
      
      // Add personCategory if available
      if (personCategory) {
        queryParams.append('personCategory', personCategory);
      }
      
      // Add selectedCategoryPrice based on masterCategory
      queryParams.append('selectedCategoryPrice', selectedCategoryPriceMap[masterCategory] || 'classic-eyeglasses');
      
      // Add frameType if available
      if (frameType) {
        queryParams.append('frameType', frameType);
      }
      
      navigate(`/products?${queryParams.toString()}`);
    }
  };

  // Common component for Top Picks section
  const TopPicksSection = ({ items, type, categoryType = '' }) => {
    const selectedCategoryType = useSelector((state) => state.filter.selectedCategoryType);
    const navigate = useNavigate();
    
    const handleTopPickSelect = (item) => {
      const queryParams = new URLSearchParams();
      
      // Map masterCategory to the correct subCategory format
      const subCategoryMap = {
        'EYEGLASSES': 'EYEGLASSES',
        'COMPUTER GLASSES': 'COMPUTER_GLASSES',
        'SUNGLASSES': 'SUNGLASSES',
        'CONTACT LENSES': 'CONTACT_LENSES'
      };
      
      // Map items to their corresponding topPicks values
      const topPicksMap = {
        'New Arrivals': 'new-arrivals',
        'Lenskart BLU lenses': 'blu-lenses',
        'Trending': 'trending',
        'Tinted Eyeglasses': 'tinted-eyeglasses',
        'Computer Eyeglasses': 'computer-eyeglasses',
        'Progressive Eyeglasses': 'progressive-eyeglasses',
        'Pilot Style': 'pilot-style',
        'Power Sunglasses': 'power-sunglasses',
        'Polarized Sunglasses': 'polarized-sunglasses'
      };
      
      // Add subCategory based on masterCategory
      queryParams.append('subCategory', subCategoryMap[masterCategory] || 'EYEGLASSES');
      
      // Add personCategory if available
      if (personCategory) {
        queryParams.append('personCategory', personCategory);
      }
      
      // Add topPicks based on the selected item
      queryParams.append('topPicks', topPicksMap[item] || 'best-sellers');
      
      // Add selectedCategoryPrice if available
      if (selectedCategoryPrice) {
        queryParams.append('selectedCategoryPrice', selectedCategoryPrice);
      }
      
      navigate(`/products?${queryParams.toString()}`);
    };
    
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
              onClick={() => handleTopPickSelect(item)}
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
          onClick={() => {
            dispatch(setMasterCategory('EYEGLASSES'));
            handleSubCategorySelect('EYEGLASSES');
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
          onClick={() => {
            dispatch(setMasterCategory('COMPUTER GLASSES'));
            handleSubCategorySelect('COMPUTER_GLASSES');
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
          onClick={() => {
            dispatch(setMasterCategory('SUNGLASSES'));
            handleSubCategorySelect('SUNGLASSES');
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
          onClick={() => {
            dispatch(setMasterCategory('CONTACT LENSES'));
            handleSubCategorySelect('CONTACT_LENSES');
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
                <BrandsFilter />
              </Box>
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

             
            </Grid>
          </Box>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavbarCard5;
