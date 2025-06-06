import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import './AdminPages.css';

const BannerModal = ({ banner, isEditMode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    caption: '',
    img: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (isEditMode && banner) {
      setFormData({
        caption: banner.caption || '',
        img: banner.img || '',
        status: banner.status || 'active'
      });
      setPreviewUrl(banner.img || '');
    }
  }, [banner, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'img') {
      setPreviewUrl(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditMode 
        ? `${API_URL}/api/banner/${banner._id}`
        : `${API_URL}/api/banner/banners`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      console.log('Submitting banner data:', formData);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      //console.log('API Response:', data);

      if (data.success || data) {
        onSave();
      } else {
        setError(data.message || 'Failed to save banner');
      }
    } catch (error) {
      setError('An error occurred while saving the banner');
      console.error('Error saving banner:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="modal-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '1px solid #eee'
        }}>
          <h3 style={{ margin: 0, color: '#333', fontSize: '1.5rem' }}>
            {isEditMode ? 'Edit Banner' : 'Add New Banner'}
          </h3>
          <button 
            className="close-btn" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: '5px'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Caption:
            </label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
              placeholder="Enter banner caption"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Image URL:
            </label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
              placeholder="Enter image URL"
            />
            {previewUrl && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '4px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Status:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {error && (
            <div className="error-message" style={{
              color: '#dc3545',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#f8d7da',
              borderRadius: '4px',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}

          <div className="form-actions" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa',
                color: '#333',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={loading}
              style={{
                padding: '10px 20px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal; 