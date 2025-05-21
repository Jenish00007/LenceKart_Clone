import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Dashboard from './Pages/Admin/Dashboard';
import Products from './Pages/Admin/Products';
import Analytics from './Pages/Admin/Analytics';
import Orders from './Pages/Admin/Orders';
import OrderDetails from './Pages/Admin/OrderDetails';
import SectionBanners from './Pages/Admin/SectionBanners';
import Users from './Pages/Admin/Users';
import "./App.css";
import Banners from './Pages/Admin/Banners';
import AllRoutes from "./Components/AllRoutes";
import ProductPost from './Pages/Admin/ProductPost';
import './index.css';

function App() {
  return (
    <Box 
      w="100%" 
      overflowX="hidden" 
      position="relative"
      minH="100vh"
    >
      <Routes>
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Analytics />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="Banners" element={<Banners />} />
          <Route path="/admin/section-banners" element={<SectionBanners />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/productpost" element={<ProductPost />} />
        </Route>
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </Box>
  );
}

export default App;
