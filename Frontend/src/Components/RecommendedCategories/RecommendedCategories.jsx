import React, { useState } from 'react';
import { Box, Text, Flex, Container, keyframes } from '@chakra-ui/react';
import ProductCard from '../ProductCard/ProductCard';

// Define keyframe animations
const titleFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const titleGradient = keyframes`
  0% { 
    background-position: 0% 50%;
  }
  50% { 
    background-position: 100% 50%;
  }
  100% { 
    background-position: 0% 50%;
  }
`;

const titlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Sample data - replace with your actual data
const recommendedProducts = [
  {
    id: 1,
    title: "Vincent Chase Blue Block",
    description: "Blue Block Computer Glasses: Reduce Eye Strain",
    price: 999,
    originalPrice: 2499,
    offer: "60% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/glasses.jpg"
  },
  {
    id: 2,
    title: "John Jacobs Premium",
    description: "Premium Eyeglasses with Anti-Glare Coating",
    price: 1499,
    originalPrice: 3999,
    offer: "62% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/progressive.jpg"
  },
  {
    id: 3,
    title: "Hooper Sun Glasses",
    description: "Polarized Sunglasses for Ultimate Protection",
    price: 1299,
    originalPrice: 2999,
    offer: "56% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/power-sun.jpg"
  },
  {
    id: 4,
    title: "Lenskart Air",
    description: "Lightweight Comfortable Eyewear",
    price: 799,
    originalPrice: 1999,
    offer: "60% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/reading.jpg"
  },
  {
    id: 5,
    title: "Contact Lens Pack",
    description: "Monthly Disposable Contact Lenses",
    price: 599,
    originalPrice: 1499,
    offer: "60% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/clear-contact.jpg"
  },
  {
    id: 6,
    title: "Color Contact Lens",
    description: "Natural Looking Color Contact Lenses",
    price: 899,
    originalPrice: 2299,
    offer: "61% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/color-contact.jpg"
  }
];

const categories = [
  {
    title: "Trending Eyeglasses",
    products: recommendedProducts
  },
  {
    title: "Best Selling Sunglasses",
    products: recommendedProducts
  },
  {
    title: "Contact Lenses Favorites",
    products: recommendedProducts
  }
];

const RecommendedCategories = () => {
  const [favorites, setFavorites] = useState(new Set());

  const handleToggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <Box w="100%" bg="#f7f7f7" py={4}>
      {categories.map((category, idx) => (
        <Box key={idx} mb={6}>
          <Box maxW="100%" px={{ base: 2, md: 4, lg: 6 }}>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              fontWeight="600" 
              mb={3} 
              pl={{ base: 1, lg: '2%' }}
              bgGradient="linear(to-r, blue.400, purple.500, blue.400)"
              bgSize="200% 200%"
              bgClip="text"
              animation={`${titleFloat} 3s ease-in-out infinite, ${titleGradient} 3s ease infinite, ${titlePulse} 2s ease-in-out infinite`}
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600, blue.500)",
                transform: "scale(1.05)",
                transition: "all 0.3s ease"
              }}
            >
              {category.title}
            </Text>
            <Box 
              overflowX="auto" 
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                'scrollbarWidth': 'none',
                '-ms-overflow-style': 'none',
              }}
              mx={{ lg: '2%' }}
            >
              <Flex 
                gap={{ base: 2, md: 3 }} 
                pb={2}
                minW="max-content"
              >
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RecommendedCategories; 