import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../redux/slices/filterSlice';

const ColorFilter = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const colorOptions = [
    'Blue',
    'Green',
    'Brown',
    'Turquoise',
    'View all colors'
  ];

  const handleColorSelect = (color) => {
    // Store in Redux
    dispatch(setFilter({ color }));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('contactLensColors', color);
    navigate(`/products?${queryParams.toString()}`);
    
    // Close the menu
    onClose?.();
  };

  return (
    <Flex direction="column" gap="6" pl={6}>
      <Box
        fontSize="md"
        fontWeight="bold"
        borderBottom="1px solid black"
        p="1"
      >
        Color
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {colorOptions.map((color, index) => (
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
            onClick={() => handleColorSelect(color)}
          >
            {color}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ColorFilter;