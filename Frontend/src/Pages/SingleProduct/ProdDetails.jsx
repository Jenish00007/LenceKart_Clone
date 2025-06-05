import {
  Button,
  Image,
  Input,
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Stack,
  Tag,
  TagLabel
} from "@chakra-ui/react";

const ProdDetails = ({ type }) => {
  // Helper function to render technical specifications
  const renderTechnicalSpecs = () => {
    if (!type) return null;

    const specs = [
      { label: "Product ID", value: type.productId },
      { label: "Frame Size", value: type.frameSize },
      { label: "Frame Width", value: type.frameWidth },
      { label: "Frame Type", value: type.frameType },
      { label: "Shape", value: type.shape },
      { label: "Style", value: type.style },
      { label: "Weight Group", value: type.weightGroup }
    ].filter(spec => spec.value);

    return (
      <Table variant="simple" size="sm">
        <Tbody>
          {specs.map((spec, index) => (
            <Tr key={index}>
              <Td fontWeight="bold" color="gray.600" width="40%">{spec.label}</Td>
              <Td>{spec.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  // Helper function to render category information
  const renderCategoryInfo = () => {
    if (!type) return null;

    const categories = [
     
      { label: "Person Category", value: type.personCategory },
      { label: "Gender", value: type.gender },
      { label: "Age Group", value: type.ageGroup }
    ].filter(cat => cat.value);

    return (
      <Table variant="simple" size="sm">
        <Tbody>
          {categories.map((cat, index) => (
            <Tr key={index}>
              <Td fontWeight="bold" color="gray.600" width="40%">{cat.label}</Td>
              <Td>{cat.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  // Helper function to render lens information
  const renderLensInfo = () => {
    if (!type) return null;

    const lensInfo = [
      { label: "Power Type", value: type.powerType },
      { label: "Prescription Type", value: type.prescriptionType },
      { label: "Supported Powers", value: type.supportedPowers },
      { label: "Lens Features", value: type.lensFeatures?.join(", ") }
    ].filter(info => info.value);

    return (
      <Table variant="simple" size="sm">
        <Tbody>
          {lensInfo.map((info, index) => (
            <Tr key={index}>
              <Td fontWeight="bold" color="gray.600" width="40%">{info.label}</Td>
              <Td>{info.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  // Helper function to render product highlights
  const renderHighlights = () => {
    if (!type) return null;

    const highlights = [
      { label: "Is Recommended", value: type.isRecommended },
      { label: "Is Trending", value: type.isTrending },
      { label: "Is Latest", value: type.isLatest },
      { label: "Is Exclusive", value: type.isExclusive },
      { label: "Is Special Offer", value: type.isSpecialOffer },
      { label: "Is Best Seller", value: type.isBestSeller },
      { label: "Is Trial Pack", value: type.isTrialPack }
    ].filter(highlight => highlight.value);

    return (
      <Stack spacing={2}>
        {highlights.map((highlight, index) => (
          <Badge key={index} colorScheme="green" p={2} borderRadius="md">
            {highlight.label}
          </Badge>
        ))}
      </Stack>
    );
  };

  // Helper function to render pricing information
  const renderPricingInfo = () => {
    if (!type) return null;

    return (
      <Table variant="simple" size="sm">
        <Tbody>
          <Tr>
            <Td fontWeight="bold" color="gray.600" width="40%">Price</Td>
            <Td>₹{type.price}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold" color="gray.600">Market Price</Td>
            <Td>₹{type.mPrice}</Td>
          </Tr>
          <Tr>
            <Td fontWeight="bold" color="gray.600">Discount</Td>
            <Td>{type.discount}%</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  };

  return (
    <Accordion defaultIndex={[0]} allowMultiple w="100%" m="auto">
      {/* Technical Information */}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="500">
              Technical Information 
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {renderTechnicalSpecs()}
        </AccordionPanel>
      </AccordionItem>

      {/* Category Information */}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="500">
              Category Information
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {renderCategoryInfo()}
        </AccordionPanel>
      </AccordionItem>

      {/* Lens Information */}
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontWeight="500">
              Lens Information
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {renderLensInfo()}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ProdDetails;
