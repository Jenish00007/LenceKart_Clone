import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import { setDisposability } from '../../redux/slices/filterSlice';

const DisposabilityFilter = () => {
  const dispatch = useDispatch();
  const disposability = useSelector((state) => state.filter.filters.disposability);

  const disposabilityOptions = [
    'Monthly',
    'Day & Night',
    'Daily',
    'Yearly',
    'Bi-weekly'
  ];

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
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            fontWeight={disposability === option ? "bold" : "normal"}
            onClick={() => dispatch(setDisposability(option))}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default DisposabilityFilter;