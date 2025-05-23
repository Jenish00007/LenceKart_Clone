import React from "react";
import { Box, Image, Flex, Container, Text } from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";

const HomeCard6 = ({ type, heading, loading, error }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleImageClick = (item) => {
    navigate(`/products?productType=${item.productType}`);
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
          onClick={() => navigate('/products')}
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
      <Box position="relative" minW={0} bg="transparent" boxShadow="none" px={0}>
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
          {type?.map((item, index) => (
            <SwiperSlide key={item._id || index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', boxShadow: 'none', padding: 0 }}>
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
