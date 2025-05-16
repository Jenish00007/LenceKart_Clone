import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSelectedFrameType } from '../../redux/slices/categorySlice';

const SelectCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  const categories = [
    {
      id: 'classic',
      title: 'CLASSIC EYE-GLASSES',
      price: '1199'
    },
    {
      id: 'premium',
      title: 'PREMIUM EYE-GLASSES',
      price: '3000'
    },
    {
      id: 'computer',
      title: 'COMPUTER EYE-GLASSES',
      price: '1299'
    }
  ];

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category.id));
    dispatch(setSelectedFrameType(category.title));
    navigate(`/products?frameType=${category.id}`);
  };

  return (
    <Flex direction="column" gap={6}>
      <Box
        fontSize="md"
        fontWeight="bold"
        borderBottom="1px solid black"
        p={1}
      >
        SELECT CATEGORY
      </Box>
      {categories.map((category) => (
        <Box
          key={category.id}
          fontSize="md"
          p={2}
          cursor="pointer"
          onClick={() => handleCategorySelect(category)}
          onMouseEnter={() => dispatch(setSelectedCategory(category.id))}
          transition="all 0.3s ease"
          transform={selectedCategory === category.id ? 'translateX(10px)' : 'none'}
          bg={selectedCategory === category.id ? 'blue.50' : 'transparent'}
          borderRadius="md"
          _hover={{ bg: selectedCategory === category.id ? 'blue.50' : 'blackAlpha.200' }}
        >
          <Text
            color={selectedCategory === category.id ? 'blue.500' : 'inherit'}
            fontWeight={selectedCategory === category.id ? 'bold' : 'normal'}
          >
            {category.title}
          </Text>
          <Text
            fontSize="sm"
            color={selectedCategory === category.id ? 'blue.400' : 'gray.600'}
          >
            Starting From ₹ <span>{category.price}</span>
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default SelectCategory; 