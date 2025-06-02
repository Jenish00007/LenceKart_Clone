import React, { useState, useEffect } from 'react';
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Avatar,
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
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiSearch, FiEye, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { API_URL } from '../../config';
import Navbar from "./Navbar";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchType, setSearchType] = useState('name');
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Color mode values
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const cardBg = useColorModeValue("gray.50", "gray.700");

    const isMobile = useBreakpointValue({ base: true, md: false });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/user/`);
            const data = await response.json();
            //console.log('API Response:', data);

            if (Array.isArray(data)) {
                setUsers(data);
                setTotalUsers(data.length);
            } else if (data.users) {
                setUsers(data.users);
                setTotalUsers(data.users.length);
            } else {
                setUsers([]);
                setTotalUsers(0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
            toast({
                title: "Error",
                description: "Failed to fetch users",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setUsers([]);
            setTotalUsers(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchTerm('');
    };

    const filteredUsers = users.filter(user => {
        if (!searchTerm) return true;

        const searchTermLower = searchTerm.toLowerCase();
        if (searchType === 'name') {
            return user.first_name?.toLowerCase().includes(searchTermLower) ||
                user.last_name?.toLowerCase().includes(searchTermLower) ||
                user.email?.toLowerCase().includes(searchTermLower);
        } else if (searchType === 'mobile') {
            return String(user.ph_no || '').includes(searchTerm);
        }
        return true;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Box bg="gray.50" minH="100vh">
                <Navbar />
                <Box p={6}>
                    <Text>Loading...</Text>
                </Box>
            </Box>
        );
    }

    return (
        <Box bg="gray.50" minH="100vh">
            <Navbar />
            <Box p={{ base: 3, md: 6 }}>
                <VStack spacing={{ base: 4, md: 6 }} align="stretch">
                    {/* Header Section */}
                    <Flex 
                        direction={{ base: "column", md: "row" }} 
                        justify="space-between" 
                        align={{ base: "flex-start", md: "center" }}
                        gap={{ base: 2, md: 0 }}
                    >
                        <Heading size={{ base: "md", md: "lg" }} color="blue.600">User Management</Heading>
                        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>Total Users: {totalUsers}</Text>
                    </Flex>

                    {/* Stats Section */}
                    <Grid 
                        templateColumns={{ 
                            base: "1fr", 
                            sm: "repeat(2, 1fr)", 
                            md: "repeat(3, 1fr)" 
                        }} 
                        gap={{ base: 3, md: 6 }}
                    >
                        <Card bg={cardBg}>
                            <CardBody p={{ base: 3, md: 4 }}>
                                <Stat>
                                    <StatLabel fontSize={{ base: "sm", md: "md" }}>Total Users</StatLabel>
                                    <StatNumber fontSize={{ base: "lg", md: "xl" }}>{totalUsers}</StatNumber>
                                    <StatHelpText fontSize={{ base: "xs", md: "sm" }}>
                                        <StatArrow type="increase" />
                                        23.36%
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                        <Card bg={cardBg}>
                            <CardBody p={{ base: 3, md: 4 }}>
                                <Stat>
                                    <StatLabel fontSize={{ base: "sm", md: "md" }}>Active Users</StatLabel>
                                    <StatNumber fontSize={{ base: "lg", md: "xl" }}>
                                        {users.filter(u => u.isActive).length}
                                    </StatNumber>
                                    <Progress 
                                        value={users.filter(u => u.isActive).length} 
                                        max={totalUsers} 
                                        colorScheme="green"
                                        size={{ base: "sm", md: "md" }}
                                    />
                                </Stat>
                            </CardBody>
                        </Card>
                        <Card bg={cardBg} gridColumn={{ base: "1 / -1", sm: "1 / -1", md: "auto" }}>
                            <CardBody p={{ base: 3, md: 4 }}>
                                <Stat>
                                    <StatLabel fontSize={{ base: "sm", md: "md" }}>New Users Today</StatLabel>
                                    <StatNumber fontSize={{ base: "lg", md: "xl" }}>
                                        {users.filter(u => {
                                            const today = new Date();
                                            const userDate = new Date(u.createdAt);
                                            return userDate.toDateString() === today.toDateString();
                                        }).length}
                                    </StatNumber>
                                </Stat>
                            </CardBody>
                        </Card>
                    </Grid>

                    {/* Search Section */}
                    <Card bg={cardBg}>
                        <CardBody p={{ base: 3, md: 4 }}>
                            <Grid 
                                templateColumns={{ 
                                    base: "1fr", 
                                    md: "repeat(3, 1fr)" 
                                }} 
                                gap={{ base: 3, md: 4 }}
                            >
                                <GridItem>
                                    <InputGroup size={{ base: "sm", md: "md" }}>
                                        <InputLeftElement pointerEvents="none">
                                            <FiSearch color="gray.300" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="Search users..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </InputGroup>
                                </GridItem>

                                <GridItem>
                                    <Select
                                        size={{ base: "sm", md: "md" }}
                                        value={searchType}
                                        onChange={handleSearchTypeChange}
                                    >
                                        <option value="name">Search by Name/Email</option>
                                        <option value="mobile">Search by Mobile</option>
                                    </Select>
                                </GridItem>

                                {/* <GridItem>
                                    <Select
                                        size={{ base: "sm", md: "md" }}
                                        placeholder="Filter by status"
                                        onChange={(e) => {
                                            // Add status filter logic here
                                        }}
                                    >
                                        <option value="all">All Users</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Select>
                                </GridItem> */}
                            </Grid>
                        </CardBody>
                    </Card>

                    {/* Users Display Section */}
                    {isMobile ? (
                        // Mobile Card View
                        <Grid templateColumns="repeat(1, 1fr)" gap={3}>
                            {filteredUsers.map((user) => (
                                <Card key={user._id} bg={bgColor} shadow="sm">
                                    <CardBody p={3}>
                                        <VStack spacing={3} align="stretch">
                                            <HStack spacing={3}>
                                                <Avatar
                                                    size="md"
                                                    name={`${user.first_name} ${user.last_name}`}
                                                    src={user.avatar}
                                                />
                                                <VStack align="start" spacing={0}>
                                                    <Text fontWeight="medium" fontSize="sm">
                                                        {user.first_name} {user.last_name}
                                                    </Text>
                                                    <Text fontSize="xs" color="gray.500">
                                                        {user.email}
                                                    </Text>
                                                </VStack>
                                            </HStack>

                                            <Divider />

                                            <VStack align="start" spacing={2}>
                                                <HStack spacing={2}>
                                                    <FiPhone size="14px" />
                                                    <Text fontSize="sm">{user.ph_no || 'N/A'}</Text>
                                                </HStack>
                                                <HStack spacing={2}>
                                                    <FiMail size="14px" />
                                                    <Text fontSize="sm">{user.email}</Text>
                                                </HStack>
                                                <HStack spacing={2}>
                                                    <FiCalendar size="14px" />
                                                    <Text fontSize="sm">{formatDate(user.createdAt)}</Text>
                                                </HStack>
                                            </VStack>

                                            <HStack justify="space-between">
                                                <Badge
                                                    colorScheme={user.isActive ? "green" : "red"}
                                                    variant="subtle"
                                                    px={2}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="xs"
                                                >
                                                    {user.isActive ? "Active" : "Inactive"}
                                                </Badge>

                                                <HStack spacing={1}>
                                                    <Tooltip label="View Details">
                                                        <IconButton
                                                            icon={<FiEye size="14px" />}
                                                            colorScheme="blue"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                onOpen();
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    <Tooltip label="Edit User">
                                                        <IconButton
                                                            icon={<FiEdit size="14px" />}
                                                            colorScheme="yellow"
                                                            variant="ghost"
                                                            size="sm"
                                                        />
                                                    </Tooltip>
                                                    <Tooltip label="Delete User">
                                                        <IconButton
                                                            icon={<FiTrash2 size="14px" />}
                                                            colorScheme="red"
                                                            variant="ghost"
                                                            size="sm"
                                                        />
                                                    </Tooltip>
                                                </HStack>
                                            </HStack>
                                        </VStack>
                                    </CardBody>
                                </Card>
                            ))}
                        </Grid>
                    ) : (
                        // Desktop Table View
                        <Card bg={bgColor} overflowX="auto">
                            <CardBody>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>User</Th>
                                            <Th>Contact</Th>
                                            <Th>Status</Th>
                                            <Th>Joined</Th>
                                            <Th>Actions</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {filteredUsers.map((user) => (
                                            <Tr key={user._id}>
                                                <Td>
                                                    <HStack spacing={3}>
                                                        <Avatar
                                                            size="sm"
                                                            name={`${user.first_name} ${user.last_name}`}
                                                            src={user.avatar}
                                                        />
                                                        <VStack align="start" spacing={0}>
                                                            <Text fontWeight="medium">
                                                                {user.first_name} {user.last_name}
                                                            </Text>
                                                            <Text fontSize="sm" color="gray.500">
                                                                {user.email}
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <VStack align="start" spacing={0}>
                                                        <Text>{user.ph_no || 'N/A'}</Text>
                                                        <Text fontSize="sm" color="gray.500">
                                                            {user.address || 'No address'}
                                                        </Text>
                                                    </VStack>
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        colorScheme={user.isActive ? "green" : "red"}
                                                        variant="subtle"
                                                        px={2}
                                                        py={1}
                                                        borderRadius="full"
                                                    >
                                                        {user.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </Td>
                                                <Td>
                                                    <Text>{formatDate(user.createdAt)}</Text>
                                                </Td>
                                                <Td>
                                                    <HStack spacing={2}>
                                                        <Tooltip label="View Details">
                                                            <IconButton
                                                                icon={<FiEye />}
                                                                colorScheme="blue"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    setSelectedUser(user);
                                                                    onOpen();
                                                                }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip label="Edit User">
                                                            <IconButton
                                                                icon={<FiEdit />}
                                                                colorScheme="yellow"
                                                                variant="ghost"
                                                            />
                                                        </Tooltip>
                                                        <Tooltip label="Delete User">
                                                            <IconButton
                                                                icon={<FiTrash2 />}
                                                                colorScheme="red"
                                                                variant="ghost"
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
                    )}
                </VStack>
            </Box>

            {/* User Details Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "xl" }}>
                <ModalOverlay />
                <ModalContent mx={{ base: 0, md: "auto" }} my={{ base: 0, md: "auto" }}>
                    <ModalHeader fontSize={{ base: "lg", md: "xl" }}>User Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {selectedUser && (
                            <VStack spacing={4} align="stretch">
                                <HStack spacing={4}>
                                    <Avatar
                                        size={{ base: "lg", md: "xl" }}
                                        name={`${selectedUser.first_name} ${selectedUser.last_name}`}
                                        src={selectedUser.avatar}
                                    />
                                    <VStack align="start" spacing={1}>
                                        <Heading size={{ base: "sm", md: "md" }}>
                                            {selectedUser.first_name} {selectedUser.last_name}
                                        </Heading>
                                        <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
                                            {selectedUser.email}
                                        </Text>
                                        <Badge
                                            colorScheme={selectedUser.isActive ? "green" : "red"}
                                            variant="subtle"
                                            px={2}
                                            py={1}
                                            borderRadius="full"
                                            fontSize={{ base: "xs", md: "sm" }}
                                        >
                                            {selectedUser.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </VStack>
                                </HStack>

                                <Divider />

                                <Grid 
                                    templateColumns={{ 
                                        base: "1fr", 
                                        md: "repeat(2, 1fr)" 
                                    }} 
                                    gap={4}
                                >
                                    <GridItem>
                                        <VStack align="start" spacing={2}>
                                            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                                                Contact Information
                                            </Text>
                                            <Text fontSize={{ base: "sm", md: "md" }}>
                                                Phone: {selectedUser.ph_no || 'N/A'}
                                            </Text>
                                            <Text fontSize={{ base: "sm", md: "md" }}>
                                                Address: {selectedUser.address || 'N/A'}
                                            </Text>
                                        </VStack>
                                    </GridItem>
                                    <GridItem>
                                        <VStack align="start" spacing={2}>
                                            <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                                                Account Information
                                            </Text>
                                            <Text fontSize={{ base: "sm", md: "md" }}>
                                                Joined: {formatDate(selectedUser.createdAt)}
                                            </Text>
                                            <Text fontSize={{ base: "sm", md: "md" }}>
                                                Last Updated: {formatDate(selectedUser.updatedAt)}
                                            </Text>
                                        </VStack>
                                    </GridItem>
                                </Grid>
                            </VStack>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Users; 