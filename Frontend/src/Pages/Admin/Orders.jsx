import React, { useState, useEffect } from 'react';
import './AdminPages.css';
import { API_URL } from '../../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [limit] = useState(10); // Items per page
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/orders/public/all?page=${page}&limit=${limit}&search=${searchQuery}&status=${statusFilter}`
      );
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders || []);
        setTotalOrders(data.totalCount || 0);
        setTotalPages(Math.ceil(data.totalCount / limit));
      } else {
        console.error('Failed to fetch orders:', data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedOrder(data.order);
      } else {
        console.error('Failed to fetch order details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, limit]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setPage(1); // Reset to first page on search
      fetchOrders();
    }, 500);
    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log('Updating status:', { orderId, newStatus });
      const response = await fetch(`${API_URL}/api/orders/status/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      console.log('Status update response:', data);
      
      if (data.success) {
        // Update the order status in the local state
        setOrders(prevOrders => {
          const updatedOrders = prevOrders.map(order => {
            if (order._id === orderId) {
              console.log('Updating order:', order._id, 'New status:', newStatus);
              return { ...order, status: newStatus };
            }
            return order;
          });
          console.log('Updated orders:', updatedOrders);
          return updatedOrders;
        });
        
        // If the order is currently selected, update its details
        if (selectedOrder?._id === orderId) {
          setSelectedOrder(prev => {
            console.log('Updating selected order:', prev._id, 'New status:', newStatus);
            return { ...prev, status: newStatus };
          });
        }
      } else {
        console.error('Failed to update order status:', data.message);
        // Revert the status in the UI if the update failed
        await fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Revert the status in the UI if there was an error
      await fetchOrders();
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Orders Management</h2>
        <div className="total-orders">
          Total Orders: {totalOrders}
        </div>
      </div>

      {/* <div className="filters-container">
        <input
          type="search"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div> */}

      <div className="orders-container" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: 'calc(100vh - 200px)', // Adjust based on your header height
        overflow: 'hidden'
      }}>
        <div className="table-container" style={{ 
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px'
        }}>
          <table className="admin-table">
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
              <tr>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>₹{order.amount}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => {
                        console.log('Status change triggered:', order._id, e.target.value);
                        handleStatusChange(order._id, e.target.value);
                      }}
                      className={`status-select ${order.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td>{order.paymentId || 'N/A'}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => fetchOrderDetails(order._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination" style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          padding: '10px 0',
          borderTop: '1px solid #eee',
          zIndex: 1
        }}>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
          >
            First
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </button>
        </div>
      </div>

      {selectedOrder && (
        <div className="order-details-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="order-info">
                <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
                <p><strong>Currency:</strong> {selectedOrder.currency}</p>
                <p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                <p><strong>Last Updated:</strong> {formatDate(selectedOrder.updatedAt)}</p>
                <p><strong>Status:</strong> 
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                    className={`status-select ${selectedOrder.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </p>
                <p><strong>Payment ID:</strong> {selectedOrder.paymentId || 'N/A'}</p>
                <p><strong>Receipt:</strong> {selectedOrder.receipt}</p>
              </div>
              <div className="order-items">
                <h4>Order Items</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.orderDetails?.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-summary">
                  <p><strong>Subtotal:</strong> ₹{selectedOrder.orderDetails?.subtotal}</p>
                  <p><strong>Tax:</strong> ₹{selectedOrder.orderDetails?.tax}</p>
                  <p><strong>Coupon Discount:</strong> ₹{selectedOrder.orderDetails?.coupon}</p>
                  <p><strong>Total:</strong> ₹{selectedOrder.orderDetails?.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders; 