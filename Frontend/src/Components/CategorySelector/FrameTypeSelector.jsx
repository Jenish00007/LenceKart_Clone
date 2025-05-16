import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSelectedCategory, 
  setSelectedFrameType
} from '../../redux/slices/categorySlice';

const FrameTypeSelector = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  const frameTypes = [
    {
      id: 'rectangle',
      title: 'Rectangle Frames',
      type: 'frame'
    },
    {
      id: 'wayfarer',
      title: 'Wayfarer Frames',
      type: 'frame'
    },
    {
      id: 'round',
      title: 'Round Frames',
      type: 'frame'
    },
    {
      id: 'Aviator',
      title: 'Aviator Frames',
      type: 'frame'
    },
    {
      id: 'cat-eye',
      title: 'Cat-Eye Frames',
      type: 'frame'
    },
    {
      id: 'rimless',
      title: 'Rimless Frames',
      type: 'frame'
    },
    {
      id: 'half-rim',
      title: 'Half Rim Frames',
      type: 'frame'
    },
    {
      id: 'geometric',
      title: 'Geometric Frames',
      type: 'frame'
    }
  ];

  const handleFrameSelect = (frame) => {
    dispatch(setSelectedCategory(frame.id));
    dispatch(setSelectedFrameType(frame.id));
    navigate(`/products?frameType=${frame.id}`);
    console.log(frame.id);
  };

  return (
    <Flex direction="column">
      {frameTypes.map((frame) => (
        <Box
          key={frame.id}
          fontSize="md"
          p={1}
          cursor="pointer"
          onClick={() => handleFrameSelect(frame)}
          _hover={{ color: 'blue.500' }}
        >
          <Text
            color={selectedCategory === frame.id ? 'blue.500' : 'inherit'}
            fontWeight={selectedCategory === frame.id ? 'medium' : 'normal'}
          >
            {frame.title}
          </Text>
          {frame.price && (
            <Text
              fontSize="sm"
              color="gray.600"
              mt={0.5}
            >
              {frame.price}
            </Text>
          )}
        </Box>
      ))}
    </Flex>
  );
};

export default FrameTypeSelector; 