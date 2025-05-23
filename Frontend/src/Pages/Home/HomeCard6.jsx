import React from "react";
import { Box, Image, Square, Link, Container } from "@chakra-ui/react";
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
    <Container maxW="container.xl" py={{ base: 2, md: 4 }} px={{ base: 1, sm: 4 }}>
      <Box
        w="100%"
        minW={0}
        bg={{ base: "white", md: "transparent" }}
        borderRadius={{ base: "lg", md: "xl" }}
        boxShadow={{ base: "sm", md: "none" }}
        px={{ base: 2, sm: 4, md: 0 }}
        py={{ base: 2, sm: 3, md: 0 }}
        cursor="pointer"
        fontSize={{ base: "16px", sm: "18px", md: "22px" }}
        fontWeight={{ base: "500", md: "600" }}
      >
        <Box mb={{ base: 1, md: 2 }} minW={0}>{heading}</Box>
        <Box borderBottom="1px" borderColor="gray.200" mb={{ base: 2, md: 4 }} />
        <Box position="relative" minW={0}>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 0
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 0
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 0
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 0
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 0
              }
            }}
            style={{
              padding: "10px 0",
              "--swiper-navigation-size": "20px",
            }}
          >
            {type?.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <Box 
                  onClick={() => handleImageClick(item)}
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                  minW={0}
                >
                  <Square 
                    size={{ base: "80px", sm: "100px", md: "140px", lg: "160px" }} 
                    m="auto"
                    bg="gray.50"
                    borderRadius={{ base: "md", md: "lg" }}
                    boxShadow={{ base: "xs", md: "sm" }}
                    p={{ base: 1, sm: 2 }}
                  >
                    <Image
                      src={item.imageTsrc}
                      alt={item.caption || 'Product image'}
                      maxW="100%"
                      maxH="100%"
                      objectFit="contain"
                      fallbackSrc="https://via.placeholder.com/160"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/160";
                      }}
                    />
                  </Square>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeCard6;
