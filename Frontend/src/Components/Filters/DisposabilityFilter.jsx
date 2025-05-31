import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDisposability } from '../../redux/slices/filterSlice';

const DisposabilityFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const disposabilityOptions = [
    'Monthly',
    'Day & Night',
    'Daily',
    'Yearly',
    'Bi-weekly'
  ];

  const handleDisposabilitySelect = (option) => {
    // Store in Redux
    dispatch(setDisposability(option));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('contactLensType', option.toLowerCase().replace(/\s+/g, '_'));
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
        Explore by Disposability
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {disposabilityOptions.map((option) => (
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
            onClick={() => handleDisposabilitySelect(option)}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default DisposabilityFilter;