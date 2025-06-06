import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart";
import { addToWishlist } from "../../redux/wishlist/wishlist.actions";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ProdCard from "./ProdCard";
import { ProdImage } from "./ProdImage";
import axios from "axios";
import { Grid, GridItem, Image, useToast, Box, useDisclosure, Container, Spinner, Center, Text, Stack } from "@chakra-ui/react";
import { API_URL } from "../../config";
import { AuthContext } from "../../ContextApi/AuthContext";
import Login from "../../Pages/Login/Login";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart?.cart || []);
  const { isAuth } = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setData(response.data.product);
        setSelectedImage(response.data.product.imageTsrc);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  const handleAddToCart = async () => {
    if (!isAuth) {
      onOpen();
      return;
    }

    try {
      const existingItem = cart.findIndex((item) => item.productId === data._id);
      if (existingItem === -1) {
        const cartItem = {
          productId: data._id,
          quantity: 1,
          price: data.price,
          name: data.name,
          image: data.imageTsrc,
          imageTsrc: data.imageTsrc,
          productType: data.productType,
          shape: data.shape || "Rectangle",
          gender: data.gender || "Unisex",
          style: data.style || "Classic"
        };
        
        // Save to localStorage first
        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        localStorage.setItem('cart', JSON.stringify([...currentCart, cartItem]));
        
        // Then dispatch to Redux
        await dispatch(addToCart(cartItem));
        
        toast({
          title: "Added to Cart",
          description: "Product has been added to your cart",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom"
        });
        
        setTimeout(() => {
          navigate("/shipping");
        }, 1000);
      } else {
        toast({
          title: "Product Already in Cart",
          description: "This product is already in your cart",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  const handleAddToWishlist = () => {
    if (!isAuth) {
      onOpen();
     
      return;
    }

    dispatch(addToWishlist(data));
    toast({
      title: "Added to Wishlist",
      description: "Product has been added to your wishlist",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom"
    });
  };

  const trackProductVisit = async () => {
    if (isAuth) {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        console.log('Tracking product visit for:', id);
        
        const response = await fetch(`${API_URL}/products/visit/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('Visit tracking response:', data);
        
        if (!response.ok) {
          console.error('Failed to track product visit:', data.message);
        }
      } catch (error) {
        console.error('Error tracking product visit:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box>
        <Navbar />
        <Center minH="calc(100vh - 140px)" pt="150px">
          <Spinner size="xl" color="teal.500" />
        </Center>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box>
        <Navbar />
        <Center minH="calc(100vh - 140px)" pt="150px">
          <Text>Product not found</Text>
        </Center>
      </Box>
    );
  }

  // Fallback helpers
  const getImage = () => data.imageTsrc || data.image || '/placeholder-image.png';
  const getPrice = () => (typeof data.price === 'number' && !isNaN(data.price) ? data.price : 'N/A');
  const getMPrice = () => (typeof data.mPrice === 'number' && !isNaN(data.mPrice) ? data.mPrice : 'N/A');
  const getField = (field) => data[field] || 'N/A';

  return (
    <Box>
      <Navbar />
      <Box 
        as="main" 
        pt="150px"
        minH="calc(100vh - 140px)"
      >
        <Container maxW="container.xl" py={8}>
          <Box style={{ display: 'none' }}>
            <Login isOpen={isOpen} onClose={onClose} />
          </Box>
     
          <Grid
            gap={5}
            m="auto"
            w="95%"
            justifyContent="space-around"
            templateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(1,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)"
            }}
          >
            {/* Main Image Grid Item */}
            <GridItem
              colSpan={{ base: 1, md: 1, lg: 2 }}
              borderRadius={10}
              p="20px"
              border="1px solid"
              borderColor="gray.300"
            >
              <Stack spacing={4}>
                {/* Main Product Image */}
                <Box 
                  borderRadius="md" 
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.200"
                  p={4}
                >
                  <Image 
                    src={selectedImage || data?.imageTsrc || '/placeholder-image.png'} 
                    maxH={{ base: "250px", md: "350px", lg: "400px" }}
                    maxW="100%"
                    objectFit="contain" 
                    mx="auto"
                    fallbackSrc="/placeholder-image.png"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.png'; }}
                  />
                </Box>

                {/* Additional Images Grid */}
                {data?.additionalImages && data.additionalImages.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={2}>Additional Views</Text>
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)"
                      }}
                      gap={3}
                    >
                      {/* Add main image as first thumbnail */}
                      <Box
                        border="1px solid"
                        borderColor={selectedImage === data.imageTsrc ? "blue.400" : "gray.200"}
                        borderRadius="md"
                        p={2}
                        cursor="pointer"
                        _hover={{ borderColor: "blue.400" }}
                        onClick={() => setSelectedImage(data.imageTsrc)}
                      >
                        <Image
                          src={data.imageTsrc}
                          boxSize="100px"
                          objectFit="contain"
                          mx="auto"
                          fallbackSrc="/placeholder-image.png"
                          onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.png'; }}
                        />
                      </Box>
                      
                      {/* Additional images */}
                      {data.additionalImages.map((imgUrl, index) => (
                        <Box
                          key={index}
                          border="1px solid"
                          borderColor={selectedImage === imgUrl ? "blue.400" : "gray.200"}
                          borderRadius="md"
                          p={2}
                          cursor="pointer"
                          _hover={{ borderColor: "blue.400" }}
                          onClick={() => setSelectedImage(imgUrl)}
                        >
                          <Image
                            src={imgUrl}
                            boxSize="100px"
                            objectFit="contain"
                            mx="auto"
                            fallbackSrc="/placeholder-image.png"
                            onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.png'; }}
                          />
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Stack>
            </GridItem>

            {/* Product Details Grid Item */}
            <GridItem
              colSpan={{ base: 1, md: 1, lg: 1 }}
              p={5}
            >
              <ProdCard
                type={{
                  ...data,
                  image: selectedImage || data?.imageTsrc,
                  price: getPrice(),
                  mPrice: getMPrice(),
                  modelNo: getField('modelNo'),
                  frameSize: getField('frameSize'),
                  frameWidth: getField('frameWidth'),
                  frameDimensions: getField('frameDimensions'),
                  frameColour: getField('frameColour'),
                }}
                handleCart={handleAddToCart}
                handleWishlist={handleAddToWishlist}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default SingleProduct;
