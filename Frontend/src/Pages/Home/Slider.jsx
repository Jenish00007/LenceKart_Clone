import React from "react";
import {
  Box,
  Image,
  Square,
  Link,
  Text,
  Button,
  Center,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import './slider-custom.css';

const Slider = ({ type }) => {
  const navigate = useNavigate();

  // Responsive values
  const imageSize = useBreakpointValue({
    base: "80px",     // Mobile
    sm: "100px",      // Small tablets
    md: "120px",      // Tablets
    lg: "140px",      // Small desktops
    xl: "160px",      // Large desktops
  });

  const buttonSize = useBreakpointValue({
    base: "12px",
    sm: "13px",
    md: "14px",
  });

  const textSize = useBreakpointValue({
    base: "12px",
    sm: "13px",
    md: "14px",
  });

  const handleExplore = (shape) => {
    navigate(`/products?shape=${shape}`);
  };

  return (
    <Box
      w={{ base: "100vw", md: "100%" }}
      maxW={{ base: "100vw", md: "1200px" }}
      mx="auto"
      position="relative"
      className="custom-swiper-container"
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          0: {
            slidesPerView: 4,
            spaceBetween: 6,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
        }}
        className="custom-swiper"
      >
        {type?.map((item) => (
          <SwiperSlide key={item._id}>
            <Box
              p={{ base: 0.5, sm: 1, md: 2 }} 
              bg="white" 
              borderRadius="lg" 
              boxShadow="sm"
              transition="all 0.3s ease"
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <VStack spacing={{ base: 0.5, sm: 1, md: 2 }} mt={{ base: 0.5, sm: 1, md: 2 }} flex="1">
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  w="100%"
                  h={{ base: "45px", sm: "60px", md: "100px" }}
                  objectFit="contain"
                  transition="transform 0.3s ease"
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                />
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "9px", sm: "11px", md: "14px" }}
                  fontFamily="Futura-Medium"
                  textAlign="center"
                  noOfLines={2}
                  px={1}
                >
                  {item.caption}
                </Text>
                <Button 
                  size="sm"
                  bg="#4fc3c6"
                  color="white"
                  _hover={{ 
                    bg: '#3bb3b6',
                    transform: "scale(1.05)",
                  }}
                  transition="all 0.3s ease"
                  fontSize={{ base: "9px", sm: "11px", md: "14px" }}
                  px={{ base: 2, sm: 3, md: 5 }}
                  py={{ base: 1, sm: 2, md: 3 }}
                  height={{ base: "22px", sm: "28px", md: "36px" }}
                  minWidth={{ base: "60px", sm: "80px", md: "110px" }}
                  onClick={() => handleExplore(item.name)}
                >
                  Explore
                </Button>
              </VStack>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Slider;
