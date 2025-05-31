import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFrameType } from '../../redux/slices/filterSlice';

const FrameTypeSelector = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const selectedCategoryPrice = useSelector((state) => state.filter?.selectedCategoryType || '');
  const selectedFrameType = useSelector((state) => state.filter?.frameType || '');
  const personCategory = useSelector((state) => state.filter.selectedCategory);
  const masterCategory = useSelector((state) => state.filter?.masterCategory || '');

  const frameTypes = [
    {
      id: 'Rectange',
      title: 'Rectangle Frames',
      type: 'frame'
    },
    {
      id: 'Round',
      title: 'Round Frames',
      type: 'frame'
    },
    {
      id: 'Aviator',
      title: 'Aviator Frames',
      type: 'frame'
    },
    {
      id: 'Cat-Eye',
      title: 'Cat-Eye Frames',
      type: 'frame'
    },
    {
      id: 'Rimless',
      title: 'Rimless Frames',
      type: 'frame'
    },
    {
      id: 'Half Rim',
      title: 'Half Rim Frames',
      type: 'frame'
    },
    {
      id: 'Geometric',
      title: 'Geometric Frames',
      type: 'frame'
    }
  ];

  const handleFrameSelect = (frame) => {
    if (!frame?.id) return;
    dispatch(setFrameType(frame.id));
      
    const queryParams = new URLSearchParams();

    // Map masterCategory to the correct subCategory format
    const subCategoryMap = {
      'EYEGLASSES': 'EYEGLASSES',
      'COMPUTER GLASSES': 'COMPUTER_GLASSES',
      'SUNGLASSES': 'SUNGLASSES',
      'CONTACT LENSES': 'CONTACT_LENSES'
    };
    
    // Always include the correct subCategory based on masterCategory
    queryParams.append('subCategory', subCategoryMap[masterCategory] || 'EYEGLASSES');
    queryParams.append('frameType', frame.id);
  
    if (personCategory) {
      queryParams.append('personCategory', personCategory);
    }
    if (selectedCategoryPrice) {
      queryParams.append('selectedCategoryPrice', selectedCategoryPrice);
    }
   
    navigate(`/products?${queryParams.toString()}`);
    // Close the menu
    onClose?.();
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
            _hover={{ 
              bg: "gray.100",
              color: "teal.500",
              transform: "translateX(5px)",
              transition: "all 0.2s ease-in-out",
              maxW: "150px"
            }}
            cursor="pointer"
            p="2"
            borderRadius="md"
            maxW="150px"
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