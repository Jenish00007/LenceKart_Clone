import React from 'react';
import { Box, Grid, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setSelectedType, setSelectedCategory } from '../../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

const KidsGlassesSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const kidsGlassesTypes = [
    {
      id: 'eyeglasses',
      title: 'Eye Glasses',
      image: 'https://static1.lenskart.com/media/desktop/img/May22/glasses.jpg',
    },
    {
      id: 'computer-glasses',
      title: 'Zero Power Computer Glasses',
      image: 'https://static1.lenskart.com/media/desktop/img/May22/computer-glasses.jpg',
    },
    {
      id: 'sunglasses',
      title: 'Sun Glasses',
      image: 'https://static1.lenskart.com/media/desktop/img/May22/Sunnies.jpg',
    },
  ];

  const handleGlassTypeSelect = (type) => {
    dispatch(setSelectedCategory('kids'));
    dispatch(setSelectedType(type));
    
    const queryParams = new URLSearchParams();
    queryParams.append('category', 'kids');
    queryParams.append('type', type);
    
    navigate(`/products?${queryParams.toString()}`);
    
    toast({
      title: 'Category Selected',
      description: `Viewing Kids ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      justifyContent="center"
      alignItems="center"
      p="3"
      gap={3}
      maxW="800px"
      mx="auto"
    >
      {kidsGlassesTypes.map((item) => (
        <Box 
          key={item.id}
          bg="whiteAlpha.900" 
          h="180px"
          w="180px"
          cursor="pointer"
          onClick={() => handleGlassTypeSelect(item.id)}
          transition="transform 0.2s"
          borderRadius="md"
          overflow="hidden"
          boxShadow="sm"
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: 'md'
          }}
        >
          <Box 
            position="relative"
            h="130px"
            overflow="hidden"
          >
            <img
              src={item.image}
              alt={`kids-${item.id}`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </Box>
          <Box 
            p="2"
            textAlign="center" 
            fontSize="sm"
            fontWeight="500"
            bg="white"
          >
            {item.title}
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default KidsGlassesSelector; 