import React from 'react';
import { Box, Container, Heading, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Input, Textarea, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Help = () => {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" color="blue.600">
            How Can We Help You?
          </Heading>

          <Box>
            <Heading as="h2" size="lg" mb={4} color="blue.500">
              Contact Us
            </Heading>
            <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" placeholder="Enter your name" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter your email" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input type="text" placeholder="Enter subject" />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea placeholder="How can we help you?" />
                  </FormControl>
                  <Button type="submit" colorScheme="blue" width="full">
                    Send Message
                  </Button>
                </VStack>
              </form>
            </Box>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4} color="blue.500">
              Customer Support
            </Heading>
            <Text fontSize="lg" mb={4}>
              Our customer support team is available 24/7 to assist you with any questions or concerns.
            </Text>
            <Box p={6} shadow="md" borderWidth="1px" borderRadius="lg">
              <VStack spacing={4} align="stretch">
                <Box>
                  <Heading as="h3" size="md" mb={2}>Email Support</Heading>
                  <Text>support@lensekart.com</Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2}>Phone Support</Heading>
                  <Text>+1 (800) 123-4567</Text>
                </Box>
                <Box>
                  <Heading as="h3" size="md" mb={2}>Live Chat</Heading>
                  <Text>Available 24/7 on our website</Text>
                </Box>
              </VStack>
            </Box>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4} color="blue.500">
              Frequently Asked Questions
            </Heading>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How do I track my order?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You can track your order by logging into your account and visiting the "Order History" section. 
                  You'll receive tracking information via email once your order ships.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What is your return policy?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  We offer a 30-day return policy for all eyewear. Items must be in original condition with all 
                  packaging and accessories. Please contact our customer support team to initiate a return.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How do I get my prescription verified?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  You can upload your prescription during checkout or email it to prescriptions@lensekart.com. 
                  Our team will verify it within 24 hours.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What payment methods do you accept?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Help; 