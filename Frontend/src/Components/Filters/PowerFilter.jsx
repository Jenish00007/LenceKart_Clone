import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPower } from '../../redux/slices/filterSlice';

const PowerFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const powerOptions = [
    'Spherical - CYL',
    'Spherical + CYL',
    'Cylindrical Power',
    'Toric Power'
  ];

  const handlePowerSelect = (option) => {
    // Store in Redux
    dispatch(setPower(option));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('powerType', option.toLowerCase().replace(/\s+/g, '_'));
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
        Explore by Power
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {powerOptions.map((option) => (
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
            onClick={() => handlePowerSelect(option)}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default PowerFilter;