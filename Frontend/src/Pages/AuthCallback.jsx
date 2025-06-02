import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContext';
import { Box, Spinner, Text, Center, useToast } from '@chakra-ui/react';
import { API_URL } from '../config';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setisAuth, setAuthData } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (error) {
          throw new Error('Authentication failed');
        }

        if (!token) {
          throw new Error('No token received');
        }

        // Store token
        localStorage.setItem('token', token);

        // Fetch user data
        const response = await fetch(`${API_URL}/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        
        // Update auth context
        setisAuth(true);
        setAuthData([userData]);
        localStorage.setItem('user', JSON.stringify(userData));

        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom"
        });

        // Redirect to home or saved path
        const redirectPath = localStorage.getItem('redirectPath') || '/';
        localStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: "Authentication Failed",
          description: error.message || "Please try again",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        navigate('/login', { 
          state: { 
            message: 'Authentication failed. Please try again.' 
          }
        });
      }
    };

    handleCallback();
  }, [location, navigate, setisAuth, setAuthData, toast]);

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text mt={4} fontSize="lg">
          Completing sign in...
        </Text>
      </Box>
    </Center>
  );
};

export default AuthCallback; 