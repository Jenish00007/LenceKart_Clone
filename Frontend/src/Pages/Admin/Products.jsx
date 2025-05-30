import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  Flex,
  Heading,
  Text,
  Badge,
  Image,
  useToast,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  useColorModeValue,
  Card,
  CardBody,
  Stack,
  HStack,
  VStack,
  Divider,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Spinner,
  Center,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import './AdminPages.css';
import { API_URL } from '../../config';
import { MdRefresh } from 'react-icons/md';

// Constants
const ITEMS_PER_PAGE = 10;
const PRICE_RANGES = [
  { label: "Rs. 500-999", value: "500-999" },
  { label: "Rs. 1000-1499", value: "1000-1499" },
  { label: "Rs. 1500-1999", value: "1500-1999" },
  { label: "Rs. 2000-2499", value: "2000-2499" },
  { label: "Rs. 2500-4999", value: "2500-4999" },
  { label: "Rs. 5000-9999", value: "5000-9999" },
  { label: "Rs. 10000-14999", value: "10000-14999" },
  { label: "Rs. 15000+", value: "15000+" }
];

// Update BRANDS to match backend model
const BRANDS = [
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

// Update SHAPES to match backend model
const SHAPES = [
  "Round",
  "Square",
  "Rectangle",
  "Aviator",
  "Cat Eye",
  "Oval",
  "Geometric",
  "Wayfarer",
  "Clubmaster",
  "Butterfly",
  "Wrap",
  "Sports",
  "Spherical Contact Lense",
  "Not Applicable"
];

// Update STYLES to match backend model
const STYLES = [
  "Casual",
  "Formal",
  "Sports",
  "Fashion",
  "Vintage",
  "Classic",
  "Day Night",
  "Modern",
  "Not Applicable"
];

// Update POWER_TYPES to match backend model
const POWER_TYPES = [
  "zero_power",
  "with_power",
  "single_vision",
  "bifocal",
  "progressive",
  "reading",
  "contact_lens_power",
  "spherical_minus_cyl",
  "spherical_plus_cyl",
  "cylindrical_power",
  "toric_power",
  "Not Applicable"
];

const DISCOUNT_RANGES = [
  { label: "10% and above", value: "10" },
  { label: "20% and above", value: "20" },
  { label: "30% and above", value: "30" },
  { label: "40% and above", value: "40" },
  { label: "50% and above", value: "50" }
];

// Update TOP_PICKS to match backend model
const TOP_PICKS = [
  "new-arrivals",
  "best-sellers",
  "trending",
  "exclusive",
  "essentials",
  "lenskart-blu-lenses",
  "tinted-eyeglasses",
  "computer-eyeglasses",
  "progressive-eyeglasses",
  "pilot-style",
  "power-sunglasses",
  "polarized-sunglasses",
  "Not Applicable"
];

// API Service
const productService = {
  fetchProducts: async (params) => {
    const response = await fetch(`${API_URL}/products?${params}`);
    return response.json();
  },
  deleteProduct: async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    return response.json();
  }
};

