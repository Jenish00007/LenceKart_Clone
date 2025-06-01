import React from "react";
import { Box, Image, Flex, Container, Text, Spinner, Center } from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";

const HomeCard6 = ({ type = [], heading, loading, error }) => {
  const navigate = useNavigate();
  
  console.log('HomeCard6 Props:', { type, heading, loading, error });

  if (loading) {
    return (
      <Container maxW="container.xl" py={{ base: 2, md: 4 }} px={{ base: 6, sm: 12, md: 16 }} mx="auto">
        <Center minH="200px">
          <Spinner size="xl" color="blue.500" />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={{ base: 2, md: 4 }} px={{ base: 6, sm: 12, md: 16 }} mx="auto">
        <Center minH="200px">
          <Text color="red.500">{error}</Text>
        </Center>
      </Container>
    );
  }

  if (!Array.isArray(type) || type.length === 0) {
    return (
      <Container maxW="container.xl" py={{ base: 2, md: 4 }} px={{ base: 6, sm: 12, md: 16 }} mx="auto">
        <Center minH="200px">
          <Text>No products available</Text>
        </Center>
      </Container>
    );
  }

  const handleImageClick = (item) => {
    navigate(`/products/${item._id}`);
  };

  const handleViewRange = () => {
    // Get the first item to determine the category
    const firstItem = type[0];
    if (!firstItem) return;

    // Construct query parameters based on the Product model schema
    const queryParams = new URLSearchParams();

    // Determine the category based on the item's properties
    if (firstItem.mainCategory === "GLASSES") {
      if (firstItem.subCategory === "EYEGLASSES") {
        // Case 1: EYEGLASSES
        queryParams.append('mainCategory', 'GLASSES');
        queryParams.append('subCategory', 'EYEGLASSES');
      } else if (firstItem.subCategory === "SUNGLASSES") {
        // Case 2: SUNGLASSES
        queryParams.append('mainCategory', 'GLASSES');
        queryParams.append('subCategory', 'SUNGLASSES');
      } else if (firstItem.subCategory === "COMPUTER_GLASSES") {
        if (firstItem.powerType === "zero_power") {
          // Case 3: WITH ZERO POWER COMPUTER BLU LENSES
          queryParams.append('mainCategory', 'GLASSES');
          queryParams.append('subCategory', 'COMPUTER_GLASSES');
          queryParams.append('powerType', 'zero_power');
        } else {
          // Case 4: WITH POWER COMPUTER BLU LENSES
          queryParams.append('mainCategory', 'GLASSES');
          queryParams.append('subCategory', 'COMPUTER_GLASSES');
          queryParams.append('powerType', 'with_power');
        }
      }
    } else if (firstItem.mainCategory === "CONTACT_LENSES") {
      if (firstItem.subCategory === "CONTACT_LENSES") {
        if (firstItem.isContactLensColor === "yes") {
          // Case 6: COLOR CONTACT LENSES
          queryParams.append('mainCategory', 'CONTACT_LENSES');
          queryParams.append('subCategory', 'CONTACT_LENSES');
          queryParams.append('isContactLensColor', 'yes');
        } else {
          // Case 5: CONTACT LENSES
          queryParams.append('mainCategory', 'CONTACT_LENSES');
          queryParams.append('subCategory', 'CONTACT_LENSES');
          queryParams.append('isContactLensColor', 'no');
        }
      }
    }

    // Navigate to products page with the constructed query parameters
    navigate(`/products?${queryParams.toString()}`);
  };

  return (
    <Container maxW="container.xl" py={{ base: 2, md: 4 }} px={{ base: 6, sm: 12, md: 16 }} mx="auto">
      {/* Heading Row */}
      <Flex align="center" justify="space-between" mb={2} px={{ base: 2, md: 0 }}>
        <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="normal" fontFamily="Futura-Medium">
          {heading}
        </Text>
        <Box 
          as="button"
          onClick={handleViewRange}
          color="#19b3b3" 
          fontWeight="500" 
          fontSize={{ base: "sm", md: "md" }} 
          _hover={{ textDecoration: "underline" }}
          bg="transparent"
          border="none"
          cursor="pointer"
        >
          View Range
        </Box>
      </Flex>
      <Box borderBottom="1px" borderColor="gray.200" mb={4} />
      <Box position="relative" minW={0} bg="white" boxShadow="none" px={0}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 4,
              spaceBetween: 0
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 0
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 0
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 0
            }
          }}
          style={{
            padding: "0",
            "--swiper-navigation-size": "32px",
          }}
        >
          {type.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <Box
                onClick={() => handleImageClick(item)}
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
                minW={0}
                bg="transparent"
                boxShadow="none"
                p={0}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={item.imageTsrc}
                  alt={item.caption || 'Product image'}
                  w={{ base: "120px", md: "180px", lg: "220px" }}
                  h={{ base: "120px", md: "180px", lg: "220px" }}
                  objectFit="contain"
                  fallbackSrc="https://via.placeholder.com/160"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/160";
                  }}
                  m="auto"
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default HomeCard6;
