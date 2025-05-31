import React, { useState, useEffect } from 'react';
import './AdminPages.css';
import { API_URL } from '../../config';
import BannerModal from './BannerModal';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/banner/banners`);
      const data = await response.json();
      //console.log('Banner API Response:', data); // Debug log
      
      if (data) {
        // Handle both array and object response formats
        const bannerData = Array.isArray(data) ? data : (data.banners || []);
        setBanners(bannerData);
      } else {
        console.error('No data received from banner API');
        setBanners([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setBanners([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAddBanner = () => {
    setIsEditMode(false);
    setSelectedBanner(null);
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner) => {
    setIsEditMode(true);
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleDeleteBanner = async (_id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const response = await fetch(`${API_URL}/api/banner/${_id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success || data) {
          fetchBanners();
        } else {
          console.error('Failed to delete banner:', data.message);
        }
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Banner Management</h2>
        <button className="add-btn" onClick={handleAddBanner}>
          Add New Banner
        </button>
      </div>

      <div className="banners-container">
        {/* Desktop Table View */}
        <div className="table-view">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id}>
                  <td>
                    <img 
                      src={banner.img} 
                      alt={banner.title || 'Banner image'} 
                      style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{banner.caption}</td>
                  <td>
                    <span className={`status-badge ${banner.status || 'active'}`}>
                      {banner.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBanner(banner._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="card-view">
          {banners.map((banner) => (
            <div key={banner._id} className="banner-card">
              <div className="banner-card-image">
                <img 
                  src={banner.img} 
                  alt={banner.title || 'Banner image'} 
                />
              </div>
              <div className="banner-card-content">
                <h3>{banner.caption}</h3>
                <span className={`status-badge ${banner.status || 'active'}`}>
                  {banner.status || 'active'}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteBanner(banner._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <BannerModal
          banner={selectedBanner}
          isEditMode={isEditMode}
          onClose={handleModalClose}
          onSave={() => {
            fetchBanners();
            handleModalClose();
          }}
        />
      )}
    </div>
  );
};

export default Banners; 