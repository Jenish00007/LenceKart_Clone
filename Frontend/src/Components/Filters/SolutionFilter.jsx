import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSolution } from '../../redux/slices/filterSlice';

const SolutionFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const solutionOptions = [
    'Small',
    'Large',
    'View all solutions'
  ];

  const handleSolutionSelect = (option) => {
    if (option === 'View all solutions') return;
    
    // Store in Redux
    dispatch(setSolution(option));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('contactLensSolutionSize', option);
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
        Solution
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {solutionOptions.map((option) => (
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
            onClick={() => handleSolutionSelect(option)}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default SolutionFilter;