import { Link } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import PropTypes from 'prop-types';

const ProductCard = ({ type = [] }) => {
  // If type is not an array or is empty, show a message
  if (!Array.isArray(type) || type.length === 0) {
    return (
      <Box textAlign="center" p={4}>
        <Text>No products available</Text>
      </Box>
    );
  }

  return (
    <Grid
      m={{ base: '10px 0', md: '20px 10px' }}
      templateColumns={{
        base: "repeat(2,1fr)",
        sm: "repeat(2,1fr)",
        md: "repeat(3,1fr)",
        lg: "repeat(4,1fr)",
        xl: "repeat(5,1fr)"
      }}
      gap={{ base: 3, md: 6 }}
    >
      {type.map((ele) => (
        <GridItem key={ele._id}>
          <Link to={`/products/${ele._id}`}>
            <Box
              position="relative"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="3%"
              p={{ base: '6px', md: '10px' }}
              _hover={{
                boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px"
              }}
              mb={{ base: 3, md: 7 }}
              minH={{ base: '260px', md: '340px' }}
              maxW="100%"
              bg="white"
            >
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  h={{ base: '90px', md: '140px' }}
                  w="100%"
                >
                  <Image
                    src={ele.imageTsrc}
                    alt={ele.name || "product image"}
                    maxH="100%"
                    maxW="100%"
                    objectFit="contain"
                    _hover={{ transform: "scale(1.07)" }}
                    transition="transform 0.2s"
                  />
                </Box>
                <Box p={{ base: '6px', md: '10px' }}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Flex
                      w={{ base: '40%', md: '25%' }}
                      borderRadius="20px"
                      alignItems="center"
                      gap="5px"
                      p={{ base: '2px 6px', md: '5px 10px' }}
                      bgColor="#eeeef5"
                      fontSize={{ base: '12px', md: '15px' }}
                    >
                      <Text>{ele.rating ? ele.rating : (Math.random() * (5 - 1) + 1).toFixed(1)}</Text>
                      <AiFillStar size={"13px"} color="#0fbd95" />
                      <Text>{ele.userRated ? ele.userRated : Math.floor(Math.random() * 999 + 1)}</Text>
                    </Flex>
                  </Flex>
                  <Text
                    mt="5px"
                    fontWeight="700"
                    color="#000042"
                    fontSize={{ base: '13px', md: '15px' }}
                    textTransform="capitalize"
                    noOfLines={1}
                  >
                    {ele.productRefLink} {" "}
                  </Text>
                  <Text
                    mt="5px"
                    fontWeight="400"
                    color="gray.400"
                    fontSize={{ base: '12px', md: '14px' }}
                    noOfLines={1}
                  >
                    {ele.name} {" "}
                  </Text>
                  <Text
                    mt="5px"
                    fontWeight="400"
                    color="#000042"
                    fontSize={{ base: '12px', md: '14px' }}
                    noOfLines={1}
                  >
                    Shape : {ele.shape}
                  </Text>
                  <Text
                    mt="5px"
                    fontWeight="bold"
                    color="#gray.700"
                    fontSize={{ base: '13px', md: '15px' }}
                  >
                    ₹{ele.price} {" "}
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "lighter",
                        color: "#727297",
                        textDecoration: "line-through"
                      }}
                    >
                      {"  "}₹{ele.mPrice}
                    </span>
                    <span
                      style={{
                        color: "#727297",
                        fontSize: "12px",
                        fontWeight: "lighter"
                      }}
                    >
                      {"  "}(+tax)
                    </span>
                  </Text>
                </Box>
              </Box>
              <Box
                fontSize={{ base: '12px', md: '15px' }}
                color="#cbb881"
                w="100%"
                padding={{ base: 1, md: 2 }}
                fontWeight="bold"
                bgGradient="linear(to-r,  #f8f2e0, yellow.50)"
                textAlign="center"
                mt={{ base: 1, md: 2 }}
              >
                BUY1 GET1 +10% OFF
              </Box>
            </Box>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
};

ProductCard.propTypes = {
  type: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      mPrice: PropTypes.number.isRequired,
      imageTsrc: PropTypes.string.isRequired,
      productRefLink: PropTypes.string.isRequired,
      shape: PropTypes.string.isRequired,
      rating: PropTypes.number,
      userRated: PropTypes.number
    })
  )
};

// export default ProductCard;
export default ProductCard;
