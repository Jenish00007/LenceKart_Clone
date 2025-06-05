import React from "react";
import ProdDetails from "./ProdDetails";
import { ProdImage1 } from "./ProdImage";
import { Button, Image, Text, Flex, Box, Stack, Badge, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Accordion, HStack, Icon } from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';

const ProdCard = ({ type, handleCart, handleWishlist }) => {
  // Helper function to render product highlights
  const renderHighlights = () => {
    if (!type) return null;

    const highlights = [
      { label: "Recommended", value: type.isRecommended },
      { label: "Trending", value: type.isTrending },
      { label: "Latest", value: type.isLatest },
      { label: "Exclusive", value: type.isExclusive },
      { label: "Special Offer", value: type.isSpecialOffer },
      { label: "Best Seller", value: type.isBestSeller },
      { label: "Trial Pack", value: type.isTrialPack },
    ].filter(highlight => highlight.value);

    if (highlights.length === 0) return null; // Don't render if no highlights

    return (
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={2} mt={4} wrap="wrap">
        {highlights.map((highlight, index) => (
          <Badge key={index} colorScheme="green" p={1} borderRadius="md">
            {highlight.label}
          </Badge>
        ))}
      </Stack>
    );
  };

  return (
    <Box>
      <Text
        color="teal.800"
        fontSize="xl"
        fontWeight="bold"
        textAlign={{ lg: "left", md: "left", sm: "center", base: "center" }}
      >
        {type.name}
      </Text>
      <Text
        fontSize="sm"
        color="gray.600"
        textAlign={{ lg: "left", md: "left", sm: "center", base: "center" }}
        mb="2"
      >
        {type.caption}
      </Text>
      {/* <Text
        my="10px"
        fontSize="lg"
        textAlign={{ lg: "left", md: "left", sm: "center", base: "center" }}
        color="blue.500"
        textDecoration="underline"
        cursor="pointer"
        _hover={{ color: "blue.600" }}
        // onClick={() => window.open(type.productRefLink, '_blank')}
      >
        {type.productRefLink}
      </Text> */}
      {/* Display Product Highlights */}
      {renderHighlights()}

      {/* Display Rating and Review Count */}
      {(type?.rating > 0 || type?.reviewCount > 0) && (
        <HStack spacing={1} my={2}>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <Icon
                key={i}
                as={StarIcon}
                color={i < type?.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Text fontSize="sm" color="gray.600">({type?.reviewCount || 0} reviews)</Text>
        </HStack>
      )}

      <Text
        my="10px"
        fontWeight="600"
        color="gray.400"
        fontSize="15px"
        textAlign={{ lg: "left", md: "left", sm: "center", base: "center" }}
      >
        Size : {type.frameSize}
      </Text>
      <Box my="10px">
        <Text
          fontWeight="500"
          fontSize="18px"
          color="teal.500"
          textAlign={{ lg: "left", md: "left", sm: "center", base: "center" }}
        >
          ₹{type.price}{" "}
          <Text as="span"
            fontSize="18px"
            fontWeight="lighter"
            color="#727297"
            textDecoration="line-through"
            ml="2"
          >
            ₹{type.mPrice}{" "}
          </Text>
          {type?.discount > 0 && (
            <Text as="span"
              fontSize="16px"
              fontWeight="bold"
              color="green.500"
              ml="2"
            >
              ({type.discount}% off)
            </Text>
          )}
        </Text>
        <Text
          mt="-4"
          textAlign={{ lg: "left", md: "left", sm: "center", base: "center" }}
        >
          Frame + Lens
        </Text>
      </Box>
      <br />

      <Button
        p={{ lg: 7, base: 0 }}
        m={{ lg: "10px 20px", base: "10px auto" }}
        w={{ lg: "90%", base: "100%" }}
        color="white"
        bgColor="#00bac6"
        onClick={handleCart}
      >
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          gap="1"
          w={{ lg: "100%", sm: "50%", base: "50%" }}
        >
          <Text
            textAlign="center"
            fontSize={{ lg: "md", md: "md", base: "sm" }}
          >
            BUY
          </Text>

          {/* <Text fontSize="12px">(with 1 Year Warranty & 14 day Return)</Text> */}
        </Flex>
      </Button>
      <Button
        p={{ lg: 7, base: 0 }}
        m={{ lg: "10px 20px", base: "10px auto" }}
        w={{ lg: "90%", base: "100%" }}
        color="white"
        bgColor="#00bac6"
        onClick={handleWishlist}
        fontSize={{ lg: "md", md: "md", base: "sm" }}
      >
        Add to Wishlist
      </Button>
      {/* <Button
        p={{ lg: 7, base: 0 }}
        m={{ lg: "10px 20px", base: "10px auto" }}
        w={{ lg: "90%", base: "100%" }}
        bg="whiteAlpha.900"
        border="1px"
        borderColor="gray.400"
      >
        <Text ml="20" fontSize={{ lg: "md", md: "md", base: "sm" }}>
          Try On
        </Text>
        <Image
          src="https://static.lenskart.com/media/desktop/img/pdp/try_on_model.png"
          alt="img"
          ml="20"
        />
      </Button> */}
    

      <ProdDetails type={type} />

      {/* Review Section */}
      <Accordion allowMultiple w="100%" m="auto" mt={4}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight="500">
                Review ({type?.reviewCount || 0})
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {/* You can add dynamic review rendering here based on type.reviews */}
            <Text textAlign="center" mb="4">
              {type?.reviewCount > 0 ? "Display Reviews Here" : "No Reviews"}
            </Text>

            <Button m="auto" w="100%" bg="#00bac6" color="white">
              WRITE A REVIEW
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* {ProdImage1.map((ele, i) => (
        <Image src={ele.src} key={i} />
      ))} */}
    </Box>
  );
};

export default ProdCard;
