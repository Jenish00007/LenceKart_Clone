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
import { Box, Flex, Select, Switch, Text, Image, Container } from "@chakra-ui/react";
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
      let url = `${API_URL}/product?`;
      const params = new URLSearchParams();
      
      if (sort) params.append('sort', sort);
      //if (types) params.append('productType', types);
      if (gender) params.append('gender', gender);
      if (shape) params.append('shape', shape);
      if (style) params.append('style', style);
      if (colors) params.append('colors', colors);
      if (page) params.append('page', page);
      if (searchQuery) params.append('search', searchQuery);
      if (topPicks) params.append('topPicks', topPicks);
      if (priceRange) params.append('selectedCategoryPrice', priceRange);
      
      url += params.toString();
      console.log("Request URL:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const postData = await response.json();
  
      setProducts(postData);
      console.log("Response data:", postData);
      setIsLoaded(false);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  return (
    <>
      <Navbar />
      <Box 
        as="main" 
        pt="103px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
        <Flex  px="2%" gap="4" cursor="pointer">
          <Flex
            w="17%"
            m={0}
            display={{ base: "none", xl: "inherit" }}
            flexDirection="column"
          >
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

            <hr />
          </Flex>

          <Box
            overflow="scroll"
            w={{ xl: "82%", base: "100%" }}
            borderLeft="1px solid"
            borderColor="gray.300"
            m={0}
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              p="7px"
              bg="#e2e8f0"
              borderColor="#ededed"
            >
              <Text fontSize="15px" color="gray.600" fontWeight="500">
                {searchParams.get('search') ? `Search Results for: ${searchParams.get('search')}` : 'EYEGLASSES & SUNGLASSES'}
              </Text>
              <Flex>
                <Flex alignItems="center">
                  <TbArrowsUpDown color="green" fontWeight="bold" />
                  <Text fontWeight="bold" color="green" fontSize="15px">
                    SortBy
                  </Text>
                </Flex>
                <Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  border="0.1px"
                  borderRadius="3px"
                  borderColor="black"
                  ml="4px"
                  p="0px"
                  fontSize="16px"
                  bg="whiteAlpha.900"
                >
                  <option value="">Select</option>
                  <option value="lowtohigh">Price : low to high</option>
                  <option value="hightolow">Price : high to low</option>
                </Select>
              </Flex>
            </Flex>
            {products.length !== 0 && (
              <Text mt="5px" textAlign="center" fontSize="15px">
                Showing {products.length} of 50 Results
              </Text>
            )}
            {isLoaded ? (
              <Loading />
            ) : products.length !== 0 ? (
              <ProductCard type={products} />
            ) : (
              <Text
                fontSize="28px"
                fontWeight="bolder"
                textAlign="center"
                color="gray"
                mt="5"
              >
                No Products Found 
              </Text>
            )}
          </Box>
        </Flex>
        <Pagination current={page} onChange={(value) => setPage(value)} />
      </Container>
      </Box>
      <Footer />
    </>
  );
};

export default NewProduct;
