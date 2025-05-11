import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import './AdminPages.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [totalUsers, setTotalUsers] = useState(0);
    const [searchType, setSearchType] = useState('name'); // 'name' or 'mobile'

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/user/`);
            const data = await response.json();
            console.log('API Response:', data);

            if (Array.isArray(data)) {
                setUsers(data);
                setTotalUsers(data.length);
            } else if (data.users) {
                setUsers(data.users);
                setTotalUsers(data.users.length);
            } else {
                setUsers([]);
                setTotalUsers(0);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
            setUsers([]);
            setTotalUsers(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchTerm(''); // Reset search term when changing search type
    };

    const filteredUsers = users.filter(user => {
        if (!searchTerm) return true;

        const searchTermLower = searchTerm.toLowerCase();
        if (searchType === 'name') {
            return user.name?.toLowerCase().includes(searchTermLower) ||
                user.email?.toLowerCase().includes(searchTermLower);
        } else if (searchType === 'mobile') {
            return user.ph_no?.includes(searchTerm);
        }
        return true;
    });

    if (loading) {
        return (
            <div className="admin-page">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="page-header">
                <h2>User Management</h2>
                <div className="user-stats" style={{
                    backgroundColor: '#f8f9fa',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    fontSize: '1.1rem',
                    color: '#333'
                }}>
                    Total Users: {totalUsers}
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="search-section" style={{
                marginBottom: '20px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }}>
                <select
                    value={searchType}
                    onChange={handleSearchTypeChange}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        minWidth: '120px'
                    }}
                >
                    <option value="name">Search by Name</option>
                    {/* <option value="mobile">Search by Mobile</option> */}
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchType === 'name' ? 'name or email' : 'mobile number'}`}
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        flex: 1,
                        maxWidth: '400px'
                    }}
                />
            </div>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            {/* <th>Role</th> */}
                            {/* <th>Created At</th>
              <th>Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.ph_no}</td>
                                    {/* <td>
                    <span className={`status-badge ${user.role || 'user'}`}>
                      {user.role || 'user'}
                    </span>
                  </td> */}
                                    {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .status-badge.active {
          background-color: #d4edda;
          color: #155724;
        }
        .status-badge.inactive {
          background-color: #f8d7da;
          color: #721c24;
        }
        .status-badge.admin {
          background-color: #cce5ff;
          color: #004085;
        }
        .status-badge.user {
          background-color: #e2e3e5;
          color: #383d41;
        }
      `}</style>
        </div>
    );
};

export default Users; 