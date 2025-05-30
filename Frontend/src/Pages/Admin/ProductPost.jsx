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
    discount: 0
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

  useEffect(() => {
    if (isEditing && productData) {
      setFormData({
        ...productData,
        powerRange: productData.powerRange || { min: "", max: "" }
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
        topPicks: formData.topPicks || 'Not Applicable'
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

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Additional Images (comma-separated URLs)</Text>
                  <Textarea
                    name="additionalImages"
                    placeholder="Enter additional image URLs"
                    value={formData.additionalImages.join(', ')}
                    onChange={(e) => handleArrayChange('additionalImages', e.target.value)}
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl isRequired>
                  <Text mb={2} fontSize="sm" color="gray.600">Main Category</Text>
                  <Select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
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
              </VStack>
            </GridItem>

            {/* Right Column - Additional Details */}
            <GridItem>
              <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold" color="gray.600">
                  Additional Details
                </Text>
                <Divider />

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Person Category</Text>
                  <Select
                    name="personCategory"
                    value={formData.personCategory}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
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
                  <Text mb={2} fontSize="sm" color="gray.600">Category Price</Text>
                  <Select
                    name="selectedCategoryPrice"
                    value={formData.selectedCategoryPrice}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Category Price</option>
                    <option value="classic-eyeglasses">Classic Eyeglasses</option>
                    <option value="premium-eyeglasses">Premium Eyeglasses</option>
                    <option value="designer-eyeglasses">Designer Eyeglasses</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Brands</Text>
                  <Select
                    name="brands"
                    value={formData.brands[0] || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      brands: [e.target.value]
                    }))}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Brand</option>
                    {validBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
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
                  >
                    <option value="new-arrivals">New Arrivals</option>
                    <option value="best-sellers">Best Sellers</option>
                    <option value="trending">Trending</option>
                    <option value="exclusive">Exclusive</option>
                    <option value="essentials">Essentials</option>
                    <option value="lenskart-blu-lenses">Lenskart Blue Lenses</option>
                    <option value="tinted-eyeglasses">Tinted Eyeglasses</option>
                    <option value="computer-eyeglasses">Computer Eyeglasses</option>
                    <option value="progressive-eyeglasses">Progressive Eyeglasses</option>
                    <option value="pilot-style">Pilot Style</option>
                    <option value="power-sunglasses">Power Sunglasses</option>
                    <option value="polarized-sunglasses">Polarized Sunglasses</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Power Type</Text>
                  <Select
                    name="powerType"
                    value={formData.powerType}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
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

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <Text mb={2} fontSize="sm" color="gray.600">Min Power</Text>
                    <Input
                      name="powerRange.min"
                      placeholder="Enter min power"
                      value={formData.powerRange.min}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                      type="number"
                    />
                  </FormControl>

                  <FormControl>
                    <Text mb={2} fontSize="sm" color="gray.600">Max Power</Text>
                    <Input
                      name="powerRange.max"
                      placeholder="Enter max power"
                      value={formData.powerRange.max}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                      type="number"
                    />
                  </FormControl>
                </Grid>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Prescription Type</Text>
                  <Select
                    name="prescriptionType"
                    value={formData.prescriptionType}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Prescription Type</option>
                    <option value="Bifocal/Progressive Supported">Bifocal/Progressive Supported</option>
                    <option value="Single Vision Only">Single Vision Only</option>
                    <option value="Non-Prescription">Non-Prescription</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Supported Powers</Text>
                  <Select
                    name="supportedPowers"
                    value={formData.supportedPowers}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Supported Powers</option>
                    <option value="Supports All Powers">Supports All Powers</option>
                    <option value="Supports Very High Power">Supports Very High Power</option>
                    <option value="Supports High Power">Supports High Power</option>
                    <option value="Upto Regular Power">Upto Regular Power</option>
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
                  <Text mb={2} fontSize="sm" color="gray.600">Frame Size</Text>
                  <Select
                    name="frameSize"
                    value={formData.frameSize}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Frame Size</option>
                    <option value="Extra Narrow">Extra Narrow</option>
                    <option value="Narrow">Narrow</option>
                    <option value="Medium">Medium</option>
                    <option value="Wide">Wide</option>
                    <option value="Extra Wide">Extra Wide</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Frame Width</Text>
                  <Select
                    name="frameWidth"
                    value={formData.frameWidth}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Frame Width</option>
                    {Array.from({ length: 28 }, (_, i) => i + 123).map(width => (
                      <option key={width} value={`${width} mm`}>{width} mm</option>
                    ))}
                    <option value="Not Applicable">Not Applicable</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Weight Group</Text>
                  <Select
                    name="weightGroup"
                    value={formData.weightGroup}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Weight Group</option>
                    <option value="Light">Light</option>
                    <option value="Average">Average</option>
                    <option value="Heavy">Heavy</option>
                    <option value="Extra Heavy">Extra Heavy</option>
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
                  <Text mb={2} fontSize="sm" color="gray.600">Lens Features</Text>
                  <Select
                    name="lensFeatures"
                    value={formData.lensFeatures[0] || ""}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      lensFeatures: [e.target.value]
                    }))}
                    size="lg"
                    borderRadius="md"
                  >
                    <option value="">Select Lens Feature</option>
                    {validLensFeatures.map(feature => (
                      <option key={feature} value={feature}>{feature}</option>
                    ))}
                  </Select>
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <Text mb={2} fontSize="sm" color="gray.600">Price (₹)</Text>
                    <Input
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                      type="number"
                      isRequired
                    />
                  </FormControl>

                  <FormControl>
                    <Text mb={2} fontSize="sm" color="gray.600">Market Price (₹)</Text>
                    <Input
                      name="mPrice"
                      placeholder="Enter market price"
                      value={formData.mPrice}
                      onChange={handleChange}
                      size="lg"
                      borderRadius="md"
                      type="number"
                      isRequired
                    />
                  </FormControl>
                </Grid>

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
                  />
                </FormControl>

                <FormControl>
                  <Text mb={2} fontSize="sm" color="gray.600">Quantity</Text>
                  <Input
                    name="quantity"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="md"
                    type="number"
                    min="1"
                  />
                </FormControl>

                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl>
                    <Checkbox
                      name="isRecommended"
                      isChecked={formData.isRecommended}
                      onChange={handleChange}
                      colorScheme="blue"
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
                    >
                      Exclusive
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <Checkbox
                      name="isSpecialOffer"
                      isChecked={formData.isSpecialOffer}
                      onChange={handleChange}
                      colorScheme="blue"
                    >
                      Special Offer
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <Checkbox
                      name="isBestSeller"
                      isChecked={formData.isBestSeller}
                      onChange={handleChange}
                      colorScheme="blue"
                    >
                      Best Seller
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <Checkbox
                      name="isTrialPack"
                      isChecked={formData.isTrialPack}
                      onChange={handleChange}
                      colorScheme="blue"
                    >
                      Trial Pack
                    </Checkbox>
                  </FormControl>
                </Grid>
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
              w="200px"
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </Flex>
        </VStack>
      </Center>
    </Box>
  );
};

export default ProductPost;
