import React from 'react';
import { Box, Text, Image, Badge, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { setSelectedCategory, setProductType } from '../../redux/slices/filterSlice';


// Define keyframe animations
const titleFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const titleGradient  = keyframes`
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

const badgePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const badgeGradient = keyframes`
  0% { 
    background: linear-gradient(45deg, #00b9c5, #00a5b0, #008c96);
  }
  50% { 
    background: linear-gradient(45deg, #00a5b0, #008c96, #00b9c5);
  }
  100% { 
    background: linear-gradient(45deg, #008c96, #00b9c5, #00a5b0);
  }
`;

const categories = [
  {
    title: 'Eyeglasses',
    sections: [
      { 
        name: 'Men', 
        image: 'https://static1.lenskart.com/media/desktop/img/11-jan-25/x/Eyeglass01.png',
        category: 'men',
        productType: 'eyeglasses'
      },
      { 
        name: 'Women', 
        image: 'https://static1.lenskart.com/media/desktop/img/11-jan-25/x/Eyeglass02.png',
        category: 'women',
        productType: 'eyeglasses'
      },
      { 
        name: 'Kids', 
        image: 'https://static1.lenskart.com/media/desktop/img/11-jan-25/x/Eyeglass03.png',
        category: 'kids',
        productType: 'eyeglasses'
      },
      { 
        name: 'Essentials', 
        image: 'https://static1.lenskart.com/media/desktop/img/30-jan-25/Eyeglass04.png',
        category: 'essentials',
        productType: 'eyeglasses'
      }
    ]
  },
  {
    title: 'Sunglasses',
    sections: [
      { 
        name: 'Men', 
        image: 'https://static.lenskart.com/media/desktop/img/men_pic.png',
        category: 'men',
        productType: 'sunglasses'
      },
      { 
        name: 'Women', 
        image: 'https://static.lenskart.com/media/desktop/img/women_pic.png',
        category: 'women',
        productType: 'sunglasses'
      },
      { 
        name: 'Kids', 
        image: 'https://static.lenskart.com/media/desktop/img/kid_pic.png',
        category: 'kids',
        productType: 'sunglasses'
      },
      { 
        name: 'Essentials', 
        image: 'https://static1.lenskart.com/media/desktop/img/30-jan-25/Sunglass%2004.png',
        category: 'essentials',
        productType: 'sunglasses'
      }
    ]
  },
  {
    title: 'Special Powers',
    badge: 'Exclusive',
    sections: [
      { name: 'Zero Power', image: 'https://static1.lenskart.com/media/desktop/img/11-jan-25/x/Special%20Power01.png' },
      { name: 'Progressive', image: 'https://static1.lenskart.com/media/desktop/img/11-jan-25/x/Special%20Power02.png' },
      { name: 'Reading', image: 'https://static1.lenskart.com/media/desktop/img/11-jan-25/x/Special%20Power03.png' },
      { name: 'Power Sun', image: 'https://static1.lenskart.com/media/desktop/img/30-jan-25/a/Sunglass%2003.png' }
    ]
  },
  {
    title: 'Contact Lenses & Accessories',
    badge: 'Try for free',
    sections: [
      { name: 'Clear', image: 'https://static5.lenskart.com/media/uploads/Clear-lens-060225.png' },
      { name: 'Color', image: 'https://static5.lenskart.com/media/uploads/color-lens-060225.png' },
      { name: 'Trial Pack', image: 'https://static5.lenskart.com/media/uploads/Trial-Pack-x1.png' },
      { name: 'Cases & Cleaner', image: 'https://static5.lenskart.com/media/uploads/Cases-Chains-140225.png' }
    ]
  }
];

const categoryToProductType = {
  "Special Powers": "eyeglasses", // or the actual productType in your DB
  "Contact Lenses & Accessories": "contact-lenses"
};
const sectionToCategory = {
  "Zero Power": "zero-power", // or the actual value in your DB
  "Progressive": "progressive",
  "Reading": "reading",
  "Power Sun": "power-sun",
  "Clear": "clear",
  "Color": "color",
  "Trial Pack": "trial-pack",
  "Cases & Cleaner": "cases-cleaner"
};

const CategoryGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSectionClick = (section, parentCategory) => {
    // Map UI to real DB values
    const productType = section.productType || categoryToProductType[parentCategory.title] || parentCategory.title;
    const category = section.category || sectionToCategory[section.name] || section.name;

    dispatch(setSelectedCategory(category));
    dispatch(setProductType(productType));

    // Build query params
    const queryParams = new URLSearchParams();
    queryParams.append('productType', productType);
    queryParams.append('category', category);

    navigate(`/products?${queryParams.toString()}`);
  };

  return (
    <Box w="100%" bg="gray.50" py={4}>
      {categories.map((category, idx) => (
        <Box key={idx} mb={4}>
          <Box px={{ base: 2, md: 4, lg: 8 }} maxW="100%">
            <Flex align="center" mb={3} pl={{ base: 1, lg: '2%' }}>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                fontWeight="500" 
                bgGradient="linear(to-r, blue.400, purple.500, blue.400)"
                bgSize="200% 200%"
                bgClip="text"
                animation={`${titleFloat} 3s ease-in-out infinite, ${titleGradient} 3s ease infinite`}
                _hover={{
                  bgGradient: "linear(to-r, blue.500, purple.600, blue.500)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease"
                }}
              >
                {category.title} 
                {idx < 2 && (
                  <Box 
                    as="span" 
                    bgGradient="linear(to-r, blue.400, purple.500)"
                    bgClip="text"
                    animation={`${titleGradient} 3s ease infinite`}
                    _hover={{
                      bgGradient: "linear(to-r, blue.500, purple.600)"
                    }}
                  >
                    {" "}with Power
                  </Box>
                )}
              </Text>
              {category.badge && (
                <Badge 
                  ml={3}
                  colorScheme={category.badge === 'Exclusive' ? 'blue' : 'green'}
                  fontSize={{ base: '2xs', md: 'xs' }}
                  px={2}
                  py={0.5}
                  animation={`${badgePulse} 2s ease-in-out infinite`}
                  _hover={{
                    transform: 'scale(1.1)',
                    animation: `${badgeGradient} 3s ease infinite`
                  }}
                  transition="all 0.3s ease"
                >
                  {category.badge}
                </Badge>
              )}
            </Flex>
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
                gap={{ base: 2, md: 3, lg: 4 }} 
                minW="max-content"
                w="100%"
                justify={{ lg: 'space-between' }}
              >
                {category.sections.map((section, sectionIdx) => (
                  <Box 
                    key={sectionIdx} 
                    style={{ flex: '1' }}
                    onClick={() => handleSectionClick(section, category)}
                    cursor="pointer"
                  >
                    <Box 
                      w={{ base: "100px", md: "180px", lg: "100%" }}
                      position="relative"
                      transition="transform 0.2s"
                      _hover={{ transform: 'scale(1.02)' }}
                      bg="white"
                      p={2}
                    >
                      <Box 
                        position="relative" 
                        borderRadius="0" 
                        overflow="hidden"
                        h={{ base: "100px", md: "180px", lg: "280px" }}
                        bg="gray.100"
                      >
                        <Image 
                          src={section.image} 
                          alt={section.name}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          filter="brightness(1.1)"
                        />
                        {idx < 2 && (
                          <Badge 
                            position="absolute" 
                            top={2} 
                            right={2}
                            bg="blue.500"
                            color="white"
                            fontSize={{ base: "2xs", md: "xs", lg: "sm" }}
                            borderRadius="0"
                            px={2}
                            py={1}
                          >
                            60% OFF
                          </Badge>
                        )}
                      </Box>
                      <Text 
                        textAlign="center" 
                        mt={2}
                        color="gray.700" 
                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                        fontWeight="500"
                        noOfLines={1}
                      >
                        {section.name}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CategoryGrid; 