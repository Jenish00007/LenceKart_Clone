import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import AdminPanel from "./Pages/Admin/AdminPanel";
import Products from "./Pages/Admin/Products";
import Analytics from "./Pages/Admin/Analytics";
import Orders from "./Pages/Admin/Orders";
import OrderDetails from "./Pages/Admin/OrderDetails";
import SectionBanners from "./Pages/Admin/SectionBanners";
import Users from "./Pages/Admin/Users";
import "./App.css";
import Banners from "./Pages/Admin/Banners";
import AllRoutes from "./Components/AllRoutes";
import ProductPost from "./Pages/Admin/ProductPost";
import "./index.css";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminSignup from "./Pages/Admin/AdminSignup";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";

function App() {
  return (
    <Box w="100%" overflowX="hidden" position="relative" minH="100vh">
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<AdminDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="products" element={<Products />} />
          <Route path="productpost" element={<ProductPost />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="banners" element={<Banners />} />
          <Route path="section-banners" element={<SectionBanners />} />
          <Route path="users" element={<Users />} />
        </Route>
        
        {/* Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        
        {/* Other Routes */}
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </Box>
  );
}

export default App;
