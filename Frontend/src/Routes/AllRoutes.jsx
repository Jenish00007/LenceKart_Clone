import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import Cart from '../Pages/Cart/Cart';
import Checkout from '../Pages/Checkout/Checkout';
import PaymentSuccess from '../Pages/PaymentSuccess/PaymentSuccess';
import PaymentFailed from '../Pages/PaymentFailed/PaymentFailed';
import AuthCallback from '../Pages/AuthCallback';
import PrivateRoute from './PrivateRoute';
import ProtectedAdminRoute from '../Components/ProtectedAdminRoute';
import AdminLogin from '../Pages/Admin/AdminLogin';
import AdminSignup from '../Pages/Admin/AdminSignup';
import ProductPost from '../Pages/Admin/ProductPost';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import EditProduct from '../Pages/Admin/EditProduct';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin/>} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin" element={
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      } />
      <Route path="/admin/products" element={
        <ProtectedAdminRoute>
          <ProductPost /> 
        </ProtectedAdminRoute>
      } />
      <Route path="/admin/editproduct" element={
        <ProtectedAdminRoute>
          <EditProduct/>
        </ProtectedAdminRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/cart" element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } />
      <Route path="/checkout" element={
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      } />
      <Route path="/payment/success" element={
        <PrivateRoute>
          <PaymentSuccess />
        </PrivateRoute>
      } />
      <Route path="/payment/failed" element={
        <PrivateRoute>
          <PaymentFailed />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default AllRoutes; 