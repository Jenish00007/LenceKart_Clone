import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType } from '../../redux/slices/filterSlice';

const SelectCategory  = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.filter.selectedType);

  const categories = [
    {
      id: 'eyeglasses',
      title: 'CLASSIC EYE-GLASSES',
      price: '1199'
    },
    {
      id: 'premium-eyeglasses',
      title: 'PREMIUM EYE-GLASSES',
      price: '3000'
    },
    {
      id: 'computer-glasses',
      title: 'COMPUTER EYE-GLASSES',
      price: '1299'
    }
  ];

  const handleCategorySelect = (category) => {
    dispatch(setSelectedType(category.id));
    navigate(`/products?type=${category.id}`);
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
          onMouseEnter={() => dispatch(setSelectedType(category.id))}
          transition="all 0.3s ease"
          transform={selectedType === category.id ? 'translateX(10px)' : 'none'}
          bg={selectedType === category.id ? 'blue.50' : 'transparent'}
          borderRadius="md"
          _hover={{ bg: selectedType === category.id ? 'blue.50' : 'blackAlpha.200' }}
        >
          <Text
            color={selectedType === category.id ? 'blue.500' : 'inherit'}
            fontWeight={selectedType === category.id ? 'bold' : 'normal'}
          >
            {category.title}
          </Text>
          <Text
            fontSize="sm"
            color={selectedType === category.id ? 'blue.400' : 'gray.600'}
          >
            Starting From ₹ <span>{category.price}</span>
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default SelectCategory; 