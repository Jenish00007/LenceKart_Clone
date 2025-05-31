import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../redux/slices/filterSlice';

const DisposabilityFilter = ({ onClose }) => {
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
    dispatch(setFilter({ disposability: option }));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('contactLensType', option);
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
        Disposability
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {disposabilityOptions.map((option, index) => (
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