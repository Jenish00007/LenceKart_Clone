import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import './AdminPages.css';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch user count
      const usersResponse = await fetch(`${API_URL}/user/`);
      const usersData = await usersResponse.json();
      console.log('Users API Response:', usersData);
      const totalUsers = Array.isArray(usersData) ? usersData.length : 
                        usersData.users ? usersData.users.length : 0;

      // Fetch product count
      const productsResponse = await fetch(`${API_URL}/product`);
      const productsData = await productsResponse.json();
      console.log('Products API Response:', productsData);
      const totalProducts = productsData.totalCount;

      // Fetch order count
      const ordersResponse = await fetch(`${API_URL}/api/orders/public/all`);
      const ordersData = await ordersResponse.json();
      const totalOrders = ordersData.success ? ordersData.totalCount : 0;

      setStats({
        totalUsers,
        totalProducts,
        totalOrders
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="loading">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <h2>Dashboard Analytics</h2>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
          <p className="stat-label">Active Users</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{stats.totalProducts}</p>
          <p className="stat-label">Available Products</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
          <p className="stat-label">Completed Orders</p>
        </div>
      </div>

      <style jsx>{`
        .analytics-container {
          padding: 20px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
          margin: 10px 0;
        }
        .stat-label {
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        .loading {
          text-align: center;
          padding: 20px;
          font-size: 1.2rem;
          color: #666;
        }
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Analytics; 