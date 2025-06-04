import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  Card,
  CardBody,
  Link as ChakraLink
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Failed to connect to the server. Please try again later."
        }));
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();

      // Store admin token and info
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));

      toast({
        title: "Signup Successful",
        description: "Welcome to the admin panel!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });

      navigate("/admin/products");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign up. Please try again.",
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
    <Container maxW="container.sm" py={10}>
      <Card>
        <CardBody>
          <VStack spacing={8}>
            <Heading size="lg">Admin Signup</Heading>
            
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  isLoading={loading}
                >
                  Sign Up
                </Button>
              </VStack>
            </form>

            <Text>
              Already have an admin account?{" "}
              <ChakraLink as={Link} to="/admin/login" color="blue.500">
                Login
              </ChakraLink>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminSignup; 