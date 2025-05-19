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
    <Container maxW="container.xl" py={4}>
      <Box
        w="100%"
        cursor="pointer"
        fontSize={{ base: "18px", md: "22px" }}
        fontWeight="400"
      >
        <Box mb={2}>{heading}</Box>
        <Box borderBottom="1px" borderColor="gray.200" mb={4} />
        <Box position="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 20
              }
            }}
            style={{
              padding: "10px 0",
              "--swiper-navigation-size": "25px",
            }}
          >
            {type?.map((item, index) => (
              <SwiperSlide key={item._id || index}>
                <Box 
                  onClick={() => handleImageClick(item)}
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  <Square size={{ base: "120px", md: "160px" }} m="auto">
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
