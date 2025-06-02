import React from 'react';
import { Box, Heading, Image, Flex } from '@chakra-ui/react';

const SectionBanner = ({ title, leftImage, rightImage }) => {
  return (
    <Box my={8}>
      <Heading textAlign="center" mb={6} fontSize="2xl" fontWeight="bold">
        {title}
      </Heading>
      <Flex justifyContent="space-between" gap={4}>
        <Box flex="1">
          <Image
            src={leftImage}
            alt="Left banner"
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </Box>
        <Box flex="1">
          <Image
            src={rightImage}
            alt="Right banner"
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default SectionBanner; 