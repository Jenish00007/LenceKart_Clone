import React from "react";
import { Box, Grid, Container } from "@chakra-ui/react";
import { FooterCard1, FooterCard2, FooterCard } from "./FooterCard";
import { services, about, helps } from "./FooterDetails";

const Footer  = () => {
  return (
    <Box
      bgColor="#000042"
      color="whiteAlpha.900"
      py={12}
      px={4}
    >
      <Container maxW="1400px">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "3fr 2fr"
          }}
          gap={12}
        >
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)"
            }}
            gap={8}
          >
            <FooterCard1 type={services} heading="Services" />
            <FooterCard1 type={about} heading="About Us" />
            <FooterCard1 type={helps} heading="Help" />
          </Grid>
          <FooterCard2 />
        </Grid>
        <FooterCard />
      </Container>
    </Box>
  );
};

export default Footer;
