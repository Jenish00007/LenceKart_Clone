import React, { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SunglassesSelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'classic',
      title: 'CLASSIC SUNGLASSES',
      price: '1299'
    },
    {
      id: 'premium',
      title: 'PREMIUM SUNGLASSES',
      price: '2500'
    }
  ];

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
          onClick={() => setSelectedCategory(category.id)}
          onMouseEnter={() => setSelectedCategory(category.id)}
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

export default SunglassesSelectCategory; 