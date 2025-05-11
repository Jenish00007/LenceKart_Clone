import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import './AdminPages.css';

const SectionBannerModal = ({ banner, isEditMode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    leftImage: '',
    rightImage: '',
    section: 'top'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewLeft, setPreviewLeft] = useState('');
  const [previewRight, setPreviewRight] = useState('');

  useEffect(() => {
    if (isEditMode && banner) {
      setFormData({
        title: banner.title || '',
        leftImage: banner.leftImage || '',
        rightImage: banner.rightImage || '',
        section: banner.section || 'top'
      });
      setPreviewLeft(banner.leftImage || '');
      setPreviewRight(banner.rightImage || '');
    }
  }, [banner, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'leftImage') {
      setPreviewLeft(value);
    } else if (name === 'rightImage') {
      setPreviewRight(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditMode 
        ? `${API_URL}/api/sectionbanner/banners/${banner._id}`
        : `${API_URL}/api/sectionbanner/banners`;
      
      const method = isEditMode ? 'PUT' : 'POST';

      console.log('Submitting section banner data:', formData);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success || data) {
        onSave();
      } else {
        setError(data.message || 'Failed to save section banner');
      }
    } catch (error) {
      setError('An error occurred while saving the section banner');
      console.error('Error saving section banner:', error);
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
        maxWidth: '800px',
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
            {isEditMode ? 'Edit Section Banner' : 'Add New Section Banner'}
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
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
              placeholder="Enter banner title"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              color: '#333',
              fontWeight: '500'
            }}>
              Section:
            </label>
            <select
              name="section"
              value={formData.section}
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
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500'
              }}>
                Left Image URL:
              </label>
              <input
                type="url"
                name="leftImage"
                value={formData.leftImage}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
                placeholder="Enter left image URL"
              />
              {previewLeft && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={previewLeft} 
                    alt="Left Preview" 
                    style={{
                      width: '100%',
                      height: '150px',
                      borderRadius: '4px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                color: '#333',
                fontWeight: '500'
              }}>
                Right Image URL:
              </label>
              <input
                type="url"
                name="rightImage"
                value={formData.rightImage}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
                placeholder="Enter right image URL"
              />
              {previewRight && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={previewRight} 
                    alt="Right Preview" 
                    style={{
                      width: '100%',
                      height: '150px',
                      borderRadius: '4px',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
            </div>
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

export default SectionBannerModal; 