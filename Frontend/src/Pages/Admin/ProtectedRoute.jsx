import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import { Spinner, Center } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);
  const location = useLocation();

  // Wait for the authentication check to complete
  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!isAuth) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated and loading is false, render the children
  return children;
};

export default ProtectedRoute; 