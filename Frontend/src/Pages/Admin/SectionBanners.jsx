import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import SectionBannerModal from './SectionBannerModal';
import './AdminPages.css';

const SectionBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sectionFilter, setSectionFilter] = useState('all');

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/sectionbanner/banners`);
      const data = await response.json();
      //console.log('API Response:', data);
      
      if (Array.isArray(data)) {
        setBanners(data);
      } else if (data.banners) {
        setBanners(data.banners);
      } else {
        setBanners([]);
      }
    } catch (error) {
      console.error('Error fetching section banners:', error);
      setError('Failed to fetch section banners');
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAddBanner = () => {
    setSelectedBanner(null);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteBanner = async (_id) => {
    if (window.confirm('Are you sure you want to delete this section banner?')) {
      try {
        const response = await fetch(`${API_URL}/api/sectionbanner/banners/${_id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.success || data) {
          fetchBanners();
        } else {
          setError('Failed to delete section banner');
        }
      } catch (error) {
        console.error('Error deleting section banner:', error);
        setError('Failed to delete section banner');
      }
    }
  };

  const handleSave = () => {
    setShowModal(false);
    fetchBanners();
  };

  const filteredBanners = sectionFilter === 'all' 
    ? banners 
    : banners.filter(banner => banner.section === sectionFilter);

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
        <h2>Section Banners</h2>
        <button className="add-btn" onClick={handleAddBanner}>
          Add New Section Banner
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-section" style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Filter by Section:</label>
        <select 
          value={sectionFilter} 
          onChange={(e) => setSectionFilter(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        >
          <option value="all">All Sections</option>
          <option value="top">Top</option>
          <option value="middle">Middle</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      <div className="banners-grid">
        {filteredBanners.length === 0 ? (
          <div className="no-banners">No section banners found</div>
        ) : (
          filteredBanners.map((banner) => (
            <div key={banner._id} className="banner-card">
              <div className="banner-header">
                <h3>{banner.title}</h3>
                <span className={`status-badge ${banner.section}`}>
                  {banner.section}
                </span>
              </div>
              
              <div className="banner-images">
                <div className="image-container">
                  <label>Left Image:</label>
                  <img 
                    src={banner.leftImage} 
                    alt="Left" 
                    className="banner-image"
                  />
                </div>
                <div className="image-container">
                  <label>Right Image:</label>
                  <img 
                    src={banner.rightImage} 
                    alt="Right" 
                    className="banner-image"
                  />
                </div>
              </div>

              <div className="banner-footer">
                <div className="banner-date">
                  Created: {new Date(banner.createdAt).toLocaleDateString()}
                </div>
                <div className="banner-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEditBanner(banner)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteBanner(banner._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <SectionBannerModal
          banner={selectedBanner}
          isEditMode={isEditMode}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default SectionBanners; 