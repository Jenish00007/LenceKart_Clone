import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../ContextApi/AuthContext';
import { API_URL } from '../../config';

function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const { isAuth } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Track product view
  useEffect(() => {
    const trackProductView = async () => {
      if (!isAuth || !id) return; // Only track for logged-in users

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(`${API_URL}/products/visit/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (!data.success) {
          console.error('Failed to track product view:', data.message);
        }
      } catch (error) {
        console.error('Error tracking product view:', error);
      }
    };

    trackProductView();
  }, [id, isAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      {/* Your existing product detail JSX */}
      <h1>{product.name}</h1>
      {/* Add other product details here */}
    </div>
  );
}

export default ProductDetail;