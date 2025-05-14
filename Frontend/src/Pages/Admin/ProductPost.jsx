import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Center,
  VStack,
  useToast,
  Select,
  Checkbox,
  Textarea,
  Grid,
  GridItem,
  Text,
  Image,
  Flex,
  Divider,
  Badge,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { API_URL } from "../../config";

const ProductPost = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing;
  const productData = location.state?.product;

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  const [formData, setFormData] = useState({
    imageTsrc: "",
    productRefLink: "",
    name: "",
    price: "",
    mPrice: "",
    shape: "",
    gender: "",
    style: "",
    dimension: "",
    productType: "",
    colors: "",
    frameType: "",
    trending: false,
    recommended: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && productData) {
      // Convert colors array to string for textarea
      const colorsString = Array.isArray(productData.colors) 
        ? productData.colors.join(', ') 
        : productData.colors;

      setFormData({
        imageTsrc: productData.imageTsrc || "",
        productRefLink: productData.productRefLink || "",
        name: productData.name || "",
        price: productData.price || "",
        mPrice: productData.mPrice || "",
        shape: productData.shape || "",
        gender: productData.gender || "",
        style: productData.style || "",
        dimension: productData.dimension || "",
        productType: productData.productType || "",
        colors: colorsString || "",
        frameType: productData.frameType || "",
        trending: productData.trending || false,
        recommended: productData.recommended || false
      });
    }
  }, [isEditing, productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validate required fields
      const requiredFields = ['imageTsrc', 'productRefLink', 'name', 'price', 'mPrice', 'productType'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing Required Fields",
          description: `Please fill in: ${missingFields.join(', ')}`,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        return;
      }

      // Convert colors string to array
      const colorsArray = formData.colors.split(',').map(color => color.trim()).filter(Boolean);

      const payload = {
        ...formData,
        colors: colorsArray,
        price: Number(formData.price),
        mPrice: Number(formData.mPrice),
        rating: isEditing ? productData.rating : 0,
        userRated: isEditing ? productData.userRated : 0,
        quantity: isEditing ? productData.quantity : 1,
        productId: isEditing ? productData.productId : `PROD${Date.now()}`,
        createdAt: isEditing ? productData.createdAt : new Date()
      };

      const url = isEditing 
        ? `${API_URL}/product/${productData._id}`
        : `${API_URL}/product`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 201 || response.status === 200) {
        toast({
          title: isEditing ? "Product Updated Successfully" : "Product Added Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom"
        });
        setTimeout(() => {
          navigate("/admin/products");
        }, 2000);
      } else {
        const { message } = await response.json();
        throw new Error(message || `Failed to ${isEditing ? 'update' : 'add'} product`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? 'update' : 'add'} product`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Center py={8}>
        <VStack
          w={{ lg: "1000px", md: "90%", sm: "95%", base: "95%" }}
          spacing={6}
          borderRadius="xl"
          boxShadow="2xl"
          p={8}
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
        >
          <Heading 
            fontSize="32px" 
            color={headingColor}
            textAlign="center"
            mb={4}
          >
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </Heading>

          <Grid
            templateColumns={{ lg: "repeat(2, 1fr)", base: "1fr" }}
            gap={6}
            w="100%"
          >
            {/* Left Column - Basic Info */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold" color="gray.600">
                  Basic Information
                </Text>
                <Divider />

                <FormControl isRequired>
                  <Text mb={2} fontSize="sm" color="gray.600">Product Name</Text>
                  <Input
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                    _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue.400" }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <Text mb={2} fontSize="sm" color="gray.600">Image URL</Text>
                  <Input
                    name="imageTsrc"
                    placeholder="Enter image URL"
                    value={formData.imageTsrc}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  />
                  {formData.imageTsrc && (
                    <Box mt={2} borderRadius="md" overflow="hidden">
                      <Image 
                        src={formData.imageTsrc} 
                        alt="Product preview" 
                        maxH="200px"
                        objectFit="contain"
                      />
                    </Box>
                  )}
                </FormControl>

                <FormControl isRequired>
                  <Text mb={2} fontSize="sm" color="gray.600">Product Reference</Text>
                  <Input
                    name="productRefLink"
                    placeholder="Enter product reference"
                    value={formData.productRefLink}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isRequired>
                    <Text mb={2} fontSize="sm" color="gray.600">Price</Text>
                    <Input
                      name="price"
                      type="number"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <Text mb={2} fontSize="sm" color="gray.600">Market Price</Text>
                    <Input
                      name="mPrice"
                      type="number"
                      placeholder="Enter market price"
                      value={formData.mPrice}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                    />
                  </FormControl>
                </Grid>
              </VStack>
            </GridItem>

            {/* Right Column - Specifications */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold" color="gray.600">
                  Specifications
                </Text>
                <Divider />

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <Text mb={2} fontSize="sm" color="gray.600">Shape</Text>
                    <Select
                      name="shape"
                      placeholder="Select shape"
                      value={formData.shape}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                    >
                      <option value="Round">Round</option>
                      <option value="Square">Square</option>
                      <option value="Rectangle">Rectangle</option>
                      <option value="Aviator">Aviator</option>
                      <option value="Cat Eye">Cat Eye</option>
                      <option value="Oval">Oval</option>
                      <option value="Geometric">Geometric</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <Text mb={2} fontSize="sm" color="gray.600">Gender</Text>
                    <Select
                      name="gender"
                      placeholder="Select gender"
                      value={formData.gender}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Kids">Kids</option>
                    </Select>
                  </FormControl>
                </Grid>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Style</Text>
                  <Select
                    name="style"
                    placeholder="Select style"
                    value={formData.style}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="Casual">Casual</option>
                    <option value="Formal">Formal</option>
                    <option value="Sports">Sports</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Vintage">Vintage</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Frame Dimension</Text>
                  <Input
                    name="dimension"
                    placeholder="Enter frame dimension"
                    value={formData.dimension}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl isRequired>
                  <Text mb={2} fontSize="sm" color="gray.600">Product Type</Text>
                  <Select
                    name="productType"
                    placeholder="Select product type"
                    value={formData.productType}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="eyeglasses">Eye Glasses</option>
                    <option value="sunglasses">Sun Glasses</option>
                    <option value="contact-lenses">Contact Lenses</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Frame Type</Text>
                  <Select
                    name="frameType"
                    placeholder="Select frame type"
                    value={formData.frameType}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="Full Rim">Full Rim</option>
                    <option value="Half Rim">Half Rim</option>
                    <option value="Rimless">Rimless</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Colors</Text>
                  <Textarea
                    name="colors"
                    placeholder="Enter colors (comma-separated)"
                    value={formData.colors}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <Flex gap={4} mt={2}>
                  <FormControl>
                    <Checkbox
                      name="trending"
                      isChecked={formData.trending}
                      onChange={handleChange}
                      size="lg"
                      colorScheme="blue"
                    >
                      <Badge colorScheme="green" fontSize="sm">Trending</Badge>
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <Checkbox
                      name="recommended"
                      isChecked={formData.recommended}
                      onChange={handleChange}
                      size="lg"
                      colorScheme="blue"
                    >
                      <Badge colorScheme="purple" fontSize="sm">Recommended</Badge>
                    </Checkbox>
                  </FormControl>
                </Flex>
              </VStack>
            </GridItem>
          </Grid>

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={isEditing ? "Updating Product..." : "Adding Product..."}
            mt={6}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default ProductPost;
