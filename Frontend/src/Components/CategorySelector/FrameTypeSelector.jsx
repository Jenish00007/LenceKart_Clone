import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFrameType } from '../../redux/slices/filterSlice';

const FrameTypeSelector = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.filter?.selectedCategory);
  const selectedType = useSelector((state) => state.filter?.selectedType || '');
  const selectedFrameType = useSelector((state) => state.filter?.frameType || '');
  const productType = useSelector((state) => state.filter?.productType || '');

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
      id: 'aviator',
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
    
    const queryParams = new URLSearchParams();
    if (selectedCategory) {
      queryParams.append('category', selectedCategory);
    }
    if (selectedType) {
      queryParams.append('type', selectedType);
    }
    if (productType) {
      queryParams.append('productType', productType);
    }
    queryParams.append('frameType', frame.id);
    
    navigate(`/products?${queryParams.toString()}`);
  };

  return (
    <Flex direction="column" gap={6}>
      <Box
        fontSize="md"
        fontWeight="bold"
        borderBottom="1px solid black"
        p={1}
      >
        FRAME TYPES
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {frameTypes.map((frame) => (
          <Box
            key={frame.id}
            _hover={{ fontWeight: "bold" }}
            cursor="pointer"
            fontWeight={selectedFrameType === frame.id ? "bold" : "normal"}
            onClick={() => handleFrameSelect(frame)}
          >
            {frame.title}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default FrameTypeSelector;