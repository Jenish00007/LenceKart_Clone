import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../redux/slices/filterSlice';

const SolutionFilter = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const solutionOptions = [
    'Small',
    'Large',
    'View all solutions'
  ];

  const handleSolutionSelect = (size) => {
    // Store in Redux
    dispatch(setFilter({ solutionSize: size }));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('contactLensSolutionSize', size);
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
        Solution Size
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {solutionOptions.map((size, index) => (
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
            onClick={() => handleSolutionSelect(size)}
          >
            {size}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default SolutionFilter;