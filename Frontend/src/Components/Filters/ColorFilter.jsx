import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import { setColor } from '../../redux/slices/filterSlice';

const ColorFilter = () => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.filter.filters.color);

  const colorOptions = [
    'Green',
    'Blue',
    'Brown',
    'Turquoise',
    'View all colors'
  ];

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
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            fontWeight={color === option ? "bold" : "normal"}
            onClick={() => dispatch(setColor(option))}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default ColorFilter;