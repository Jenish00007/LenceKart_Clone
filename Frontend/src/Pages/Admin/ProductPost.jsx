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
  Textarea
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
          navigate("/Products");
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
    <Box bg="gray.200" minH="100vh">
      <Navbar />
      <Center py={8}>
        <VStack
          w={{ lg: "650px", md: "650px", sm: "90%", base: "95%" }}
          spacing={4}
          borderRadius="xl"
          boxShadow="dark-lg"
          p={8}
          bg="whiteAlpha.900"
        >
          <Heading fontSize="30px">{isEditing ? 'Edit Product' : 'Add New Product'}</Heading>

          <FormControl isRequired>
            <Input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <Input
              name="imageTsrc"
              placeholder="Image URL"
              value={formData.imageTsrc}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <Input
              name="productRefLink"
              placeholder="Product Reference Link"
              value={formData.productRefLink}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <Input
              name="mPrice"
              type="number"
              placeholder="Market Price"
              value={formData.mPrice}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <Select
              name="shape"
              placeholder="Select Shape"
              value={formData.shape}
              onChange={handleChange}
              size="lg"
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
            <Select
              name="gender"
              placeholder="Select Gender"
              value={formData.gender}
              onChange={handleChange}
              size="lg"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
            </Select>
          </FormControl>

          <FormControl>
            <Select
              name="style"
              placeholder="Select Style"
              value={formData.style}
              onChange={handleChange}
              size="lg"
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Sports">Sports</option>
              <option value="Fashion">Fashion</option>
              <option value="Vintage">Vintage</option>
            </Select>
          </FormControl>

          <FormControl>
            <Input
              name="dimension"
              placeholder="Frame Dimension"
              value={formData.dimension}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl isRequired>
            <Select
              name="productType"
              placeholder="Select Product Type"
              value={formData.productType}
              onChange={handleChange}
              size="lg"
            >
              <option value="eyeglasses">Eye Glasses</option>
              <option value="sunglasses">Sun Glasses</option>
              <option value="contact-lenses">Contact Lenses</option>
            </Select>
          </FormControl>

          <FormControl>
            <Select
              name="frameType"
              placeholder="Select Frame Type"
              value={formData.frameType}
              onChange={handleChange}
              size="lg"
            >
              <option value="Full Rim">Full Rim</option>
              <option value="Half Rim">Half Rim</option>
              <option value="Rimless">Rimless</option>
            </Select>
          </FormControl>

          <FormControl>
            <Textarea
              name="colors"
              placeholder="Enter colors (comma-separated)"
              value={formData.colors}
              onChange={handleChange}
              size="lg"
            />
          </FormControl>

          <FormControl>
            <Checkbox
              name="trending"
              isChecked={formData.trending}
              onChange={handleChange}
              size="lg"
            >
              Trending Product
            </Checkbox>
          </FormControl>

          <FormControl>
            <Checkbox
              name="recommended"
              isChecked={formData.recommended}
              onChange={handleChange}
              size="lg"
            >
              Recommended Product
            </Checkbox>
          </FormControl>

          <Button
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={isEditing ? "Updating Product..." : "Adding Product..."}
          >
            {isEditing ? 'Update Product' : 'Add Product'}
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default ProductPost;
