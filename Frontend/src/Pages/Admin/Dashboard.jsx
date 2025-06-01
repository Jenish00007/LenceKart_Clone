import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle body scroll lock when sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.classList.toggle('sidebar-open', isSidebarOpen);
    }
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isSidebarOpen, isMobile]);

  const menuItems = [
    { path: '/admin', label: 'Analytics', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/productpost', label: 'Add Product', icon: '➕' },
    { path: '/admin/orders', label: 'Orders', icon: '📋' },
    { path: '/admin/Banners', label: 'Banners', icon: '🖼️' },
    { path: '/admin/section-banners', label: 'Section Banners', icon: '🎯' },
    { path: '/admin/Users', label: 'Users', icon: '👥' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Handle click outside sidebar on mobile
  const handleOutsideClick = (e) => {
    if (isMobile && isSidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.mobile-menu-btn')) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
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
              onClick={closeSidebar}
            >
              <span className="icon">{item.icon}</span>
              {isSidebarOpen && <span className="label">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div className="main-content">
        <header className="dashboard-header">
          <button 
            className="mobile-menu-btn"
            onClick={toggleSidebar}
            aria-label="Toggle Mobile Menu"
          >
            ☰
          </button>
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