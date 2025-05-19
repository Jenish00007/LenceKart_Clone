import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  VStack,
  Heading,
  RadioGroup,
  Radio,
  Stack,
  Divider,
} from '@chakra-ui/react';
import {
  setDisposability,
  setPower,
  setColor,
  setSolution,
  setFilter,
} from '../redux/slices/filterSlice';

const FilterSection = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter.filters);

  const disposabilityOptions = [
    'Monthly',
    'Day & Night',
    'Daily',
    'Yearly',
    'Bi-weekly',
  ];

  const powerOptions = [
    'Spherical - CYL',
    'Spherical + CYL',
    'Cylindrical Power',
    'Toric Power',
  ];

  const colorOptions = ['Green', 'Blue', 'Brown', 'Turquoise'];
  const solutionOptions = ['Small', 'Large'];
  
  const shapeOptions = [
    'Aviator',
    'Rounders',
    'Wayfarer',
    'Rectangle',
    'Hexagon',
    'Cat-Eye',
    'Clubmaster'
  ];

  const collectionOptions = [
    'Glam Slam',
    'Havana',
    'Polarized',
    'Power Sunglasses',
    'Designer Sunglasses'
  ];

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm">
      <VStack spacing={6} align="stretch">
        {/* Shape Filter */}
        <Box>
          <Heading size="sm" mb={3}>
            Shape
          </Heading>
          <RadioGroup
            value={filters.shape}
            onChange={(value) => dispatch(setFilter({ filterType: 'shape', value }))}
          >
            <Stack direction="column" spacing={2}>
              {shapeOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Collections Filter */}
        <Box>
          <Heading size="sm" mb={3}>
            Collections
          </Heading>
          <RadioGroup
            value={filters.collection}
            onChange={(value) => dispatch(setFilter({ filterType: 'collection', value }))}
          >
            <Stack direction="column" spacing={2}>
              {collectionOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Disposability Filter */}
        <Box>
          <Heading size="sm" mb={3}>
            Explore by Disposability
          </Heading>
          <RadioGroup
            value={filters.disposability}
            onChange={(value) => dispatch(setDisposability(value))}
          >
            <Stack direction="column" spacing={2}>
              {disposabilityOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Power Filter */}
        <Box>
          <Heading size="sm" mb={3}>
            Explore by Power
          </Heading>
          <RadioGroup
            value={filters.power}
            onChange={(value) => dispatch(setPower(value))}
          >
            <Stack direction="column" spacing={2}>
              {powerOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Color Filter */}
        <Box>
          <Heading size="sm" mb={3}>
            Explore by Colors
          </Heading>
          <RadioGroup
            value={filters.color}
            onChange={(value) => dispatch(setColor(value))}
          >
            <Stack direction="column" spacing={2}>
              {colorOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Box mt={2} color="blue.500" cursor="pointer">
            View all colors
          </Box>
        </Box>

        <Divider />

        {/* Solution Filter */}
        <Box>
          <Heading size="sm" mb={3}>
            Solution
          </Heading>
          <RadioGroup
            value={filters.solution}
            onChange={(value) => dispatch(setSolution(value))}
          >
            <Stack direction="column" spacing={2}>
              {solutionOptions.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Box mt={2} color="blue.500" cursor="pointer">
            View all solutions
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default FilterSection; 