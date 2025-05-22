import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedType, setSelectedCategoryType, setProductType } from '../../redux/slices/filterSlice';

const SelectCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.filter.selectedType);
  const selectedCategoryType = useSelector((state) => state.filter.selectedCategoryType);

  const categories = [
    {
      id: 'classic-eyeglasses',
      title: 'CLASSIC EYE-GLASSES',
      price: '1499'
    },
    {
      id: 'premium-eyeglasses',
      title: 'PREMIUM EYE-GLASSES',
      price: '4999'
    },
    {
      id: 'designer-eyeglasses',
      title: 'DESIGNER EYE-GLASSES',
      price: '15000'
    }
  ];

  const handleCategorySelect = (category) => {
    dispatch(setSelectedType(category.id));
    dispatch(setSelectedCategoryType(category.id));
    dispatch(setProductType('eyeglasses'));
    
    const queryParams = new URLSearchParams();
    queryParams.append('type', category.id);
    queryParams.append('productType', 'eyeglasses');
    
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
        SELECT CATEGORY
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {categories.map((category) => (
         <Box
         key={category.id}
         cursor="pointer"
         onClick={() => handleCategorySelect(category)}
         onMouseEnter={() => dispatch(setSelectedCategoryType(category.id))}
         transition="all 0.3s ease"
         transform={selectedCategoryType === category.id ? 'translateX(10px)' : 'none'}
         bg={selectedCategoryType === category.id ? 'blue.50' : 'transparent'}
         borderRadius="md"
         p="2"
         maxW="250px"
         _hover={{ 
           bg: "gray.100",
           color: "teal.500",
           transform: "translateX(5px)",
           transition: "all 0.2s ease-in-out"
         }}
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
    </Flex>
  );
};

export default SelectCategory; 