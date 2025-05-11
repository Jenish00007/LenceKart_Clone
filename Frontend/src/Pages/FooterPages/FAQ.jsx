import React from 'react';
import { Box, Container, Heading, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, keyframes } from '@chakra-ui/react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FAQ = () => {
  const faqCategories = [
    {
      title: "Ordering & Shipping",
      questions: [
        {
          q: "How do I place an order?",
          a: "Browse our collection, select your desired frames, add your prescription details, and proceed to checkout. You can pay using various payment methods including credit cards and digital wallets."
        },
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. International shipping may take 7-14 business days."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location."
        }
      ]
    },
    {
      title: "Prescription & Lenses",
      questions: [
        {
          q: "How do I add my prescription?",
          a: "You can enter your prescription details manually during checkout or upload a copy of your prescription. Our team will verify the prescription before processing your order."
        },
        {
          q: "What lens options do you offer?",
          a: "We offer various lens options including single vision, bifocal, progressive, and computer lenses. We also provide different lens materials like CR-39, polycarbonate, and high-index."
        },
        {
          q: "Can I get prescription sunglasses?",
          a: "Yes, we offer prescription sunglasses with various lens options including polarized and photochromic lenses."
        }
      ]
    },
    {
      title: "Returns & Warranty",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy for all eyewear. Items must be in original condition with all packaging and accessories. Prescription items can only be returned if there's a manufacturing defect."
        },
        {
          q: "Do you offer warranty on frames?",
          a: "Yes, we offer a 1-year warranty against manufacturing defects on all frames. This covers issues like broken hinges, loose screws, and frame defects."
        },
        {
          q: "How do I initiate a return?",
          a: "Contact our customer support team to initiate a return. You'll receive a return label and instructions. Returns must be initiated within 30 days of delivery."
        }
      ]
    },
    {
      title: "Virtual Try-On & Measurements",
      questions: [
        {
          q: "How does the virtual try-on work?",
          a: "Our virtual try-on feature uses augmented reality to show how frames look on your face. Simply upload a photo or use your device's camera to try frames virtually."
        },
        {
          q: "How do I measure my frame size?",
          a: "You can use our frame measurement guide or visit our Frame Size page for detailed instructions. We also provide a virtual measurement tool to help you find the perfect fit."
        },
        {
          q: "What if the frames don't fit?",
          a: "If the frames don't fit properly, you can return them within 30 days. We recommend using our virtual try-on and measurement tools to ensure the best fit before ordering."
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading 
            as="h1" 
            size="xl" 
            textAlign="center"
            bgGradient="linear(to-r, blue.600, purple.600)"
            bgClip="text"
            animation={`${fadeIn} 0.8s ease-out`}
          >
            Frequently Asked Questions
          </Heading>

          {faqCategories.map((category, index) => (
            <Box key={index}>
              <Heading as="h2" size="lg" mb={4} color="blue.500">
                {category.title}
              </Heading>
              <Accordion allowMultiple>
                {category.questions.map((item, qIndex) => (
                  <AccordionItem key={qIndex}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {item.q}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {item.a}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}

          <Box
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            _hover={{
              transform: "translateY(-5px)",
              boxShadow: "xl"
            }}
            transition="all 0.3s ease"
            animation={`${fadeIn} 0.8s ease-out`}
          >
            <Accordion allowMultiple>
              <AccordionItem border="none">
                <h2>
                  <AccordionButton 
                    _hover={{ 
                      bg: "blue.50",
                      color: "blue.500"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      How do I know my frame size?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>
                    You can find your frame size by checking the numbers on your current glasses. These numbers are typically located on the inside of the temple arm. The first number represents the lens width, the second is the bridge width, and the third is the temple length.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <h2>
                  <AccordionButton 
                    _hover={{ 
                      bg: "blue.50",
                      color: "blue.500"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      What is the return policy?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>
                    We offer a 14-day return policy for all our products. If you're not satisfied with your purchase, you can return it within 14 days of delivery. The product must be in its original condition with all tags and packaging intact.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <h2>
                  <AccordionButton 
                    _hover={{ 
                      bg: "blue.50",
                      color: "blue.500"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      How long does it take to process my order?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>
                    Standard orders typically take 2-3 business days to process. Custom prescriptions may take 5-7 business days. Once processed, delivery usually takes 2-3 business days depending on your location.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <h2>
                  <AccordionButton 
                    _hover={{ 
                      bg: "blue.50",
                      color: "blue.500"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Do you offer prescription lenses?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>
                    Yes, we offer a wide range of prescription lenses including single vision, bifocal, and progressive lenses. You can upload your prescription during checkout or visit our stores for a free eye check-up.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none">
                <h2>
                  <AccordionButton 
                    _hover={{ 
                      bg: "blue.50",
                      color: "blue.500"
                    }}
                    transition="all 0.3s ease"
                  >
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      How do I clean my glasses?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>
                    Use a microfiber cloth to clean your glasses. Avoid using paper towels or clothing as they can scratch the lenses. For stubborn dirt, use a small amount of lens cleaning solution. Always rinse your glasses with water before cleaning to remove any debris.
                  </Text>
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

export default FAQ; 