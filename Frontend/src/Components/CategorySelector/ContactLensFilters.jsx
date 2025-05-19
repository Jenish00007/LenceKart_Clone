import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/slices/filterSlice';

const ContactLensFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter.filters);

  const filterOptions = {
    disposability: ['Monthly', 'Day & Night', 'Daily', 'Yearly', 'Bi-weekly'],
    power: ['Spherical - CYL', 'Spherical + CYL', 'Cylindrical Power', 'Toric Power'],
    color: ['Green', 'Blue', 'Brown', 'Turquoise'],
    solution: ['Small', 'Large', 'View all solutions']
  };

  const handleFilterSelect = (filterType, value) => {
    dispatch(setFilter({ filterType, value }));
  };

  const renderFilterSection = (title, options, filterType) => (
    <Box mb={4}>
      <Text fontWeight="bold" mb={2} borderBottom="1px solid" borderColor="gray.200" pb={1}>
        {title}
      </Text>
      <VStack align="stretch" spacing={1}>
        {options.map((option) => (
          <Button
            key={option}
            variant="ghost"
            justifyContent="flex-start"
            size="sm"
            colorScheme={filters[filterType] === option ? 'blue' : 'gray'}
            onClick={() => handleFilterSelect(filterType, option)}
            _hover={{ bg: 'gray.100' }}
          >
            {option}
          </Button>
        ))}
      </VStack>
    </Box>
  );

  return (
    <Box p={4}>
      {renderFilterSection('Explore by Disposability', filterOptions.disposability, 'disposability')}
      {renderFilterSection('Explore by Power', filterOptions.power, 'power')}
      {renderFilterSection('Explore by Colors', filterOptions.color, 'color')}
      {renderFilterSection('Solution', filterOptions.solution, 'solution')}
    </Box>
  );
};

export default ContactLensFilters; 