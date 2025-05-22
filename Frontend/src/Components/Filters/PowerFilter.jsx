import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import { setPower } from '../../redux/slices/filterSlice';

const PowerFilter = () => {
  const dispatch = useDispatch();
  const power = useSelector((state) => state.filter.filters.power);

  const powerOptions = [
    'Spherical - CYL',
    'Spherical + CYL',
    'Cylindrical Power',
    'Toric Power'
  ];

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
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            fontWeight={power === option ? "bold" : "normal"}
            onClick={() => dispatch(setPower(option))}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default PowerFilter;