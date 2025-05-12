import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import Products from './Pages/Admin/Products';
import Analytics from './Pages/Admin/Analytics';
import Orders from './Pages/Admin/Orders';
import SectionBanners from './Pages/Admin/SectionBanners';
import Users from './Pages/Admin/Users';
import "./App.css";
import Banners from './Pages/Admin/Banners';
import AllRoutes from "./Components/AllRoutes";
import ProductPost from './Pages/Admin/ProductPost';
function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<Dashboard />}>
        <Route index element={<Analytics />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="Banners" element={<Banners />} />
        <Route path="/admin/section-banners" element={<SectionBanners />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/productpost" element={<ProductPost />} />
      </Route>
      
      {/* Regular Routes */}
      <Route path="/*" element={<AllRoutes />} />
    </Routes>
  );
}

export default App;
