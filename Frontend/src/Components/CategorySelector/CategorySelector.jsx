import React, { useState } from 'react';
import { Flex, Box, Avatar, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleFrameSelect = (frameType) => {
    navigate(`/products?frameType=${frameType}`);
  };

  const categories  = [
    {
      id: 'men',
      title: 'Men',
      image: 'https://static.lenskart.com/media/desktop/img/men_pic.png'
    },
    {
      id: 'women',
      title: 'Women',
      image: 'https://static.lenskart.com/media/desktop/img/women_pic.png'
    },
    {
      id: 'kids',
      title: 'Kids',
      image: 'https://static.lenskart.com/media/desktop/img/kid_pic.png'
    }
  ];

  return (
    <Flex direction="column" gap={4} mt={4}>
      {categories.map((category) => (
        <Link to="/products" key={category.id}>
          <Flex
            gap={5}
            alignItems="center"
            onClick={() => setSelectedCategory(category.id)}
            onMouseEnter={() => setSelectedCategory(category.id)}
            transition="all 0.3s ease"
            transform={selectedCategory === category.id ? 'translateX(10px)' : 'none'}
            bg={selectedCategory === category.id ? 'gray.50' : 'transparent'}
            p={2}
            borderRadius="md"
          >
            <Avatar
              name={category.title}
              src={category.image}
              size="md"
              transition="all 0.3s ease"
              transform={selectedCategory === category.id ? 'scale(1.1)' : 'scale(1)'}
            />
            <Box>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={selectedCategory === category.id ? 'blue.500' : 'gray.700'}
                transition="all 0.3s ease"
              >
                {category.title}
              </Text>
            </Box>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

export default CategorySelector; 