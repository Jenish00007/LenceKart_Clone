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
} from "@chakra-ui/react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";

const Slider = ({ type }) => {
  const navigate = useNavigate();

  const handleExplore = (shape) => {
    navigate(`/products?shape=${shape}`);
  };

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 4000 }}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        200: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        660: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        749: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1240: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
    >
      {type?.map((item) => (
        <SwiperSlide key={item._id}>
          <Box>
            <Square m="auto">
              <Image
                src={item.imageUrl}
                alt={item.caption}
                boxSize={{ base: "100px" }}
                w="80%"
              />
            </Square>
            <VStack m="auto">
              <Center>
                <Text
                  pt={5}
                  pb={5}
                  fontWeight="bold"
                  fontSize="18px"
                  fontFamily="Futura-Medium"
                >
                  {item.caption}
                </Text>
              </Center>
              <Button 
                p="20px 40px" 
                bg="#4fc3c6"
                color="white"
                _hover={{ bg: '#3bb3b6' }}
                m="auto" 
                fontSize="17px"
                onClick={() => handleExplore(item.name)}
              >
                Explore
              </Button>
            </VStack>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
