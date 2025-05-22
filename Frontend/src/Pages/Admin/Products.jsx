import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  WrapItem
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import './AdminPages.css';
import { API_URL } from '../../config';

const Products = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({
    sort: "",
    filter: "",
    gender: "",
    shape: "",
    style: "",
    frameType: "",
    frameSize: "",
    weightGroup: "",
    prescriptionType: "",
    supportedPowers: "",
    priceRange: "",
    frameColors: []
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        page,
        search: searchQuery
      }).toString();

      const response = await fetch(`${API_URL}/product?${queryParams}`);
      const data = await response.json();
      setProducts(data.products || data);
      setTotalProducts(data.totalCount || data.length);
      setTotalPages(data.totalPages || Math.ceil(data.totalCount / 10));
    } catch (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters, page, searchQuery]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_URL}/product/${id}`, {
          method: "DELETE"
        });
        if (response.status === 200) {
          toast({
            title: "Product deleted successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          fetchData();
        }
      } catch (error) {
        toast({
          title: "Error deleting product",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header Section */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color="blue.600">Products Management</Heading>
          <HStack spacing={4}>
            <Text color="gray.600">Total Products: {totalProducts}</Text>
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
        <Card bg={cardBg} p={4}>
          <CardBody>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
              <GridItem>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="Product Type"
                  value={filters.filter}
                  onChange={(e) => handleFilterChange('filter', e.target.value)}
                >
                  <option value="eyeglasses">Eye Glasses</option>
                  <option value="sunglasses">Sun Glasses</option>
                  <option value="contact-lenses">Contact Lenses</option>
                </Select>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="Gender"
                  value={filters.gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
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
                  value={filters.frameType}
                  onChange={(e) => handleFilterChange('frameType', e.target.value)}
                >
                  <option value="Full Rim">Full Rim</option>
                  <option value="Half Rim">Half Rim</option>
                  <option value="Rimless">Rimless</option>
                </Select>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="Frame Size"
                  value={filters.frameSize}
                  onChange={(e) => handleFilterChange('frameSize', e.target.value)}
                >
                  <option value="Extra Narrow">Extra Narrow</option>
                  <option value="Narrow">Narrow</option>
                  <option value="Medium">Medium</option>
                  <option value="Wide">Wide</option>
                  <option value="Extra Wide">Extra Wide</option>
                </Select>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="Weight Group"
                  value={filters.weightGroup}
                  onChange={(e) => handleFilterChange('weightGroup', e.target.value)}
                >
                  <option value="Light">Light</option>
                  <option value="Average">Average</option>
                </Select>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="Price Range"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="Rs. 500-999">Rs. 500-999</option>
                  <option value="Rs. 1000-1499">Rs. 1000-1499</option>
                  <option value="Rs. 1500-1999">Rs. 1500-1999</option>
                  <option value="Rs. 2000-2499">Rs. 2000-2499</option>
                  <option value="Rs. 2500-4999">Rs. 2500-4999</option>
                  <option value="Rs. 5000-9999">Rs. 5000-9999</option>
                  <option value="Rs. 10000-14999">Rs. 10000-14999</option>
                  <option value="Rs. 15000+">Rs. 15000+</option>
                </Select>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="Sort By"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="lowtohigh">Price: Low to High</option>
                  <option value="hightolow">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </Select>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Products Table */}
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
                        src={product.imageTsrc}
                        alt={product.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Td>
                    <Td>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">{product.name}</Text>
                        <Text fontSize="sm" color="gray.500">{product.productRefLink}</Text>
                      </VStack>
                    </Td>
                    <Td>
                      <Badge colorScheme={
                        product.productType === 'eyeglasses' ? 'blue' :
                        product.productType === 'sunglasses' ? 'orange' : 'purple'
                      }>
                        {product.productType}
                      </Badge>
                    </Td>
                    <Td>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">₹{product.price}</Text>
                        <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                          ₹{product.mPrice}
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
                            onClick={() => handleEdit(product)}
                          />
                        </Tooltip>
                        <Tooltip label="Delete Product">
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDelete(product._id)}
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

        {/* Pagination */}
        {products.length > 0 && (
          <Flex justify="center" mt={4}>
            <HStack spacing={4}>
              <Button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                isDisabled={page === 1}
                variant="outline"
              >
                Previous
              </Button>
              <Text>Page {page} of {totalPages}</Text>
              <Button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                isDisabled={page === totalPages}
                variant="outline"
              >
                Next
              </Button>
            </HStack>
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default Products; 