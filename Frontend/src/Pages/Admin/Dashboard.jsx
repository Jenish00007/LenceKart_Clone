import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Analytics', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },

    { path: '/admin/productpost', label: 'Add Product', icon: '➕' },

    { path: '/admin/add-product', label: 'Add Product', icon: '➕' },

    { path: '/admin/orders', label: 'Orders', icon: '📋' },
    { path: '/admin/Banners', label: 'Banners', icon: '🖼️' },
    // { path: '/admin/add-banner', label: 'Add Banner', icon: '➕' },
    { path: '/admin/section-banners', label: 'Section Banners', icon: '🎯' },
    { path: '/admin/Users', label: 'Users', icon: '👥' },
  ];

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              {isSidebarOpen && <span className="label">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="main-content">
        <header className="dashboard-header">
          <h1>{menuItems.find(item => item.path === location.pathname)?.label || 'Analytics'}</h1>
        </header>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 