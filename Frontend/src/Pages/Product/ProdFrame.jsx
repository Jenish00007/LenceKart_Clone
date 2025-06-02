import { Box, Grid, GridItem, Text, Image } from "@chakra-ui/react";

const ProdFrame = ({ heading, type, filter, selectedValue }) => {
  return (
    <Box mb="20px">
      <br />
      <Text fontWeight="bold" mb="3px" color="gray.600" fontSize="15px">
        {heading}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)">
        {type.map((ele, i) => (
          <GridItem key={i}>
            <Box
              onClick={() => filter(ele.name)}
              mr="3px"
              border="1px solid"
              borderColor={selectedValue === ele.name ? "blue.500" : "gray.300"}
              _hover={{ border: selectedValue === ele.name ? "1px solid blue.500" : "5px solid gray" }}
              bg={selectedValue === ele.name ? "blue.50" : "transparent"}
            >
              <Image m="7px auto" width="70px" src={ele.src} />
              <Text
                mx="5px"
                textAlign="center"
                fontSize="14px"
                color={selectedValue === ele.name ? "blue.500" : "gray.500"}
              >
                {ele.title}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ProdFrame;
