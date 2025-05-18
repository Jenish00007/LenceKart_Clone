import React from 'react';
import { Box, Text, Image, Badge, Flex, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';


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
      { name: 'Men', image: 'https://static.lenskart.com/media/desktop/img/men_pic.png' },
      { name: 'Women', image: 'https://static.lenskart.com/media/desktop/img/women_pic.png' },
      { name: 'Kids', image: 'https://static.lenskart.com/media/desktop/img/kid_pic.png' },
      { name: 'Essentials', image: 'https://static1.lenskart.com/media/desktop/img/May22/glasses.jpg' }
    ]
  },
  {
    title: 'Sunglasses',
    sections: [
      { name: 'Men', image: 'https://static.lenskart.com/media/desktop/img/men_pic.png' },
      { name: 'Women', image: 'https://static.lenskart.com/media/desktop/img/women_pic.png' },
      { name: 'Kids', image: 'https://static.lenskart.com/media/desktop/img/kid_pic.png' },
      { name: 'Essentials', image: 'https://static1.lenskart.com/media/desktop/img/May22/Sunnies.jpg' }
    ]
  },
  {
    title: 'Special Powers',
    badge: 'Exclusive',
    sections: [
      { name: 'Zero Power', image: 'https://static.lenskart.com/media/desktop/img/men_pic.png' },
      { name: 'Progressive', image: 'https://static1.lenskart.com/media/desktop/img/May22/progressive.jpg' },
      { name: 'Reading', image: 'https://static1.lenskart.com/media/desktop/img/May22/reading.jpg' },
      { name: 'Power Sun', image: 'https://static1.lenskart.com/media/desktop/img/May22/power-sun.jpg' }
    ]
  },
  {
    title: 'Contact Lenses & Accessories',
    badge: 'Try for free',
    sections: [
      { name: 'Clear', image: 'https://static1.lenskart.com/media/desktop/img/May22/clear-contact.jpg' },
      { name: 'Color', image: 'https://static1.lenskart.com/media/desktop/img/May22/color-contact.jpg' },
      { name: 'Trial Pack', image: 'https://static1.lenskart.com/media/desktop/img/May22/trial-pack.jpg' },
      { name: 'Cases & Cleaner', image: 'https://static1.lenskart.com/media/desktop/img/May22/cases-cleaner.jpg' }
    ]
  }
];

const CategoryGrid = () => {
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
                  <Link to="/products" key={sectionIdx} style={{ flex: '1' }}>
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
                  </Link>
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