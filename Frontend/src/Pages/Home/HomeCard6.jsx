import React from "react";
import { Box, Image, Square, Link } from "@chakra-ui/react";
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
    navigate(`/products?productType=${item.productType }`);
  };
  
  return (
    <Box
      justifyContent="left"
      w="85%"
      m="auto"
      mt="6"
      cursor="pointer"
      fontSize="22px"
      pb="7"
      fontWeight="400"
    >
      {heading}
      <hr />
      <Box mt="1">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
        >
          {type?.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <Box onClick={() => handleImageClick(item)}>
                <Square m="auto">
                  <Image
                    src={item.imageTsrc}
                    alt={item.caption || 'Product image'}
                    maxW="160px"
                    maxH="160px"
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
  );
};

export default HomeCard6;
