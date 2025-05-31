import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loading from "./Loading";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination";
import ProductCard from "./ProductCard";
import ProdFilter from "./ProdFilter";
import ProdFrame from "./ProdFrame";
import { TbArrowsUpDown } from "react-icons/tb";
import { Box, Flex, Select, Switch, Text, Image, Container, SimpleGrid, useBreakpointValue, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import {
  Gender,
  ProductTypes,
  FrameColor,
  Frame1,
  Frame2
} from "./FilterDetails";
import { API_URL } from "../../config";
import { useSearchParams } from "react-router-dom";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [types, setTypes] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [gender, setGender] = useState("");
  const [frametype, setFrametype] = useState("");
  const [shape, setShape] = useState("");
  const [style, setStyle] = useState("");
  const [colors, setColors] = useState("");
  const [searchParams] = useSearchParams();
  
  const gridColumns = useBreakpointValue({
    base: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const fetchproduct = async () => {
    setIsLoaded(true);
    try {
      const searchQuery = searchParams.get('search') || '';
      const shapeParam = searchParams.get('shape') || '';
      const trending = searchParams.get('trending') || '';
      const frameType = searchParams.get('frameType') || '';
      const masterCategoryParam = searchParams.get('masterCategory') || '';
      const personCategoryParam = searchParams.get('personCategory') || '';
      const priceRange = searchParams.get('selectedCategoryPrice') || '';
      const topPicks = searchParams.get('topPicks') || '';
      
      // Initialize filters from URL params
      if (shapeParam) {
        setShape(shapeParam);
      }
      if (personCategoryParam) {
        setGender(personCategoryParam);
      }
      if (masterCategoryParam) {
        setTypes(masterCategoryParam);
      }
      if (frameType) {
        setShape(frameType);
      }

      // Construct URL with all parameters
      let url = `${API_URL}/products`;
      const params = new URLSearchParams();
      
      if (sort) params.append('sort', sort);
      
      // Person Category (Gender)
      if (gender) {
        const validGenders = ['Male', 'Female', 'Transgender', 'Other', 'All'];
        if (validGenders.includes(gender)) {
          params.append('gender', gender);
        }
      }

      // Shape
      if (shape) {
        const validShapes = [
          'Round', 'Square', 'Rectangle', 'Aviator', 'Cat Eye', 'Oval',
          'Geometric', 'Wayfarer', 'Clubmaster', 'Butterfly', 'Wrap', 'Sports'
        ];
        if (validShapes.includes(shape)) {
          params.append('mainCategory', 'GLASSES');
          params.append('shape', shape);
        }
      }

      // Sub Categories
      if (types) {
        const validSubCategories = [
          'EYEGLASSES',
          'SUNGLASSES',
          'COMPUTER_GLASSES',
          'CONTACT_LENSES',
          'CONTACT_LENS_SOLUTION',
          'CONTACT_LENS_CASES',
          'CONTACT_LENS_ACCESSORIES'
        ];
        if (validSubCategories.includes(types)) {
          params.append('subCategory', types);
        }
      }

      // Style
      if (style) {
        const validStyles = [
          'Casual', 'Formal', 'Sports', 'Fashion', 'Vintage', 'Classic',
          'Day Night', 'Modern'
        ];
        if (validStyles.includes(style)) {
          params.append('style', style);
        }
      }

      // Colors
      if (colors) params.append('colors', colors);

      // Pagination
      if (page) params.append('page', page);

      // Search
      if (searchQuery) params.append('search', searchQuery);

      // Top Picks
      if (topPicks) {
        const validTopPicks = [
          'new-arrivals', 'best-sellers', 'trending', 'exclusive',
          'essentials', 'lenskart-blu-lenses', 'tinted-eyeglasses',
          'computer-eyeglasses', 'progressive-eyeglasses', 'pilot-style',
          'power-sunglasses', 'polarized-sunglasses'
        ];
        if (validTopPicks.includes(topPicks)) {
          params.append('topPicks', topPicks);
        }
      }

      // Price Range (Category Price)
      if (priceRange) {
        const validPriceRanges = [
          'classic-eyeglasses',
          'premium-eyeglasses',
          'designer-eyeglasses'
        ];
        if (validPriceRanges.includes(priceRange)) {
          params.append('selectedCategoryPrice', priceRange);
        }
      }

      // Frame Type
      if (frametype) {
        const validFrameTypes = ['Full Rim', 'Half Rim', 'Rimless'];
        if (validFrameTypes.includes(frametype)) {
          params.append('frameType', frametype);
        }
      }
      
      url += '?' + params.toString();
      console.log("Request URL:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Check if the response has the expected structure
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Unexpected response format:", data);
        setProducts([]);
      }
      
      setIsLoaded(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, [page, sort, gender, types, frametype, shape, style, colors, searchParams]);

  const handleClick = (value) => {
    setFrametype(frametype === value ? "" : value);
  };

  const handleClick2 = (value) => {
    setShape(shape === value ? "" : value);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFrametype("");
    setShape("");
    setGender("");
    setTypes("");
    setColors("");
  };

  return (
    <>
      <Navbar />
      <Box 
        as="main" 
        pt="103px"
        minH="calc(100vh - 140px)"
        bg="gray.50"
      >
        <Container maxW="container.xl" py={8}>
          {/* Filter button and Drawer for mobile/tablet */}
          <Box display={{ base: "block", xl: "none" }} mb={1} mt={{ base: 10, md: 14 }}>
            <Button size="sm"
                  bg="#4fc3c6"
                  color="white"
                  _hover={{ 
                    bg: '#3bb3b6',
                    transform: "scale(1.01)",
                  }}
                  transition="all 0.3s ease"
                
                   colorScheme="teal" w="100%" onClick={onOpen} mb={2}>
              Filter
            </Button>
            {/* <Button colorScheme="gray" w="100%" onClick={handleResetFilters} mb={2}>
              Reset
            </Button> */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Filters</DrawerHeader>
                <DrawerBody>
                  <Button colorScheme="gray" w="100%" mb={4} onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                  <ProdFrame
                    heading={"FRAME TYPE"}
                    type={Frame1}
                    filter={handleClick}
                    selectedValue={frametype}
                  />
                  <ProdFrame
                    heading={"FRAME SHAPE"}
                    type={Frame2}
                    filter={handleClick2}
                    selectedValue={shape}
                  />
                  <ProdFilter
                    type={Gender}
                    heading={"GENDER"}
                    handlechange={setGender}
                    val={gender}
                    type1={ProductTypes}
                    heading1={"PRODUCT TYPE"}
                    handlechange1={setTypes}
                    val1={types}
                    type2={FrameColor}
                    heading2={"FRAME COLOR"}
                    handlechange2={setColors}
                    val2={colors}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
          <Flex 
            direction={{ base: "column", xl: "row" }} 
            gap={6}
          >
            {/* Sidebar for xl and up */}
            <Box
              w={{ base: "100%", xl: "17%" }}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              p={4}
              display={{ base: "none", xl: "block" }}
            >
              <Button colorScheme="gray" w="100%" mb={4} onClick={handleResetFilters}>
                Reset Filters
              </Button>
              <ProdFrame
                heading={"FRAME TYPE"}
                type={Frame1}
                filter={handleClick}
                selectedValue={frametype}
              />
              <ProdFrame
                heading={"FRAME SHAPE"}
                type={Frame2}
                filter={handleClick2}
                selectedValue={shape}
              />
              <ProdFilter
                type={Gender}
                heading={"GENDER"}
                handlechange={setGender}
                val={gender}
                type1={ProductTypes}
                heading1={"PRODUCT TYPE"}
                handlechange1={setTypes}
                val1={types}
                type2={FrameColor}
                heading2={"FRAME COLOR"}
                handlechange2={setColors}
                val2={colors}
              />
            </Box>
            {/* Main Content */}
            <Box
              w={{ base: "100%", xl: "83%" }}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              p={4}
            >
              {/* Header */}
              <Flex
                justifyContent="space-between"
                alignItems="center"
                p={4}
                borderBottom="1px"
                borderColor="gray.100"
                mb={4}
              >
                <Text fontSize="lg" fontWeight="500" color="gray.700">
                  {searchParams.get('search') 
                    ? `Search Results for: ${searchParams.get('search')}` 
                    : 'EYEGLASSES & SUNGLASSES'}
                </Text>
                
                <Flex alignItems="center" gap={2}>
                  <Flex alignItems="center" gap={1}>
                    <TbArrowsUpDown color="green" />
                    <Text fontWeight="500" color="green">
                      Sort By
                    </Text>
                  </Flex>
                  <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    size="sm"
                    w="200px"
                    borderColor="gray.200"
                    _hover={{ borderColor: "gray.300" }}
                  >
                    <option value="">Select</option>
                    <option value="lowtohigh">Price: Low to High</option>
                    <option value="hightolow">Price: High to Low</option>
                  </Select>
                </Flex>
              </Flex>

              {/* Results Count */}
              {products.length !== 0 && (
                <Text mb={4} color="gray.600">
                  Showing {products.length} of 50 Results
                </Text>
              )}

              {/* Products Grid */}
              {isLoaded ? (
                <Loading />
              ) : products && products.length > 0 ? (
                <ProductCard type={products} />
              ) : (
                <Text
                  fontSize="xl"
                  fontWeight="500"
                  textAlign="center"
                  color="gray.500"
                  py={10}
                >
                  {searchParams.get('search') 
                    ? `No products found for "${searchParams.get('search')}"`
                    : 'No Products Found'}
                </Text>
              )}

              {/* Pagination */}
              <Box mt={8}>
                <Pagination current={page} onChange={(value) => setPage(value)} />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default NewProduct;