import { useState, useEffect, useRef } from "react";
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
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Progress,
  List,
  ListItem,
  ListIcon,
  Icon,
  useDisclosure,
  IconButton,
  FormLabel
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { API_URL } from "../../config";
import { CheckCircleIcon, TimeIcon, WarningIcon, DeleteIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

// Define sub-categories for each main category
const subCategories = {
  GLASSES: [
    "EYEGLASSES",
    "SUNGLASSES",
    "COMPUTER_GLASSES"
  ],
  CONTACT_LENSES: [
    "CONTACT_LENSES",
    "CONTACT_LENS_SOLUTION",
    "CONTACT_LENS_CASES",
    "CONTACT_LENS_ACCESSORIES"
  ],
  ACCESSORIES: [
    "CONTACT_LENS_SOLUTION",
    "CONTACT_LENS_CASES",
    "CONTACT_LENS_ACCESSORIES"
  ]
};

const UploadProgressModal = ({ isOpen, onClose, status, progress, currentStep }) => {
  const steps = [
    { id: 'mainImage', label: 'Main Image Upload' },
    { id: 'additionalImages', label: 'Additional Images Upload' },
    { id: 'formData', label: 'Form Data Submission' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Upload Progress</ModalHeader>
        <ModalCloseButton isDisabled={currentStep !== 'complete'} />
        <ModalBody pb={6}>
          <Progress 
            value={progress} 
            size="lg" 
            colorScheme="blue" 
            borderRadius="full"
            mb={4}
          />
          <List spacing={3}>
            {steps.map((step) => (
              <ListItem key={step.id} display="flex" alignItems="center">
                <ListIcon
                  as={
                    currentStep === 'complete' ? CheckCircleIcon :
                    currentStep === step.id ? TimeIcon :
                    steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id) ? CheckCircleIcon :
                    WarningIcon
                  }
                  color={
                    currentStep === 'complete' ? 'green.500' :
                    currentStep === step.id ? 'blue.500' :
                    steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id) ? 'green.500' :
                    'gray.400'
                  }
                />
                {step.label}
                {currentStep === step.id && (
                  <Text as="span" ml={2} color="blue.500">
                    ({progress}%)
                  </Text>
                )}
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const EditProduct = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing;
  const productData = location.state?.product;

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  const [selectedCategory, setSelectedCategory] = useState("GLASSES");
  const [formData, setFormData] = useState({
    name: "",
    imageTsrc: "",
    additionalImages: [],
    caption: "",
    price: "",
    mPrice: "",
    mainCategory: "GLASSES",
    subCategory: "",
    personCategory: "",
    gender: "",
    ageGroup: "",
    selectedCategoryPrice: "",
    brands: [],
    topPicks: "",
    // Glasses specific fields
    frameType: "",
    frameSize: "",
    frameWidth: "",
    weightGroup: "",
    shape: "",
    style: "",
    powerType: "",
    powerRange: {
      min: "",
      max: ""
    },
    // Contact Lenses specific fields
    isContactLensColor: false,
    contactLensColors: [],
    frameColors: [],
    // Accessories specific fields
    material: "",
    dimensions: "",
    capacity: "",
    // Common fields
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
    supportedPowers: ""
  });
  const [loading, setLoading] = useState(false);
  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadStep, setCurrentUploadStep] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Add this state variable below the existing ones
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  // Define specific colors for Contact Lenses based on backend enum
  const CONTACT_LENS_COLORS = [
    "Clear",
    "Black",
    "Brown",
    "Blue",
    "Green",
    "Grey",
    "Hazel",
    "Purple",
    "Red",
    "Silver",
    "White",
    "Multicolor",
    "Turquoise",
    "Not Applicable",
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

  // Define a specific color mapping for Contact Lenses
  const CONTACT_LENS_COLOR_MAPPING = {
    "Clear": "#FFFFFF", // Using white for clear, or could be rgba(255, 255, 255, 0)
    "Black": "#000000",
    "Brown": "#A52A2A",
    "Blue": "#0000FF",
    "Green": "#008000",
    "Grey": "#808080",
    "Hazel": "#8E7B65",
    "Purple": "#800080",
    "Red": "#FF0000",
    "Silver": "#C0C0C0",
    "White": "#FFFFFF",
    "Multicolor": "linear-gradient(45deg, #ff0000, #00ff00, #0000ff)",
    "Turquoise": "#40E0D0",
    "Not Applicable": "#E2E8F0"
  };

  useEffect(() => {
    if (isEditing && productData) {
      // Create a clean object to avoid issues with Mongoose document properties
      const cleanProductData = JSON.parse(JSON.stringify(productData));

      setFormData({
        // Spread clean data first
        ...cleanProductData,
        // Override specific fields with checks for array/object format
        powerRange: cleanProductData.powerRange || { min: "", max: "" },
        additionalImages: Array.isArray(cleanProductData.additionalImages) ? cleanProductData.additionalImages : [],
        brands: Array.isArray(cleanProductData.brands) ? cleanProductData.brands : ['Not Applicable'],
        lensFeatures: Array.isArray(cleanProductData.lensFeatures) ? cleanProductData.lensFeatures : [],
        frameColors: Array.isArray(cleanProductData.frameColors) ? cleanProductData.frameColors : [],
        contactLensColors: Array.isArray(cleanProductData.contactLensColors)
          ? cleanProductData.contactLensColors.filter(color => CONTACT_LENS_COLORS.includes(color))
          : [],
        contactLensSolutionSize: Array.isArray(cleanProductData.contactLensSolutionSize) ? cleanProductData.contactLensSolutionSize : [],
        // Ensure boolean fields are handled
        isRecommended: Boolean(cleanProductData.isRecommended),
        isTrending: Boolean(cleanProductData.isTrending),
        isLatest: Boolean(cleanProductData.isLatest),
        isExclusive: Boolean(cleanProductData.isExclusive),
        isSpecialOffer: Boolean(cleanProductData.isSpecialOffer),
        isBestSeller: Boolean(cleanProductData.isBestSeller),
        isTrialPack: Boolean(cleanProductData.isTrialPack),
        // Ensure numeric fields are handled as strings for input value
        price: String(cleanProductData.price || ''),
        mPrice: String(cleanProductData.mPrice || ''),
        discount: String(cleanProductData.discount || 0),
        quantity: String(cleanProductData.quantity || 1),
        rating: String(cleanProductData.rating || 0),
        reviewCount: String(cleanProductData.reviewCount || 0),

        // Set default values for fields that might be null/undefined in existing data
        subCategory: cleanProductData.subCategory || '',
        personCategory: cleanProductData.personCategory || '',
        gender: cleanProductData.gender || '',
        ageGroup: cleanProductData.ageGroup || '',
        selectedCategoryPrice: cleanProductData.selectedCategoryPrice || '',
        topPicks: cleanProductData.topPicks || 'Not Applicable',
        frameType: cleanProductData.frameType || '',
        frameSize: cleanProductData.frameSize || '',
        frameWidth: cleanProductData.frameWidth || '',
        weightGroup: cleanProductData.weightGroup === 'Medium' ? 'Average' : cleanProductData.weightGroup || '',
        shape: cleanProductData.shape || '',
        style: cleanProductData.style || '',
        powerType: cleanProductData.powerType || '',
        prescriptionType: cleanProductData.prescriptionType || '',
        supportedPowers: cleanProductData.mainCategory === 'ACCESSORIES' ? 'Not Applicable' : (cleanProductData.supportedPowers || ''),
        contactLensType: cleanProductData.contactLensType || '',
        contactLensMaterial: cleanProductData.contactLensMaterial || '',
        accessoryType: cleanProductData.accessoryType || '',
        accessorySize: cleanProductData.accessorySize || '',
        accessoryMaterial: cleanProductData.accessoryMaterial || '',
        dimensions: cleanProductData.dimensions || '',
        capacity: cleanProductData.capacity || '',
        material: cleanProductData.material || '',
      });

      // Set the selected category based on the product data
      setSelectedCategory(cleanProductData.mainCategory);

      // Set image previews if they exist
      if (cleanProductData.imageTsrc) {
        setMainImagePreview(cleanProductData.imageTsrc);
      }
      if (Array.isArray(cleanProductData.additionalImages)) {
        setAdditionalImagePreviews(cleanProductData.additionalImages);
      }
    }
  }, [isEditing, productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox fields
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }

    // Handle array fields
    if (name === 'brands' || name === 'lensFeatures' || name === 'frameColors' || 
        name === 'contactLensColors' || name === 'contactLensSolutionSize') {
      const values = value.split(',').map(item => item.trim());
      setFormData(prev => ({
        ...prev,
        [name]: values
      }));
      return;
    }

    // Handle power range fields
    if (name === 'powerRangeMin' || name === 'powerRangeMax') {
      setFormData(prev => ({
        ...prev,
        powerRange: {
          ...prev.powerRange,
          [name === 'powerRangeMin' ? 'min' : 'max']: value
        }
      }));
      return;
    }

    // Handle numeric fields
    if (['price', 'mPrice', 'discount', 'quantity', 'rating', 'reviewCount'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
      return;
    }

    // Handle all other fields
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };

      // Update supportedPowers for ACCESSORIES category
      if (name === 'mainCategory' && value === 'ACCESSORIES') {
        newData.supportedPowers = 'Not Applicable';
      }

      return newData;
    });
  };

  const handleArrayChange = (name, value) => {
    const values = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      [name]: values
    }));
  };

  const uploadImageToS3 = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/api/upload/single`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload image",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      throw error;
    }
  };

  const uploadMultipleImagesToS3 = async (files) => {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch(`${API_URL}/api/upload/multiple`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload images');
      }

      const data = await response.json();
      return data.imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload images",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      throw error;
    }
  };

  const handleImageChange = (e) => {
    const { name, type, files } = e.target;
     
    if (type === 'file') {
      if (name === 'mainImage') {
        const file = files[0];
        if (file) {
          // Create a temporary URL for preview
          const previewUrl = URL.createObjectURL(file);
          setMainImageFile(file);
          setMainImagePreview(previewUrl);
        }
      } else if (name === 'additionalImages') {
        const selectedFiles = Array.from(files);
        
        // Create previews
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setAdditionalImageFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setAdditionalImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadToastId = null;
    
    // Set formSubmitted to true to trigger validation display
    setFormSubmitted(true);

    try {
      setLoading(true);
      onOpen();
      setUploadProgress(0);
      
      // Validate required fields
      const requiredFields = [
        { name: 'name', label: 'Product Name' },
        { name: 'caption', label: 'Caption' },
        { name: 'price', label: 'Price' },
        { name: 'mPrice', label: 'Market Price' }
      ];

      // Special validation for sub-category
      if (!formData.subCategory) {
        toast({
          title: "Required Field",
          description: `Please select a sub-category for ${selectedCategory.toLowerCase()}`,
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        setLoading(false);
        onClose();
        return;
      }

      const missingFields = requiredFields.filter(field => !formData[field.name]);
      
      if (missingFields.length > 0) {
        missingFields.forEach(field => {
          toast({
            title: "Required Field",
            description: `Please provide ${field.label.toLowerCase()}`,
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "bottom"
          });
        });
        setLoading(false);
        onClose();
        return;
      }

      // Upload main image if selected
      let mainImageUrl = formData.imageTsrc;
      if (mainImageFile) {
        try {
          setCurrentUploadStep('mainImage');
          setUploadProgress(0);
          
          // Simulate upload progress
          const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return prev;
              }
              return prev + 10;
            });
          }, 200);

          mainImageUrl = await uploadImageToS3(mainImageFile);
          clearInterval(progressInterval);
          setUploadProgress(100);
        } catch (error) {
          setLoading(false);
          onClose();
          return;
        }
      }

      // Upload additional images if selected
      let additionalImageUrls = formData.additionalImages || [];
      if (additionalImageFiles.length > 0) {
        try {
          setCurrentUploadStep('additionalImages');
          setUploadProgress(0);
          
          // Simulate upload progress
          const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return prev;
              }
              return prev + 10;
            });
          }, 200);

          const newUrls = await uploadMultipleImagesToS3(additionalImageFiles);
          additionalImageUrls = [...additionalImageUrls, ...newUrls];
          clearInterval(progressInterval);
          setUploadProgress(100);
        } catch (error) {
          setLoading(false);
          onClose();
          return;
        }
      }

      // Submit form data
      setCurrentUploadStep('formData');
      setUploadProgress(0);

      // Format the data before sending
      const payload = {
        ...Object.fromEntries(Object.entries(formData).filter(([key]) => key !== 'supportedPowers')),
        mainCategory: selectedCategory,
        imageTsrc: mainImageUrl,
        additionalImages: additionalImageUrls,
        price: Number(formData.price),
        mPrice: Number(formData.mPrice),
        discount: Number(formData.discount) || 0,
        quantity: Number(formData.quantity) || 1,
        brands: Array.isArray(formData.brands) ? formData.brands : ['Not Applicable'],
        lensFeatures: Array.isArray(formData.lensFeatures) ? formData.lensFeatures : [],
        powerRange: {
          min: formData.powerRange?.min ? Number(formData.powerRange.min) : undefined,
          max: formData.powerRange?.max ? Number(formData.powerRange.max) : undefined
        },
        rating: isEditing ? formData.rating : 0,
        reviewCount: isEditing ? formData.reviewCount : 0,
        createdAt: isEditing ? formData.createdAt : new Date(),
        topPicks: formData.topPicks || 'Not Applicable',
        frameColors: Array.isArray(formData.frameColors) ? formData.frameColors : [],
        contactLensColors: Array.isArray(formData.contactLensColors) ? formData.contactLensColors : [],
        ageGroup: formData.ageGroup || 'Not Applicable',
        personCategory: formData.personCategory || 'Not Applicable',
        isContactLensColor: formData.isContactLensColor ? 'yes' : 'no',
        powerType: formData.powerType || 'Not Applicable',
        prescriptionType: formData.prescriptionType || 'Not Applicable',
        contactLensType: formData.contactLensType || 'Not Applicable',
        contactLensMaterial: formData.contactLensMaterial || 'Not Applicable',
        accessoryType: formData.accessoryType || 'Not Applicable',
        accessorySize: formData.accessorySize || 'Not Applicable',
        accessoryMaterial: formData.accessoryMaterial || 'Not Applicable',
        frameWidth: selectedCategory === 'GLASSES' ? formData.frameWidth : 'Not Applicable',
        frameSize: selectedCategory === 'GLASSES' ? formData.frameSize : 'Not Applicable',
        weightGroup: selectedCategory === 'GLASSES' && formData.weightGroup === 'Medium'
          ? 'Average'
          : formData.weightGroup || 'Not Applicable',
      };

      // Explicitly add supportedPowers after spreading formData with correct value
      payload.supportedPowers = selectedCategory === 'ACCESSORIES' ? 'Not Applicable' : formData.supportedPowers || 'Not Applicable';

      // Final enforcement of weightGroup mapping for GLASSES category in the payload
      if (payload.mainCategory === 'GLASSES' && payload.weightGroup === 'Medium') {
        payload.weightGroup = 'Average';
      }

      // Final check for supportedPowers just before sending
      if (payload.supportedPowers === '') {
        payload.supportedPowers = 'Not Applicable';
      }

      console.log('Sending payload:', payload);

      const url = isEditing 
        ? `${API_URL}/products/${productData._id}`
        : `${API_URL}/products`;

      const method = isEditing ? "PUT" : "POST";

      const adminToken = localStorage.getItem('adminToken');
      const headers = {
        "Content-Type": "application/json",
      };

      if (adminToken) {
        headers['Authorization'] = `Bearer ${adminToken}`;
      }

      const response = await fetch(url, {
        method,
        body: JSON.stringify(payload),
        headers: headers,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadProgress(100);
        setCurrentUploadStep('complete');
        
        // Show success animation
        toast({
          title: isEditing ? "Product Updated Successfully" : "Product Added Successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom"
        });

        // Close modal and redirect after delay
        setTimeout(() => {
          onClose();
          navigate("/admin/products");
        }, 1500);
      } else {
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
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      onClose();
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFormData(prev => ({
      ...prev,
      mainCategory: category,
      // Set default sub-category based on the selected category
      subCategory: category === "GLASSES" ? "EYEGLASSES" :
                  category === "CONTACT_LENSES" ? "CONTACT_LENSES" :
                  category === "ACCESSORIES" ? "CONTACT_LENS_ACCESSORIES" : "",
      // Set supportedPowers to Not Applicable when switching to ACCESSORIES
      supportedPowers: category === 'ACCESSORIES' ? 'Not Applicable' : prev.supportedPowers
    }));
  };

  // Add this function in the ProductPost component
  const handleDeleteAdditionalImage = (index) => {
    setAdditionalImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const renderGlassesForm = () => (
    <Card variant="outline" p={4}>
      <CardBody>
        <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
          Glasses Product Form
        </Text>
        <Divider mb={6} />
        <VStack spacing={5}>
          {/* Basic Information */}
          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Product Name <Text as="span" color="red.500">*</Text></Text>
            <Input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
              isInvalid={formSubmitted && !formData.name}
            />
            {formSubmitted && !formData.name && (
              <Text color="red.500" fontSize="sm" mt={1}>Product name is required</Text>
            )}
          </FormControl>
          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Upload Main Image <Text as="span" color="red.500">*</Text></Text>
            {mainImagePreview && (
              <Image src={mainImagePreview} alt="Main Product Preview" boxSize="100px" objectFit="cover" mb={2} />
            )}
            <Input
              name="mainImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
              ref={mainImageInputRef}
              display="none"
            />
            <Box
              border="2px dashed"
              borderColor={formSubmitted && !formData.imageTsrc ? "red.300" : "gray.300"}
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => mainImageInputRef.current.click()}
              _hover={{
                borderColor: "blue.500",
              }}
            >
              <Text>Drag and drop or click to upload main image</Text>
              {formSubmitted && !formData.imageTsrc && (
                <Text color="red.500" fontSize="sm" mt={1}>Main image is required</Text>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Additional Images</Text>
            <Wrap spacing={2} mb={2}>
              {additionalImagePreviews.map((preview, index) => (
                <Box key={index} position="relative">
                  <Image 
                    src={preview} 
                    alt={`Additional Preview ${index + 1}`} 
                    boxSize="80px" 
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <IconButton
                    aria-label="Delete image"
                    icon={<Text fontSize="sm" fontWeight="bold">×</Text>}
                    size="xs"
                    colorScheme="red"
                    position="absolute"
                    top="-2"
                    right="-2"
                    onClick={() => handleDeleteAdditionalImage(index)}
                    width="20px"
                    height="20px"
                    minWidth="20px"
                    borderRadius="full"
                    bg="red.500"
                    color="white"
                    _hover={{
                      bg: "red.600",
                      transform: "scale(1.1)",
                      transition: "all 0.2s"
                    }}
                  />
                </Box>
              ))}
            </Wrap>
            <Input
              name="additionalImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              size="lg"
              borderRadius="md"
              ref={additionalImagesInputRef}
              display="none"
            />
            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => additionalImagesInputRef.current.click()}
              _hover={{
                borderColor: "blue.500",
              }}
            >
              <Text>Drag and drop or click to upload additional images</Text>
            </Box>
          </FormControl>

          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Caption <Text as="span" color="red.500">*</Text></Text>
            <Textarea
              name="caption"
              placeholder="Enter product caption"
              value={formData.caption}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              minH="100px"
              isInvalid={formSubmitted && !formData.caption}
            />
            {formSubmitted && !formData.caption && (
              <Text color="red.500" fontSize="sm" mt={1}>Caption is required</Text>
            )}
          </FormControl>

          {/* Categories and Demographics */}
          <FormControl isRequired>
            <FormLabel>Sub Category</FormLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Select sub category"
            >
              {subCategories[formData.mainCategory]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Person Category</FormLabel>
            <Select
              name="personCategory"
              value={formData.personCategory}
              onChange={handleChange}
              placeholder="Select person category"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
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

          {/* Brand and Top Picks */}
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
            <Text mb={2} fontSize="sm" color="gray.600">Top Picks</Text>
            <Select
              name="topPicks"
              value={formData.topPicks}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Top Picks</option>
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

          {/* Power and Frame Details */}
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
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          <SimpleGrid columns={2} spacing={4}>
            <FormControl>
              <Text mb={2} fontSize="sm" color="gray.600">Min Power</Text>
              <Input
                name="powerRange.min"
                value={formData.powerRange.min}
                onChange={handleChange}
                placeholder="Enter minimum power"
                size="lg"
                borderRadius="md"
                h={inputHeight}
              />
            </FormControl>

            <FormControl>
              <Text mb={2} fontSize="sm" color="gray.600">Max Power</Text>
              <Input
                name="powerRange.max"
                value={formData.powerRange.max}
                onChange={handleChange}
                placeholder="Enter maximum power"
                size="lg"
                borderRadius="md"
                h={inputHeight}
              />
            </FormControl>
          </SimpleGrid>

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
              h={inputHeight}
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
              h={inputHeight}
            >
              <option value="">Select Frame Width</option>
              <option value="Not Applicable">Not Applicable</option>
              {Array.from({ length: 28 }, (_, i) => {
                const width = 123 + i;
                return (
                  <option key={width} value={`${width} mm`}>
                    {width} mm
                  </option>
                );
              })}
            </Select>
            <Text fontSize="xs" color="gray.500" mt={1}>
              Must be between 123-150 mm or "Not Applicable"
            </Text>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Weight Group</Text>
            <Select
              name="weightGroup"
              value={formData.weightGroup}
              onChange={(e) => {
                const value = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  weightGroup: value === 'Medium' ? 'Average' : value
                }));
              }}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Weight Group</option>
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="Heavy">Heavy</option>
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

          {/* Frame Colors */}
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

          {/* Lens Features */}
          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Lens Features</Text>
            <Wrap spacing={2}>
              {validLensFeatures.map((feature) => (
                <Tag
                  key={feature}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  cursor="pointer"
                  onClick={() => {
                    const newFeatures = formData.lensFeatures || [];
                    if (newFeatures.includes(feature)) {
                      setFormData({
                        ...formData,
                        lensFeatures: newFeatures.filter(f => f !== feature)
                      });
                    } else {
                      setFormData({
                        ...formData,
                        lensFeatures: [...newFeatures, feature]
                      });
                    }
                  }}
                  bg={formData.lensFeatures?.includes(feature) ? "blue.500" : "gray.200"}
                  color={formData.lensFeatures?.includes(feature) ? "white" : "gray.700"}
                  _hover={{
                    opacity: 0.8,
                    transform: "scale(1.05)",
                    transition: "all 0.2s"
                  }}
                >
                  {feature}
                </Tag>
              ))}
            </Wrap>
          </FormControl>

          {/* Price and Quantity */}
          <SimpleGrid columns={2} spacing={4}>
            <FormControl isRequired>
              <Text mb={2} fontSize="sm" color="gray.600">Price (₹) <Text as="span" color="red.500">*</Text></Text>
              <Input
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                size="lg"
                borderRadius="md"
                type="number"
                h={inputHeight}
                isInvalid={formSubmitted && (!formData.price || isNaN(Number(formData.price)))}
              />
               {formSubmitted && (!formData.price || isNaN(Number(formData.price))) && (
                <Text color="red.500" fontSize="sm" mt={1}>Price is required and must be a number</Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <Text mb={2} fontSize="sm" color="gray.600">Market Price (₹) <Text as="span" color="red.500">*</Text></Text>
              <Input
                name="mPrice"
                placeholder="Enter market price"
                value={formData.mPrice}
                onChange={handleChange}
                size="lg"
                borderRadius="md"
                type="number"
                h={inputHeight}
                isInvalid={formSubmitted && (!formData.mPrice || isNaN(Number(formData.mPrice)))}
              />
               {formSubmitted && (!formData.mPrice || isNaN(Number(formData.mPrice))) && (
                <Text color="red.500" fontSize="sm" mt={1}>Market Price is required and must be a number</Text>
              )}
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={2} spacing={4}>
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
                h={inputHeight}
              />
            </FormControl>
          </SimpleGrid>

          {/* Product Status */}
          <SimpleGrid columns={2} spacing={4}>
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

            <FormControl>
              <Checkbox
                name="isSpecialOffer"
                isChecked={formData.isSpecialOffer}
                onChange={handleChange}
                colorScheme="blue"
                size="lg"
              >
                Special Offer
              </Checkbox>
            </FormControl>

            <FormControl>
              <Checkbox
                name="isTrialPack"
                isChecked={formData.isTrialPack}
                onChange={handleChange}
                colorScheme="blue"
                size="lg"
              >
                Trial Pack
              </Checkbox>
            </FormControl>
          </SimpleGrid>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Supported Powers</Text>
            <Select
              name="supportedPowers"
              value={formData.supportedPowers}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Supported Powers</option>
              <option value="Supports All Powers">Supports All Powers</option>
              <option value="Supports Very High Power">Supports Very High Power</option>
              <option value="Supports High Power">Supports High Power</option>
              <option value="Upto Regular Power">Upto Regular Power</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderContactLensesForm = () => (
    <Card variant="outline" p={4}>
      <CardBody>
        <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
          Contact Lenses Product Form
        </Text>
        <Divider mb={6} />
        <VStack spacing={5}>
          {/* Basic Information */}
          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Product Name <Text as="span" color="red.500">*</Text></Text>
            <Input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
              isInvalid={formSubmitted && !formData.name}
            />
            {formSubmitted && !formData.name && (
              <Text color="red.500" fontSize="sm" mt={1}>Product name is required</Text>
            )}
          </FormControl>

          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Upload Main Image <Text as="span" color="red.500">*</Text></Text>
            {mainImagePreview && (
              <Image src={mainImagePreview} alt="Main Product Preview" boxSize="100px" objectFit="cover" mb={2} />
            )}
            <Input
              name="mainImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
              ref={mainImageInputRef}
              display="none"
            />
            <Box
              border="2px dashed"
              borderColor={formSubmitted && !formData.imageTsrc ? "red.300" : "gray.300"}
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => mainImageInputRef.current.click()}
              _hover={{
                borderColor: "blue.500",
              }}
            >
              <Text>Drag and drop or click to upload main image</Text>
              {formSubmitted && !formData.imageTsrc && (
                <Text color="red.500" fontSize="sm" mt={1}>Main image is required</Text>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Additional Images</Text>
            <Wrap spacing={2} mb={2}>
              {additionalImagePreviews.map((preview, index) => (
                <Box key={index} position="relative">
                  <Image 
                    src={preview} 
                    alt={`Additional Preview ${index + 1}`} 
                    boxSize="80px" 
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <IconButton
                    aria-label="Delete image"
                    icon={<Text fontSize="sm" fontWeight="bold">×</Text>}
                    size="xs"
                    colorScheme="red"
                    position="absolute"
                    top="-2"
                    right="-2"
                    onClick={() => handleDeleteAdditionalImage(index)}
                    width="20px"
                    height="20px"
                    minWidth="20px"
                    borderRadius="full"
                    bg="red.500"
                    color="white"
                    _hover={{
                      bg: "red.600",
                      transform: "scale(1.1)",
                      transition: "all 0.2s"
                    }}
                  />
                </Box>
              ))}
            </Wrap>
            <Input
              name="additionalImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              size="lg"
              borderRadius="md"
              ref={additionalImagesInputRef}
              display="none"
            />
            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => additionalImagesInputRef.current.click()}
              _hover={{
                borderColor: "blue.500",
              }}
            >
              <Text>Drag and drop or click to upload additional images</Text>
            </Box>
          </FormControl>

          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Caption <Text as="span" color="red.500">*</Text></Text>
            <Textarea
              name="caption"
              placeholder="Enter product caption"
              value={formData.caption}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              minH="100px"
              isInvalid={formSubmitted && !formData.caption}
            />
            {formSubmitted && !formData.caption && (
              <Text color="red.500" fontSize="sm" mt={1}>Caption is required</Text>
            )}
          </FormControl>

          {/* Categories and Demographics */}
          <FormControl isRequired>
            <FormLabel>Sub Category</FormLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Select sub category"
            >
              {subCategories[formData.mainCategory]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Person Category</FormLabel>
            <Select
              name="personCategory"
              value={formData.personCategory}
              onChange={handleChange}
              placeholder="Select person category"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
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

          {/* Brand and Price */}
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

          <SimpleGrid columns={2} spacing={4}>
            <FormControl isRequired>
              <Text mb={2} fontSize="sm" color="gray.600">Price (₹) <Text as="span" color="red.500">*</Text></Text>
              <Input
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                size="lg"
                borderRadius="md"
                type="number"
                h={inputHeight}
                isInvalid={formSubmitted && (!formData.price || isNaN(Number(formData.price)))}
              />
               {formSubmitted && (!formData.price || isNaN(Number(formData.price))) && (
                <Text color="red.500" fontSize="sm" mt={1}>Price is required and must be a number</Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <Text mb={2} fontSize="sm" color="gray.600">Market Price (₹) <Text as="span" color="red.500">*</Text></Text>
              <Input
                name="mPrice"
                placeholder="Enter market price"
                value={formData.mPrice}
                onChange={handleChange}
                size="lg"
                borderRadius="md"
                type="number"
                h={inputHeight}
                isInvalid={formSubmitted && (!formData.mPrice || isNaN(Number(formData.mPrice)))}
              />
               {formSubmitted && (!formData.mPrice || isNaN(Number(formData.mPrice))) && (
                <Text color="red.500" fontSize="sm" mt={1}>Market Price is required and must be a number</Text>
              )}
            </FormControl>
          </SimpleGrid>

          {/* Contact Lens Specific Details */}
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
                <Radio value="yes" colorScheme="blue" size="lg">Yes</Radio>
                <Radio value="no" colorScheme="blue" size="lg">No</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          {formData.isContactLensColor && (
            <FormControl>
              <Text mb={2} fontSize="sm" color="gray.600">Contact Lens Colors</Text>
              <Wrap spacing={2}>
                {CONTACT_LENS_COLORS.map((color) => (
                  <Tag
                    key={color}
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    cursor="pointer"
                    onClick={() => {
                      const newColors = formData.contactLensColors || [];
                      if (newColors.includes(color)) {
                        setFormData(prev => ({
                          ...prev,
                          contactLensColors: newColors.filter(c => c !== color)
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          contactLensColors: [...newColors, color]
                        }));
                      }
                    }}
                    bg={CONTACT_LENS_COLOR_MAPPING[color]}
                    color={color === "White" || color === "Clear" || color === "Transparent" || color === "Not Applicable" ? "black" : "white"}
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
                      bg={formData.contactLensColors?.includes(color) ? "rgba(0, 0, 0, 0.2)" : "transparent"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {formData.contactLensColors?.includes(color) && (
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
                      textShadow={color === "White" || color === "Clear" ? "0 0 2px rgba(0,0,0,0.3)" : "none"}
                    >
                      {color}
                    </Text>
                  </Tag>
                ))}
              </Wrap>
            </FormControl>
          )}

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Contact Lens Type</Text>
            <Select
              name="contactLensType"
              value={formData.contactLensType}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Contact Lens Type</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Contact Lens Material</Text>
            <Select
              name="contactLensMaterial"
              value={formData.contactLensMaterial}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Material</option>
              <option value="Silicone Hydrogel">Silicone Hydrogel</option>
              <option value="Hydrogel">Hydrogel</option>
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
              h={inputHeight}
            >
              <option value="">Select Power Type</option>
              <option value="contact_lens_power">Contact Lens Power</option>
              <option value="spherical_minus_cyl">Spherical Minus Cyl</option>
              <option value="spherical_plus_cyl">Spherical Plus Cyl</option>
              <option value="cylindrical_power">Cylindrical Power</option>
              <option value="toric_power">Toric Power</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          <SimpleGrid columns={2} spacing={4}>
            <FormControl>
              <Text mb={2} fontSize="sm" color="gray.600">Min Power</Text>
              <Input
                name="powerRange.min"
                value={formData.powerRange.min}
                onChange={handleChange}
                placeholder="Enter minimum power"
                size="lg"
                borderRadius="md"
                h={inputHeight}
              />
            </FormControl>

            <FormControl>
              <Text mb={2} fontSize="sm" color="gray.600">Max Power</Text>
              <Input
                name="powerRange.max"
                value={formData.powerRange.max}
                onChange={handleChange}
                placeholder="Enter maximum power"
                size="lg"
                borderRadius="md"
                h={inputHeight}
              />
            </FormControl>
          </SimpleGrid>

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

          {/* Lens Features */}
          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Lens Features</Text>
            <Wrap spacing={2}>
              {validLensFeatures.map((feature) => (
                <Tag
                  key={feature}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  cursor="pointer"
                  onClick={() => {
                    const newFeatures = formData.lensFeatures || [];
                    if (newFeatures.includes(feature)) {
                      setFormData({
                        ...formData,
                        lensFeatures: newFeatures.filter(f => f !== feature)
                      });
                    } else {
                      setFormData({
                        ...formData,
                        lensFeatures: [...newFeatures, feature]
                      });
                    }
                  }}
                  bg={formData.lensFeatures?.includes(feature) ? "blue.500" : "gray.200"}
                  color={formData.lensFeatures?.includes(feature) ? "white" : "gray.700"}
                  _hover={{
                    opacity: 0.8,
                    transform: "scale(1.05)",
                    transition: "all 0.2s"
                  }}
                >
                  {feature}
                </Tag>
              ))}
            </Wrap>
          </FormControl>

          {/* Additional Details */}
          <SimpleGrid columns={2} spacing={4}>
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
                h={inputHeight}
              />
            </FormControl>
          </SimpleGrid>

          {/* Product Status */}
          <SimpleGrid columns={2} spacing={4}>
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

            <FormControl>
              <Checkbox
                name="isSpecialOffer"
                isChecked={formData.isSpecialOffer}
                onChange={handleChange}
                colorScheme="blue"
                size="lg"
              >
                Special Offer
              </Checkbox>
            </FormControl>

            <FormControl>
              <Checkbox
                name="isTrialPack"
                isChecked={formData.isTrialPack}
                onChange={handleChange}
                colorScheme="blue"
                size="lg"
              >
                Trial Pack
              </Checkbox>
            </FormControl>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );

  const renderAccessoriesForm = () => (
    <Card variant="outline" p={4}>
      <CardBody>
        <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
          Accessories Product Form
        </Text>
        <Divider mb={6} />
        <VStack spacing={5}>
          {/* Basic Information */}
          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Product Name <Text as="span" color="red.500">*</Text></Text>
            <Input
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
              isInvalid={formSubmitted && !formData.name}
            />
            {formSubmitted && !formData.name && (
              <Text color="red.500" fontSize="sm" mt={1}>Product name is required</Text>
            )}
          </FormControl>

          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Upload Main Image <Text as="span" color="red.500">*</Text></Text>
            {mainImagePreview && (
              <Image src={mainImagePreview} alt="Main Product Preview" boxSize="100px" objectFit="cover" mb={2} />
            )}
            <Input
              name="mainImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
              ref={mainImageInputRef}
              display="none"
            />
            <Box
              border="2px dashed"
              borderColor={formSubmitted && !formData.imageTsrc ? "red.300" : "gray.300"}
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => mainImageInputRef.current.click()}
              _hover={{
                borderColor: "blue.500",
              }}
            >
              <Text>Drag and drop or click to upload main image</Text>
              {formSubmitted && !formData.imageTsrc && (
                <Text color="red.500" fontSize="sm" mt={1}>Main image is required</Text>
              )}
            </Box>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Additional Images</Text>
            <Wrap spacing={2} mb={2}>
              {additionalImagePreviews.map((preview, index) => (
                <Box key={index} position="relative">
                  <Image 
                    src={preview} 
                    alt={`Additional Preview ${index + 1}`} 
                    boxSize="80px" 
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <IconButton
                    aria-label="Delete image"
                    icon={<Text fontSize="sm" fontWeight="bold">×</Text>}
                    size="xs"
                    colorScheme="red"
                    position="absolute"
                    top="-2"
                    right="-2"
                    onClick={() => handleDeleteAdditionalImage(index)}
                    width="20px"
                    height="20px"
                    minWidth="20px"
                    borderRadius="full"
                    bg="red.500"
                    color="white"
                    _hover={{
                      bg: "red.600",
                      transform: "scale(1.1)",
                      transition: "all 0.2s"
                    }}
                  />
                </Box>
              ))}
            </Wrap>
            <Input
              name="additionalImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              size="lg"
              borderRadius="md"
              ref={additionalImagesInputRef}
              display="none"
            />
            <Box
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              onClick={() => additionalImagesInputRef.current.click()}
              _hover={{
                borderColor: "blue.500",
              }}
            >
              <Text>Drag and drop or click to upload additional images</Text>
            </Box>
          </FormControl>

          <FormControl isRequired>
            <Text mb={2} fontSize="sm" color="gray.600">Caption <Text as="span" color="red.500">*</Text></Text>
            <Textarea
              name="caption"
              placeholder="Enter product caption"
              value={formData.caption}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              minH="100px"
              isInvalid={formSubmitted && !formData.caption}
            />
            {formSubmitted && !formData.caption && (
              <Text color="red.500" fontSize="sm" mt={1}>Caption is required</Text>
            )}
          </FormControl>

          {/* Categories and Demographics */}
          <FormControl isRequired>
            <FormLabel>Sub Category</FormLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Select sub category"
            >
              {subCategories[formData.mainCategory]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Person Category</FormLabel>
            <Select
              name="personCategory"
              value={formData.personCategory}
              onChange={handleChange}
              placeholder="Select person category"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
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

          {/* Brand and Price */}
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

          <SimpleGrid columns={2} spacing={4}>
            <FormControl isRequired>
              <Text mb={2} fontSize="sm" color="gray.600">Price (₹) <Text as="span" color="red.500">*</Text></Text>
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
          </SimpleGrid>

          {/* Accessory Specific Details */}
          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Accessory Type</Text>
            <Select
              name="accessoryType"
              value={formData.accessoryType}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Accessory Type</option>
              <option value="CASE">Contact Lens Case</option>
              <option value="SOLUTION">Contact Lens Solution</option>
              <option value="CLEANER">Cleaner</option>
              <option value="MULTI_PURPOSE">Multi-Purpose</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Accessory Size</Text>
            <Select
              name="accessorySize"
              value={formData.accessorySize}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Accessory Size</option>
              <option value="SMALL">Small</option>
              <option value="MEDIUM">Medium</option>
              <option value="LARGE">Large</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Accessory Material</Text>
            <Select
              name="accessoryMaterial"
              value={formData.accessoryMaterial}
              onChange={handleChange}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Material</option>
              <option value="PLASTIC">Plastic</option>
              <option value="SILICONE">Silicone</option>
              <option value="METAL">Metal</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          <FormControl>
            <Text mb={2} fontSize="sm" color="gray.600">Contact Lens Solution Size</Text>
            <Select
              name="contactLensSolutionSize"
              value={formData.contactLensSolutionSize && formData.contactLensSolutionSize.length > 0 ? formData.contactLensSolutionSize[0] : ""}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactLensSolutionSize: e.target.value ? [e.target.value] : []
              }))}
              size="lg"
              borderRadius="md"
              h={inputHeight}
            >
              <option value="">Select Solution Size</option>
              <option value="Extra Small (10-25 ml)">Extra Small (10-25 ml)</option>
              <option value="Small (30-45 ml)">Small (30-45 ml)</option>
              <option value="Medium (50-65 ml)">Medium (50-65 ml)</option>
              <option value="Large (70-85 ml)">Large (70-85 ml)</option>
              <option value="Extra Large (90-100 ml)">Extra Large (90-100 ml)</option>
              <option value="Not Applicable">Not Applicable</option>
            </Select>
          </FormControl>

          {/* Additional Details */}
          <SimpleGrid columns={2} spacing={4}>
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
                h={inputHeight}
              />
            </FormControl>
          </SimpleGrid>

          {/* Product Status */}
          <SimpleGrid columns={2} spacing={4}>
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

            <FormControl>
              <Checkbox
                name="isSpecialOffer"
                isChecked={formData.isSpecialOffer}
                onChange={handleChange}
                colorScheme="blue"
                size="lg"
              >
                Special Offer
              </Checkbox>
            </FormControl>

            <FormControl>
              <Checkbox
                name="isTrialPack"
                isChecked={formData.isTrialPack}
                onChange={handleChange}
                colorScheme="blue"
                size="lg"
              >
                Trial Pack
              </Checkbox>
            </FormControl>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );

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

          <Tabs variant="enclosed"
            index={["GLASSES", "CONTACT_LENSES", "ACCESSORIES"].indexOf(selectedCategory)}
            onChange={(index) => {
            const categories = ["GLASSES", "CONTACT_LENSES", "ACCESSORIES"];
            handleCategoryChange(categories[index]);
          }}>
            <TabList mb="1em">
              <Tab>Glasses</Tab>
              <Tab>Contact Lenses</Tab>
              <Tab>Accessories</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {renderGlassesForm()}
              </TabPanel>
              <TabPanel>
                {renderContactLensesForm()}
              </TabPanel>
              <TabPanel>
                {renderAccessoriesForm()}
              </TabPanel>
            </TabPanels>
          </Tabs>

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
      <UploadProgressModal
        isOpen={isOpen}
        onClose={onClose}
        status={uploadProgress}
        progress={uploadProgress}
        currentStep={currentUploadStep}
      />
    </Box>
  );
};

export default EditProduct;