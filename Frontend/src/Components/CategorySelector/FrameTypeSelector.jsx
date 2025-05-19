import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFrameType } from '../../redux/slices/filterSlice';

const FrameTypeSelector  = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedCategory = useSelector((state) => state.filter?.selectedCategory);
  const selectedType = useSelector((state) => state.filter?.selectedType || '');
  const selectedFrameType = useSelector((state) => state.filter?.frameType || '');
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
    if (!frame?.id) return;
    dispatch(setFrameType(frame.id));
    console.log('Selected subcategory:', selectedType);
    console.log('Selected catgory:', selectedCategory);
    console.log('Selected frame:', selectedFrameType);
    navigate(`/products?frameType=${frame.id}`);
  };

  return (
    <Flex direction="column">
      <Box
        fontSize="md"
        fontWeight="bold"
        borderBottom="1px solid black"
        p={1}
        mb={2}
      >
        FRAME TYPES
      </Box>
      {frameTypes.map((frame) => (
        <Box
          key={frame.id}
          fontSize="md"
          p={1}
          cursor="pointer"
          onClick={() => handleFrameSelect(frame)}
          onMouseEnter={() => frame?.id && dispatch(setFrameType(frame.id))}
          _hover={{ color: 'blue.500' }}
        >
          <Text
            color={selectedFrameType === frame.id ? 'blue.500' : 'inherit'}
            fontWeight={selectedFrameType === frame.id ? 'medium' : 'normal'}
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