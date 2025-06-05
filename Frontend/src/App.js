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
import AdminLayout from "./Pages/Admin/AdminLayout";
import ProtectedRoute from "./Pages/Admin/ProtectedRoute";
import Navbar from "./Pages/Admin/Navbar";


function App() {
  return (
    <Box w="100%" overflowX="hidden" position="relative" minH="100vh">
      <Routes>
        {/* Auth Routes - Public */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        
        {/* Admin Routes - Protected */}
       
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
             
                <AdminPanel />
              
            </ProtectedRoute>
          }
        >
          <Route index element={
            <AdminLayout>
            <AdminDashboard />
            </AdminLayout>
            } />
          <Route path="analytics" element={
            <ProtectedRoute>
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="products" element={
            <AdminLayout>
               <Products />
            </AdminLayout>
           
            } />
          <Route path="productpost" element={<ProductPost />} />
          <Route path="orders" element={
            <ProtectedRoute>
              <AdminLayout>
                <Orders />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="banners" element={
           <AdminLayout> 
            <Banners />
            </AdminLayout>
          } />
          <Route path="section-banners" element={
            <AdminLayout>
            <SectionBanners />
            </AdminLayout>
            } />
          <Route path="users" element={
            <ProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Other Routes */}
        <Route path="/*" element={<AllRoutes />} />
      </Routes>
    </Box>
  );
}

export default App;
