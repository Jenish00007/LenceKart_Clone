import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import { setSolution } from '../../redux/slices/filterSlice';

const SolutionFilter = () => {
  const dispatch = useDispatch();
  const solution = useSelector((state) => state.filter.filters.solution);

  const solutionOptions = [
    'Small',
    'Large',
    'View all solutions'
  ];

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
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            fontWeight={solution === option ? "bold" : "normal"}
            onClick={() => dispatch(setSolution(option))}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default SolutionFilter;