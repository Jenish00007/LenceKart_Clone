import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

const AdminLayout = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      {children}
    </Box>
  );
};

export default AdminLayout; 