// Sub-components
const ProductFilters = ({ filters, onFilterChange, onResetFilters }) => {
  const cardBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Card bg={cardBg} p={4}>
      <CardBody>
        <VStack spacing={4}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} width="100%">
            <GridItem>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search products..."
                  value={filters.basic.searchQuery}
                  onChange={(e) => onFilterChange('basic', 'searchQuery', e.target.value)}
                />
              </InputGroup>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Product Type"
                value={filters.basic.filter}
                onChange={(e) => onFilterChange('basic', 'filter', e.target.value)}
              >
                <option value="eyeglasses">Eye Glasses</option>
                <option value="sunglasses">Sun Glasses</option>
                <option value="contact-lenses">Contact Lenses</option>
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Person Category"
                value={filters.product.gender}
                onChange={(e) => onFilterChange('product', 'gender', e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
                <option value="Kids">Kids</option>
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Frame Type"
                value={filters.product.frameType}
                onChange={(e) => onFilterChange('product', 'frameType', e.target.value)}
              >
                <option value="Full Rim">Full Rim</option>
                <option value="Half Rim">Half Rim</option>
                <option value="Rimless">Rimless</option>
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Brand"
                value={filters.product.brand}
                onChange={(e) => onFilterChange('product', 'brand', e.target.value)}
              >
                {BRANDS.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Shape"
                value={filters.product.shape}
                onChange={(e) => onFilterChange('product', 'shape', e.target.value)}
              >
                {SHAPES.map(shape => (
                  <option key={shape} value={shape}>{shape}</option>
                ))}
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Style"
                value={filters.product.style}
                onChange={(e) => onFilterChange('product', 'style', e.target.value)}
              >
                {STYLES.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Power Type"
                value={filters.product.powerType}
                onChange={(e) => onFilterChange('product', 'powerType', e.target.value)}
              >
                {POWER_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Discount"
                value={filters.product.discount}
                onChange={(e) => onFilterChange('product', 'discount', e.target.value)}
              >
                {DISCOUNT_RANGES.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Price Range"
                value={filters.technical.priceRange}
                onChange={(e) => onFilterChange('technical', 'priceRange', e.target.value)}
              >
                {PRICE_RANGES.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Sort By"
                value={filters.basic.sort}
                onChange={(e) => onFilterChange('basic', 'sort', e.target.value)}
              >
                <option value="lowtohigh">Price: Low to High</option>
                <option value="hightolow">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </Select>
            </GridItem>

            <GridItem>
              <Select
                placeholder="Top Pick"
                value={filters.features.topPick}
                onChange={(e) => onFilterChange('features', 'topPick', e.target.value)}
              >
                {TOP_PICKS.map(pick => (
                  <option key={pick} value={pick}>
                    {pick.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </Select>
            </GridItem>
          </Grid>
          <Button
            leftIcon={<MdRefresh />}
            colorScheme="gray"
            variant="outline"
            onClick={onResetFilters}
            width="200px"
          >
            Reset Filters
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

const ProductTable = ({ products, onEdit, onDelete }) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Card bg={bgColor} overflowX="auto">
      <CardBody>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Price</Th>
              <Th>Rating</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product._id}>
                <Td>
                  <Image
                    src={product.imageTsrc || product.image || '/placeholder-image.png'}
                    alt={product.name || "Product Image"}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                    fallbackSrc="/placeholder-image.png"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </Td>
                <Td>
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">{product.name || "Product Name"}</Text>
                    <Text fontSize="sm" color="gray.500">{product.productRefLink || "No Reference"}</Text>
                  </VStack>
                </Td>
                <Td>
                  <Badge colorScheme={
                    product.productType === 'eyeglasses' ? 'blue' :
                    product.productType === 'sunglasses' ? 'orange' : 'purple'
                  }>
                    {product.productType || "Unknown"}
                  </Badge>
                </Td>
                <Td>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">₹{product.price || 0}</Text>
                    <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                      ₹{product.mPrice || 0}
                    </Text>
                  </VStack>
                </Td>
                <Td>
                  <HStack>
                    <Text>{product.rating}</Text>
                    <Text color="yellow.400">★</Text>
                    <Text fontSize="sm" color="gray.500">({product.userRated})</Text>
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    {product.trending && (
                      <Badge colorScheme="green">Trending</Badge>
                    )}
                    {product.recommended && (
                      <Badge colorScheme="purple">Recommended</Badge>
                    )}
                  </HStack>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Tooltip label="Edit Product">
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => onEdit(product)}
                      />
                    </Tooltip>
                    <Tooltip label="Delete Product">
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => onDelete(product._id)}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <Flex justify="center" mt={4}>
      <HStack spacing={4}>
        <Button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          isDisabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <Text>Page {page} of {totalPages}</Text>
        <Button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          isDisabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );
};

const Products = () => {
  // State management
  const [productState, setProductState] = useState({
    products: [],
    loading: true,
    editingProduct: null,
    deleteProductId: null,
    isDeleteDialogOpen: false,
    page: 1,
    totalPages: 1,
    totalProducts: 0,
    searchQuery: "",
    error: null
  });

  const [filters, setFilters] = useState({
    basic: {
      sort: "",
      filter: "",
      searchQuery: ""
    },
    product: {
      gender: "",
      shape: "",
      style: "",
      frameType: "",
      brand: "",
      powerType: "",
      discount: ""
    },
    technical: {
      prescriptionType: "",
      supportedPowers: "",
      priceRange: ""
    },
    appearance: {
      frameColors: []
    },
    features: {
      topPick: ""
    }
  });

  const [loadingStates, setLoadingStates] = useState({
    fetching: false,
    deleting: false,
    filtering: false
  });

  // Hooks
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = React.useRef();

  // Memoized values
  const sortedProducts = useMemo(() => {
    return productState.products.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });
  }, [productState.products]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => {
      setProductState(prev => ({ ...prev, searchQuery: query }));
    }, 300),
    []
  );

  // Fetch data
  const fetchData = async () => {
    setLoadingStates(prev => ({ ...prev, fetching: true }));
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page: productState.page,
        search: productState.searchQuery,
        sort: filters.basic.sort || 'newest',
        limit: 10 // Number of items per page
      }).toString();

      const data = await productService.fetchProducts(queryParams);
      
      // Log the response to debug
      console.log('API Response:', data);
      
      // Ensure we have the correct total count
      const totalCount = data.totalCount || data.total || data.products?.length || 0;
      
      // Calculate total pages (10 items per page)
      const totalPages = Math.ceil(totalCount / 10);
      
      console.log('Total Count:', totalCount);
      console.log('Total Pages:', totalPages);
      
      setProductState(prev => ({
        ...prev,
        products: data.products || [],
        totalProducts: totalCount,
        totalPages: totalPages,
        error: null
      }));
    } catch (error) {
      console.error('Fetch Error:', error);
      setProductState(prev => ({ ...prev, error: error.message }));
      toast({
        title: "Error fetching products",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, fetching: false }));
    }
  };

  // Event handlers
  const handleFilterChange = (category, name, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value
      }
    }));
    // Reset to first page when filters change
    setProductState(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setProductState(prev => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    setProductState(prev => ({
      ...prev,
      deleteProductId: id,
      isDeleteDialogOpen: true
    }));
  };

  const confirmDelete = async () => {
    setLoadingStates(prev => ({ ...prev, deleting: true }));
    try {
      const data = await productService.deleteProduct(productState.deleteProductId);
      
      toast({
        title: "Success",
        description: data.message || "Product deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Error deleting product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, deleting: false }));
      setProductState(prev => ({
        ...prev,
        isDeleteDialogOpen: false,
        deleteProductId: null
      }));
    }
  };

  const handleEdit = (product) => {
    navigate('/admin/productpost', { 
      state: { 
        product,
        isEditing: true 
      }
    });
  };

  // Add reset filters function
  const handleResetFilters = () => {
    setFilters({
      basic: {
        sort: "",
        filter: "",
        searchQuery: ""
      },
      product: {
        gender: "",
        shape: "",
        style: "",
        frameType: "",
        brand: "",
        powerType: "",
        discount: ""
      },
      technical: {
        prescriptionType: "",
        supportedPowers: "",
        priceRange: ""
      },
      appearance: {
        frameColors: []
      },
      features: {
        topPick: ""
      }
    });
    // Reset to first page when filters are reset
    setProductState(prev => ({ ...prev, page: 1 }));
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, [filters, productState.page, productState.searchQuery]);

  // Loading state
  if (loadingStates.fetching) {
    return (
      <Box p={4}>
        <Center h="400px">
          <Spinner size="xl" color="teal.500" />
        </Center>
      </Box>
    );
  }

  // Error state
  if (productState.error) {
    return (
      <Box p={4}>
        <Center h="400px">
          <VStack spacing={4}>
            <Text color="red.500">Error: {productState.error}</Text>
            <Button onClick={fetchData}>Retry</Button>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header Section */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color="blue.600">Products Management</Heading>
          <HStack spacing={4}>
            <Text color="gray.600">Total Products: {productState.totalProducts}</Text>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => navigate('/admin/productpost')}
            >
              Add New Product
            </Button>
          </HStack>
        </Flex>

        {/* Filters Section */}
        <ProductFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {/* Products Table */}
        <ProductTable 
          products={sortedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        {productState.products.length > 0 && (
          <Flex justify="center" mt={4}>
            <HStack spacing={4}>
              <Button
                onClick={() => handlePageChange(Math.max(1, productState.page - 1))}
                isDisabled={productState.page === 1}
                variant="outline"
              >
                Previous
              </Button>
              <Text>Page {productState.page} of {productState.totalPages}</Text>
              <Button
                onClick={() => handlePageChange(Math.min(productState.totalPages, productState.page + 1))}
                isDisabled={productState.page === productState.totalPages}
                variant="outline"
              >
                Next
              </Button>
            </HStack>
          </Flex>
        )}
      </VStack>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={productState.isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setProductState(prev => ({ ...prev, isDeleteDialogOpen: false }))}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={() => setProductState(prev => ({ ...prev, isDeleteDialogOpen: false }))}
                isDisabled={loadingStates.deleting}
              >
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={confirmDelete} 
                ml={3}
                isLoading={loadingStates.deleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Products;