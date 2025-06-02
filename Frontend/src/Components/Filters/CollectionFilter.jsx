import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import { setFilter } from '../../redux/slices/filterSlice';

const CollectionFilter = () => {
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.filter.filters.collection);

  const collectionOptions = [
    'Glam Slam',
    'Havana',
    'Polarized',
    'Power Sunglasses',
    'Designer Sunglasses'
  ];

  return (
    <Flex direction="column" gap="6">
      <Box
        fontSize="md"
        fontWeight="bold"
        borderBottom="1px solid black"
        p="1"
      >
        Collections
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {collectionOptions.map((option) => (
          <Box
            key={option}
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            fontWeight={collection === option ? "bold" : "normal"}
            onClick={() => dispatch(setFilter({ filterType: 'collection', value: option }))}
          >
            {option}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default CollectionFilter;