import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setColor } from '../../redux/slices/filterSlice';

const ColorFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const colorOptions = [
    'Green',
    'Blue',
    'Brown',
    'Turquoise',
    'View all colors'
  ];

  const handleColorSelect = (option) => {
    if (option === 'View all colors') return;
    
    // Store in Redux
    dispatch(setColor(option));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('contactLensColors', option);
    navigate(`/products?${queryParams.toString()}`);
  };

  return (
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
        {colorOptions.map((option) => (
          <Box
            key={option}
            _hover={{ 
              bg: "gray.100",
              color: "teal.500",
              transform: "translateX(5px)",
              transition: "all 0.2s ease-in-out"
            }}
            cursor="pointer"
            p="2"
            borderRadius="md"
            onClick={() => handleColorSelect(option)}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ColorFilter;