import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType, setSelectedCategoryType } from '../../redux/slices/filterSlice';

const SunglassesSelectCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.filter.selectedType);
  const selectedCategoryType = useSelector((state) => state.filter.selectedCategoryType);

  const categories = [
    {
      id: 'Rs. 1500-1999',
      title: 'CLASSIC SUNGLASSES',
      price: '1999'
    },
    {
      id: 'premium-sunglasses',
      title: 'PREMIUM SUNGLASSES',
      price: '2500'
    }
  ];

  const handleCategorySelect = (category) => {
    dispatch(setSelectedType(category.id));
    dispatch(setSelectedCategoryType(category.id));
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
          onMouseEnter={() => dispatch(setSelectedCategoryType(category.id))}
          transition="all 0.3s ease"
          transform={selectedCategoryType === category.id ? 'translateX(10px)' : 'none'}
          bg={selectedCategoryType === category.id ? 'blue.50' : 'transparent'}
          borderRadius="md"
          _hover={{ bg: selectedCategoryType === category.id ? 'blue.50' : 'blackAlpha.200' }}
        >
          <Text
            color={selectedCategoryType === category.id ? 'blue.500' : 'inherit'}
            fontWeight={selectedCategoryType === category.id ? 'bold' : 'normal'}
          >
            {category.title}
          </Text>
          <Text
            fontSize="sm"
            color={selectedCategoryType === category.id ? 'blue.400' : 'gray.600'}
          >
            Starting From ₹ <span>{category.price}</span>
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default SunglassesSelectCategory; 