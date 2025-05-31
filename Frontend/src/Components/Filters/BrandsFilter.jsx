import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../../redux/slices/filterSlice';

const BrandsFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subCategory = useSelector((state) => state.filter.selectedSubCategory);

  const brands = [
    'Aqualens',
    'Bausch Lomb',
    'Soflens',
    'Acuvue',
    'Iconnect',
    'Alcon'
  ];

  const handleBrandSelect = (brand) => {
    // Store in Redux
    dispatch(setFilter({ brands: [brand] }));
    
    // Update URL
    const queryParams = new URLSearchParams();
    queryParams.append('subCategory', subCategory);
    queryParams.append('brands', brand);
    navigate(`/products?${queryParams.toString()}`);
  };

  return (
    <Flex direction="column" gap="6" pl={6}>
      <Box
        fontSize="md"
        fontWeight="bold"
        borderBottom="1px solid black"
        p="1"
      >
        Brands
      </Box>
      <Flex direction="column" fontSize="md" gap="2">
        {brands.map((brand, index) => (
          <Box
            key={index}
            _hover={{ 
              bg: "gray.100",
              color: "teal.500",
              transform: "translateX(5px)",
              transition: "all 0.2s ease-in-out"
            }}
            cursor="pointer"
            p="2"
            borderRadius="md"
            onClick={() => handleBrandSelect(brand)}
          >
            {brand}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default BrandsFilter; 