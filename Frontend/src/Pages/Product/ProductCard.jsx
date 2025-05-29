import { Link } from "react-router-dom";
import { Box, Flex, Grid, Text, Image, Badge } from "@chakra-ui/react";
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
      templateColumns={{
        base: "repeat(2, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(4, 1fr)"
      }}
      gap={{ base: 3, md: 4, lg: 6 }}
      p={{ base: 2, md: 4 }}
    >
      {type.map((ele) => (
        <Link to={`/products/${ele._id}`} key={ele._id}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{ 
              transform: "translateY(-5px)",
              boxShadow: "lg",
              borderColor: "blue.200"
            }}
            bg="white"
            h="100%"
            display="flex"
            flexDirection="column"
          >
            <Box 
              p={4} 
              flex="1" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              bg="gray.50"
            >
              <Image
                src={ele.imageTsrc}
                alt={ele.name}
                maxH={{ base: "180px", md: "220px", lg: "250px" }}
                w="auto"
                objectFit="contain"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>
            <Box p={4} flex="0">
              <Text
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                noOfLines={2}
                mb={2}
                color="gray.700"
              >
                {ele.name}
              </Text>
              <Flex align="center" mb={2}>
                <AiFillStar color="gold" />
                <Text ml={1} fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                  {ele.rating || "New"}
                </Text>
              </Flex>
              <Flex justify="space-between" align="center">
                <Text 
                  fontWeight="bold" 
                  color="blue.600"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  ₹{ele.price}
                </Text>
                {ele.discount > 0 && (
                  <Badge 
                    colorScheme="green" 
                    borderRadius="full" 
                    px={2}
                    fontSize={{ base: "xs", md: "sm" }}
                  >
                    {ele.discount}% OFF
                  </Badge>
                )}
              </Flex>
            </Box>
          </Box>
        </Link>
      ))}
    </Grid>
  );
};

ProductCard.propTypes = {
  type: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageTsrc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number,
      discount: PropTypes.number
    })
  )
};

// export default ProductCard;
export default ProductCard;
