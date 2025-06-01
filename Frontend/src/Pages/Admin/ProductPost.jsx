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
  useColorModeValue,
  Tag,
  Wrap,
  RadioGroup,
  Stack,
  Radio,
  useBreakpointValue,
  Container,
  Card,
  CardBody,
  SimpleGrid
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
    name: "",
    imageTsrc: "",
    additionalImages: [],
    caption: "",
    price: "",
    mPrice: "",
    mainCategory: "",
    subCategory: "",
    personCategory: "",
    gender: "",
    ageGroup: "",
    selectedCategoryPrice: "",
    brands: [],
    topPicks: "",
    powerType: "",
    powerRange: {
      min: "",
      max: ""
    },
    prescriptionType: "",
    supportedPowers: "",
    frameType: "",
    shape: "",
    frameSize: "",
    frameWidth: "",
    weightGroup: "",
    style: "",
    lensFeatures: [],
    isRecommended: false,
    isTrending: false,
    isLatest: false,
    isExclusive: false,
    isSpecialOffer: false,
    isBestSeller: false,
    isTrialPack: false,
    rating: 0,
    reviewCount: 0,
    quantity: 1,
    discount: 0,
    frameColors: [],
    isContactLensColor: false
  });
  const [loading, setLoading] = useState(false);

  const validBrands = [
    "Ray-Ban",
    "Aqualens",
    "Bausch Lomb",
    "Soflens",
    "Acuvue",
    "Iconnect",
    "Alcon",
    "Oakley",
    "Prada",
    "Gucci",
    "Dior",
    "Cartier",
    "Versace",
    "Fendi",
    "Burberry",
    "Dolce & Gabbana",
    "Louis Vuitton",
    "Hermes",
    "Chanel",
    "Not Applicable"
  ];

  const validLensFeatures = [
    "Anti Glare",
    "Blue Light Block",
    "Polarized",
    "UV Protection",
    "Anti Scratch",
    "Water Resistant",
    "Photochromic",
    "High Index",
    "Day Night",
    "Not Applicable"
  ];

  const FRAME_COLORS = [
    "Black",
    "Transparent",
    "Gold",
    "Gunmetal",
    "Blue",
    "Silver",
    "Brown",
    "Green",
    "Grey",
    "Purple",
    "Pink",
    "Red",
    "Rose Gold",
    "Yellow",
    "Orange",
    "White",
    "Copper",
    "Maroon",
    "Multicolor",
    "Gradient",
    "Not Applicable"
  ];

  // Add this color mapping object after the FRAME_COLORS constant
  const FRAME_COLOR_MAPPING = {
    "Black": "#000000",
    "Transparent": "rgba(255, 255, 255, 0.5)",
    "Gold": "#FFD700",
    "Gunmetal": "#2A3439",
    "Blue": "#0000FF",
    "Silver": "#C0C0C0",
    "Brown": "#8B4513",
    "Green": "#008000",
    "Grey": "#808080",
    "Purple": "#800080",
    "Pink": "#FFC0CB",
    "Red": "#FF0000",
    "Rose Gold": "#B76E79",
    "Yellow": "#FFFF00",
    "Orange": "#FFA500",
    "White": "#FFFFFF",
    "Copper": "#B87333",
    "Maroon": "#800000",
    "Multicolor": "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)",
    "Gradient": "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)",
    "Not Applicable": "#E2E8F0"
  };

  useEffect(() => {
    if (isEditing && productData) {
      setFormData({
        ...productData,
        powerRange: productData.powerRange || { min: "", max: "" },
        additionalImages: Array.isArray(productData.additionalImages) ? productData.additionalImages : [],
        brands: Array.isArray(productData.brands) ? productData.brands : ['Not Applicable'],
        lensFeatures: Array.isArray(productData.lensFeatures) ? productData.lensFeatures : [],
        frameColors: Array.isArray(productData.frameColors) ? productData.frameColors : []
      });
    }
  }, [isEditing, productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayChange = (name, value) => {
    const values = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      [name]: values
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validate required fields
      const requiredFields = [
        'name', 'imageTsrc', 'caption',
        'price', 'mPrice', 'mainCategory', 'subCategory', 'topPicks'
      ];
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

      // Validate numeric fields
      if (isNaN(formData.price) || isNaN(formData.mPrice)) {
        toast({
          title: "Invalid Price",
          description: "Price and Market Price must be numbers",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        return;
      }

      // Format the data before sending
      const payload = {
        ...formData,
        // Convert string numbers to actual numbers
        price: Number(formData.price),
        mPrice: Number(formData.mPrice),
        discount: Number(formData.discount) || 0,
        quantity: Number(formData.quantity) || 1,
        // Ensure arrays are properly formatted
        additionalImages: Array.isArray(formData.additionalImages) ? formData.additionalImages : [],
        brands: Array.isArray(formData.brands) ? formData.brands : ['Not Applicable'],
        lensFeatures: Array.isArray(formData.lensFeatures) ? formData.lensFeatures : [],
        // Ensure powerRange is properly formatted
        powerRange: {
          min: formData.powerRange?.min ? Number(formData.powerRange.min) : undefined,
          max: formData.powerRange?.max ? Number(formData.powerRange.max) : undefined
        },
        // Set default values for required fields
        rating: isEditing ? formData.rating : 0,
        reviewCount: isEditing ? formData.reviewCount : 0,
        createdAt: isEditing ? formData.createdAt : new Date(),
        // Ensure topPicks is set
        topPicks: formData.topPicks || 'Not Applicable',
        frameColors: Array.isArray(formData.frameColors) ? formData.frameColors : []
      };

      console.log('Sending payload:', payload);

      const url = isEditing 
        ? `${API_URL}/products/${productData._id}`
        : `${API_URL}/products`;

      const method = isEditing ? "PUT" : "POST";
      const token = localStorage.getItem('token');

      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to continue",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        return;
      }

      const response = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
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
        // Handle validation errors from the server
        if (data.errors) {
          const errorMessages = data.errors.map(err => `${err.field}: ${err.message}`).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || `Failed to ${isEditing ? 'update' : 'add'} product`);
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

  // Add responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardPadding = useBreakpointValue({ base: 4, md: 8 });
  const gridColumns = useBreakpointValue({ base: "1fr", md: "repeat(2, 1fr)" });
  const inputHeight = useBreakpointValue({ base: "40px", md: "48px" });
  const headingSize = useBreakpointValue({ base: "24px", md: "32px" });
  const sectionSpacing = useBreakpointValue({ base: 6, md: 8 });

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Container maxW="container.xl" py={4}>
        <Card
          borderRadius="xl"
          boxShadow="2xl"
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          p={cardPadding}
        >
          <Heading 
            fontSize={headingSize}
            color={headingColor}
            textAlign="center"
            mb={6}
          >
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </Heading>

          <Grid
            templateColumns={gridColumns}
            gap={sectionSpacing}
            w="100%"
          >
            {/* Left Column - Basic Info */}
            <GridItem>
              <VStack spacing={sectionSpacing} align="stretch">
                <Card variant="outline" p={4}>
                  <CardBody>
                    <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
                      Basic Information
                    </Text>
                    <Divider mb={6} />

                    <VStack spacing={5}>
                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Product Name</Text>
                        <Input
                          name="name"
                          placeholder="Enter product name"
                          value={formData.name}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Caption</Text>
                        <Textarea
                          name="caption"
                          placeholder="Enter product caption"
                          value={formData.caption}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          minH="100px"
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
                          h={inputHeight}
                        />
                        {formData.imageTsrc && (
                          <Box mt={3} borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.200">
                            <Image 
                              src={formData.imageTsrc} 
                              alt="Product preview" 
                              maxH="200px"
                              objectFit="contain"
                            />
                          </Box>
                        )}
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Additional Images</Text>
                        <Textarea
                          name="additionalImages"
                          placeholder="Enter additional image URLs (comma-separated)"
                          value={Array.isArray(formData.additionalImages) ? formData.additionalImages.join(', ') : ''}
                          onChange={(e) => handleArrayChange('additionalImages', e.target.value)}
                          size="lg"
                          borderRadius="md"
                          minH="100px"
                        />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>

                <Card variant="outline" p={4}>
                  <CardBody>
                    <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
                      Categories
                    </Text>
                    <Divider mb={6} />

                    <VStack spacing={5}>
                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Main Category</Text>
                        <Select
                          name="mainCategory"
                          value={formData.mainCategory}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Main Category</option>
                          <option value="GLASSES">Glasses</option>
                          <option value="CONTACT_LENSES">Contact Lenses</option>
                        </Select>
                      </FormControl>

                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Sub Category</Text>
                        <Select
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Sub Category</option>
                          <option value="EYEGLASSES">Eye Glasses</option>
                          <option value="SUNGLASSES">Sun Glasses</option>
                          <option value="COMPUTER_GLASSES">Computer Glasses</option>
                          <option value="CONTACT_LENSES">Contact Lenses</option>
                          <option value="CONTACT_LENS_SOLUTION">Contact Lens Solution</option>
                          <option value="CONTACT_LENS_CASES">Contact Lens Cases</option>
                          <option value="CONTACT_LENS_ACCESSORIES">Contact Lens Accessories</option>
                        </Select>
                      </FormControl>

                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Top Picks</Text>
                        <Select
                          name="topPicks"
                          value={formData.topPicks}
                          onChange={handleChange}
                          placeholder="Select top picks category"
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="new-arrivals">New Arrivals</option>
                          <option value="best-sellers">Best Sellers</option>
                          <option value="trending">Trending</option>
                          <option value="exclusive">Exclusive</option>
                          <option value="essentials">Essentials</option>
                          <option value="lenskart-blu-lenses">Lenskart Blu Lenses</option>
                          <option value="tinted-eyeglasses">Tinted Eyeglasses</option>
                          <option value="computer-eyeglasses">Computer Eyeglasses</option>
                          <option value="progressive-eyeglasses">Progressive Eyeglasses</option>
                          <option value="pilot-style">Pilot Style</option>
                          <option value="power-sunglasses">Power Sunglasses</option>
                          <option value="polarized-sunglasses">Polarized Sunglasses</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </Select>
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>

            {/* Right Column - Additional Details */}
            <GridItem>
              <VStack spacing={sectionSpacing} align="stretch">
                <Card variant="outline" p={4}>
                  <CardBody>
                    <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
                      Product Details
                    </Text>
                    <Divider mb={6} />

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Person Category</Text>
                        <Select
                          name="personCategory"
                          value={formData.personCategory}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Person Category</option>
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="kids">Kids</option>
                          <option value="unisex">Unisex</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Gender</Text>
                        <Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                          <option value="Other">Other</option>
                          <option value="All">All</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Age Group</Text>
                        <Select
                          name="ageGroup"
                          value={formData.ageGroup}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Age Group</option>
                          <option value="Kids">Kids</option>
                          <option value="Teens">Teens</option>
                          <option value="Adults">Adults</option>
                          <option value="Seniors">Seniors</option>
                          <option value="Youth">Youth</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Brand</Text>
                        <Select
                          name="brands"
                          value={formData.brands[0] || ""}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            brands: [e.target.value]
                          }))}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Brand</option>
                          {validBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Price (₹)</Text>
                        <Input
                          name="price"
                          placeholder="Enter price"
                          value={formData.price}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          type="number"
                          h={inputHeight}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <Text mb={2} fontSize="sm" color="gray.600">Market Price (₹)</Text>
                        <Input
                          name="mPrice"
                          placeholder="Enter market price"
                          value={formData.mPrice}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          type="number"
                          h={inputHeight}
                        />
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Discount (%)</Text>
                        <Input
                          name="discount"
                          placeholder="Enter discount percentage"
                          value={formData.discount}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          type="number"
                          min="0"
                          max="100"
                          h={inputHeight}
                        />
                      </FormControl>
                    </SimpleGrid>
                  </CardBody>
                </Card>

                <Card variant="outline" p={4}>
                  <CardBody>
                    <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
                      Technical Specifications
                    </Text>
                    <Divider mb={6} />

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Power Type</Text>
                        <Select
                          name="powerType"
                          value={formData.powerType}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Power Type</option>
                          <option value="zero_power">Zero Power</option>
                          <option value="with_power">With Power</option>
                          <option value="single_vision">Single Vision</option>
                          <option value="bifocal">Bifocal</option>
                          <option value="progressive">Progressive</option>
                          <option value="reading">Reading</option>
                          <option value="contact_lens_power">Contact Lens Power</option>
                          <option value="spherical_minus_cyl">Spherical Minus Cyl</option>
                          <option value="spherical_plus_cyl">Spherical Plus Cyl</option>
                          <option value="cylindrical_power">Cylindrical Power</option>
                          <option value="toric_power">Toric Power</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Frame Type</Text>
                        <Select
                          name="frameType"
                          value={formData.frameType}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Frame Type</option>
                          <option value="Full Rim">Full Rim</option>
                          <option value="Half Rim">Half Rim</option>
                          <option value="Rimless">Rimless</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Shape</Text>
                        <Select
                          name="shape"
                          value={formData.shape}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Shape</option>
                          <option value="Round">Round</option>
                          <option value="Square">Square</option>
                          <option value="Rectangle">Rectangle</option>
                          <option value="Aviator">Aviator</option>
                          <option value="Cat Eye">Cat Eye</option>
                          <option value="Oval">Oval</option>
                          <option value="Geometric">Geometric</option>
                          <option value="Wayfarer">Wayfarer</option>
                          <option value="Clubmaster">Clubmaster</option>
                          <option value="Butterfly">Butterfly</option>
                          <option value="Wrap">Wrap</option>
                          <option value="Sports">Sports</option>
                          <option value="Spherical Contact Lense">Spherical Contact Lense</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Style</Text>
                        <Select
                          name="style"
                          value={formData.style}
                          onChange={handleChange}
                          size="lg"
                          borderRadius="md"
                          h={inputHeight}
                        >
                          <option value="">Select Style</option>
                          <option value="Casual">Casual</option>
                          <option value="Formal">Formal</option>
                          <option value="Sports">Sports</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Vintage">Vintage</option>
                          <option value="Classic">Classic</option>
                          <option value="Day Night">Day Night</option>
                          <option value="Modern">Modern</option>
                          <option value="Not Applicable">Not Applicable</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Color Contact Lens</Text>
                        <RadioGroup 
                          value={formData.isContactLensColor ? "yes" : "no"} 
                          onChange={(value) => setFormData(prev => ({
                            ...prev,
                            isContactLensColor: value === "yes"
                          }))}
                        >
                          <Stack direction="row" spacing={4}>
                            <Radio value="yes" colorScheme="blue" size="lg">
                              Yes
                            </Radio>
                            <Radio value="no" colorScheme="blue" size="lg">
                              No
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Min Power</Text>
                        <Input
                          name="powerRange.min"
                          value={formData.powerRange.min}
                          onChange={handleChange}
                          placeholder="Enter minimum power"
                        />
                      </FormControl>

                      <FormControl>
                        <Text mb={2} fontSize="sm" color="gray.600">Max Power</Text>
                        <Input
                          name="powerRange.max"
                          value={formData.powerRange.max}
                          onChange={handleChange}
                          placeholder="Enter maximum power"
                        />
                      </FormControl>

                      {formData.isContactLensColor && (
                        <FormControl>
                          <Text mb={2} fontSize="sm" color="gray.600">Frame Colors</Text>
                          <Wrap spacing={2}>
                            {FRAME_COLORS.map((color) => (
                              <Tag
                                key={color}
                                size="md"
                                borderRadius="full"
                                variant="solid"
                                cursor="pointer"
                                onClick={() => {
                                  const newColors = formData.frameColors || [];
                                  if (newColors.includes(color)) {
                                    setFormData({
                                      ...formData,
                                      frameColors: newColors.filter(c => c !== color)
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      frameColors: [...newColors, color]
                                    });
                                  }
                                }}
                                bg={FRAME_COLOR_MAPPING[color]}
                                color={color === "White" || color === "Yellow" || color === "Transparent" || color === "Not Applicable" ? "black" : "white"}
                                border={color === "White" ? "1px solid #E2E8F0" : "none"}
                                _hover={{
                                  opacity: 0.8,
                                  transform: "scale(1.05)",
                                  transition: "all 0.2s"
                                }}
                                position="relative"
                                overflow="hidden"
                              >
                                <Box
                                  position="absolute"
                                  top="0"
                                  left="0"
                                  right="0"
                                  bottom="0"
                                  bg={formData.frameColors?.includes(color) ? "rgba(0, 0, 0, 0.2)" : "transparent"}
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {formData.frameColors?.includes(color) && (
                                    <Box
                                      as="span"
                                      fontSize="lg"
                                      color="white"
                                      textShadow="0 0 2px rgba(0,0,0,0.5)"
                                    >
                                      ✓
                                    </Box>
                                  )}
                                </Box>
                                <Text
                                  px={3}
                                  py={1}
                                  fontWeight="medium"
                                  textShadow={color === "White" || color === "Yellow" ? "0 0 2px rgba(0,0,0,0.3)" : "none"}
                                >
                                  {color}
                                </Text>
                              </Tag>
                            ))}
                          </Wrap>
                        </FormControl>
                      )}
                    </SimpleGrid>
                  </CardBody>
                </Card>

                <Card variant="outline" p={4}>
                  <CardBody>
                    <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
                      Product Status
                    </Text>
                    <Divider mb={6} />

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                      <FormControl>
                        <Checkbox
                          name="isRecommended"
                          isChecked={formData.isRecommended}
                          onChange={handleChange}
                          colorScheme="blue"
                          size="lg"
                        >
                          Recommended
                        </Checkbox>
                      </FormControl>

                      <FormControl>
                        <Checkbox
                          name="isTrending"
                          isChecked={formData.isTrending}
                          onChange={handleChange}
                          colorScheme="blue"
                          size="lg"
                        >
                          Trending
                        </Checkbox>
                      </FormControl>

                      <FormControl>
                        <Checkbox
                          name="isLatest"
                          isChecked={formData.isLatest}
                          onChange={handleChange}
                          colorScheme="blue"
                          size="lg"
                        >
                          Latest
                        </Checkbox>
                      </FormControl>

                      <FormControl>
                        <Checkbox
                          name="isExclusive"
                          isChecked={formData.isExclusive}
                          onChange={handleChange}
                          colorScheme="blue"
                          size="lg"
                        >
                          Exclusive
                        </Checkbox>
                      </FormControl>
                    </SimpleGrid>
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>
          </Grid>

          <Flex justify="center" mt={8}>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={loading}
              onClick={handleSubmit}
              w={{ base: "100%", md: "200px" }}
              h="48px"
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
};

export default ProductPost;
