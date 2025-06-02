import React, { useContext } from 'react';
import { Button, Image, HStack, Text, useToast } from '@chakra-ui/react';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContext';

const GoogleLoginButton = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setisAuth, setAuthData } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    // Open popup window
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `${API_URL}/auth/google`,
      'Google Sign In',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Listen for message from popup
    window.addEventListener('message', async (event) => {
      // Verify origin
      if (event.origin !== API_URL) return;

      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        const { token, user } = event.data;
        
        // Store token
        localStorage.setItem('token', token);
        
        // Update auth context
        setisAuth(true);
        setAuthData([user]);
        localStorage.setItem('user', JSON.stringify(user));

        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom"
        });

        // Close popup
        popup.close();
        
        // Redirect to home or saved path
        const redirectPath = localStorage.getItem('redirectPath') || '/';
        localStorage.removeItem('redirectPath');
        navigate(redirectPath);
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        toast({
          title: "Authentication Failed",
          description: event.data.error || "Please try again",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        });
        popup.close();
      }
    });
  };

  return (
    <Button
      w="100%"
      h="48px"
      bg="white"
      color="gray.700"
      borderRadius="24px"
      border="1px solid #ddd"
      boxShadow="sm"
      fontWeight="medium"
      leftIcon={null}
      onClick={handleGoogleLogin}
      _hover={{ bg: 'gray.50', boxShadow: 'md' }}
      _active={{ bg: 'gray.100' }}
      transition="all 0.2s"
    >
      <HStack spacing={3} w="100%" justify="center">
        <Image
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          boxSize="24px"
        />
        <Text fontSize="16px" fontWeight="medium">Continue with Google</Text>
      </HStack>
    </Button>
  );
};

export default GoogleLoginButton; 