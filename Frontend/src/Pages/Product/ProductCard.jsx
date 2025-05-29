import { Link } from "react-router-dom";
import { Box, Flex, Grid, GridItem, Text, Image, Badge } from "@chakra-ui/react";
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
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.02)" }}
            >
              <Image
                src={ele.imageTsrc}
                alt={ele.name}
                height="200px"
                width="100%"
                objectFit="contain"
                p={2}
              />
              <Box p={4}>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  noOfLines={2}
                  mb={2}
                >
                  {ele.name}
                </Text>
                <Flex align="center" mb={2}>
                  <AiFillStar color="gold" />
                  <Text ml={1} fontSize="sm">
                    {ele.rating || "New"}
                  </Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text fontWeight="bold" color="blue.600">
                    ₹{ele.price}
                  </Text>
                  {ele.discount > 0 && (
                    <Badge colorScheme="green" borderRadius="full" px={2}>
                      {ele.discount}% OFF
                    </Badge>
                  )}
                </Flex>
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
      imageTsrc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number,
      discount: PropTypes.number
    })
  )
};

// export default ProductCard;
export default ProductCard;
