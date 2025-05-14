import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Button,
  VStack,
  HStack,
  Badge,
  Flex,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Icon,
  Tooltip,
  Skeleton,
  Divider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Fade,
  ScaleFade,
  useToast
} from "@chakra-ui/react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiTrendingUp } from "react-icons/fi";

const RecommendedCategories = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/recommended`);
        const data = await response.json();
        setRecommendedProducts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch recommended products",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [toast]);

  if (loading) {
    return (
      <Box p={8} bg="gray.50">
        <Skeleton height="40px" mb={8} />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} height="400px" borderRadius="lg" />
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box p={8} bg="gray.50">
      <Fade in={true}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading
              size="lg"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              _hover={{
                bgGradient: "linear(to-r, blue.500, purple.600)",
              }}
            >
              Recommended Products
            </Heading>
            <Tag size="lg" colorScheme="purple" borderRadius="full">
              <TagLeftIcon as={FiTrendingUp} />
              <TagLabel>Trending Now</TagLabel>
            </Tag>
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {recommendedProducts.map((product, index) => (
              <ScaleFade key={product._id} initialScale={0.9} in={true} delay={index * 0.1}>
                <Card
                  bg={bgColor}
                  borderWidth="1px"
                  borderColor={borderColor}
                  borderRadius="lg"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-5px)',
                    shadow: 'lg'
                  }}
                >
                  <Box position="relative">
                    <Image
                      src={product.imageTsrc}
                      alt={product.name}
                      height="200px"
                      width="100%"
                      objectFit="cover"
                      fallbackSrc="https://via.placeholder.com/200"
                    />
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="purple"
                      borderRadius="full"
                      px={2}
                    >
                      Recommended
                    </Badge>
                    {product.offer && (
                      <Badge
                        position="absolute"
                        top={2}
                        left={2}
                        colorScheme="green"
                        borderRadius="full"
                        px={2}
                      >
                        {product.offer}
                      </Badge>
                    )}
                  </Box>

                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <Heading size="sm" noOfLines={2} _hover={{ color: "blue.500" }}>
                        {product.name}
                      </Heading>
                      <Text fontSize="sm" color={textColor} noOfLines={2}>
                        {product.description}
                      </Text>
                      <HStack spacing={2} width="100%">
                        <Text color="blue.600" fontSize="xl" fontWeight="bold">
                          ₹{product.price}
                        </Text>
                        {product.originalPrice && (
                          <Text as="s" color="gray.500" fontSize="sm">
                            ₹{product.originalPrice}
                          </Text>
                        )}
                      </HStack>
                      <HStack spacing={2}>
                        <Badge colorScheme="blue" variant="subtle">
                          <Icon as={FiStar} mr={1} />
                          Best Seller
                        </Badge>
                        <Badge colorScheme="green" variant="subtle">
                          In Stock
                        </Badge>
                      </HStack>
                    </VStack>
                  </CardBody>

                  <Divider />

                  <CardFooter>
                    <HStack spacing={4} width="100%" justify="space-between">
                      <Tooltip label="Add to Cart">
                        <Button
                          size="sm"
                          leftIcon={<Icon as={FiShoppingCart} />}
                          colorScheme="blue"
                          variant="ghost"
                        >
                          Cart
                        </Button>
                      </Tooltip>
                      <Tooltip label="Add to Wishlist">
                        <Button
                          size="sm"
                          leftIcon={<Icon as={FiHeart} />}
                          colorScheme="pink"
                          variant="ghost"
                        >
                          Wishlist
                        </Button>
                      </Tooltip>
                      <Tooltip label="View Details">
                        <Button
                          size="sm"
                          leftIcon={<Icon as={FiEye} />}
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => navigate(`/products/${product._id}`)}
                        >
                          View
                        </Button>
                      </Tooltip>
                    </HStack>
                  </CardFooter>
                </Card>
              </ScaleFade>
            ))}
          </Grid>
        </VStack>
      </Fade>
    </Box>
  );
};

export default RecommendedCategories; 