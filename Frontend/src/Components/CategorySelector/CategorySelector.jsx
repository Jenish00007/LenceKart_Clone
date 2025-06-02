import React from 'react';
import { Flex, Box, Avatar, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../../redux/slices/filterSlice';

const CategorySelector = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelector((state) => state.filter.selectedCategory);
  const masterCategory = useSelector((state) => state.filter.masterCategory);

  const handleCategorySelect = (categoryId) => {
    dispatch(setSelectedCategory(categoryId));
    
    const queryParams = new URLSearchParams();
    
    // Map masterCategory to the correct subCategory format
    const subCategoryMap = {
      'EYEGLASSES': 'EYEGLASSES',
      'COMPUTER GLASSES': 'COMPUTER_GLASSES',
      'SUNGLASSES': 'SUNGLASSES',
      'CONTACT LENSES': 'CONTACT_LENSES'
    };
    
    // Add subCategory based on masterCategory
    queryParams.append('subCategory', subCategoryMap[masterCategory] || 'EYEGLASSES');
    
    // Add personCategory
    queryParams.append('personCategory', categoryId);
    
    navigate(`/products?${queryParams.toString()}`);
     // Close the menu
  onClose?.();
  };
 
  const categories = [
    {
      id: 'Men',
      title: 'Men',
      image: 'https://static.lenskart.com/media/desktop/img/men_pic.png'
    },
    {
      id: 'Women',
      title: 'Women',
      image: 'https://static.lenskart.com/media/desktop/img/women_pic.png'
    },
    {
      id: 'Kids',
      title: 'Kids',
      image: 'https://static.lenskart.com/media/desktop/img/kid_pic.png'
    }
  ];

  return (
    <Flex direction="column" gap={4}>
      {categories.map((category) => (
        <Box
          key={category.id}
          onClick={() => handleCategorySelect(category.id)}
          onMouseEnter={() => dispatch(setSelectedCategory(category.id))}
          cursor="pointer"
        >
          <Flex
            gap={5}
            alignItems="center"
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
        </Box>
      ))}
    </Flex>
  );
};

export default CategorySelector; 