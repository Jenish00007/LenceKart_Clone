import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPages.css';
import { API_URL } from '../../config';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shape, setShape] = useState("");
  const [style, setStyle] = useState("");
  const [productref, setProductref] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/product?sort=${sort}&productRefLink=${productref}&gender=${gender}&productType=${filter}&shape=${shape}&style=${style}&page=${page}`
      );
      const data = await response.json();
      setProducts(data.products || data);
      setTotalOrders(data.totalCount || data.length);
      setTotalPages(data.totalPages || Math.ceil(data.totalCount / 10));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sort, filter, page, gender, shape, style]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(() => {
      setPage(1); // Reset to first page when searching
      fetchData();
    }, 500);
    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [productref]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(
          `${API_URL}/product/${id}`,
          {
            method: "DELETE"
          }
        );
        if (response.status === 200) {
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (product) => {

    navigate('/admin/productpost', { 
      state: { 
        product,
        isEditing: true 
      }
    });

    setEditingProduct(product);

  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/product/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );
      if (response.status === 200) {
        fetchData();
        setEditingProduct(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Products Management</h2>
        <div className="total-orders">
          Total Products: {totalOrders}
        </div>

        <button className="add-btn" onClick={() => navigate('/admin/productpost')}>Add New Product</button>

        <button className="add-btn" onClick={() => navigate('/admin/addproduct')}>Add New Product</button>

      </div>

      <div className="filters-container">
        <input
          type="search"
          placeholder="Search by name"
          value={productref}
          onChange={(e) => setProductref(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Glasses</option>
          <option value="sunglasses">Sun Glasses</option>
          <option value="eyeglasses">Eye Glasses</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="filter-select"
        >
          <option value="">For all Gender</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kid">Kid</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort By Price</option>
          <option value="lowtohigh">Low to High</option>
          <option value="hightolow">High to Low</option>
        </select>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="filter-select"
        >
          <option value="">Choose Frame Shape</option>
          <option value="Rectangle">Rectangle</option>
          <option value="Round">Round</option>
          <option value="Wayfarer">Wayfarer</option>
          <option value="Butterfly">Butterfly</option>
          <option value="Aviator">Aviator</option>
          <option value="Wrapround">Wrap Round</option>
          <option value="Cateye">Cateye</option>
          <option value="Hexagon">Hexagon</option>
          <option value="Square">Square</option>
        </select>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="filter-select"
        >
          <option value="">Choose Frame Types</option>
          <option value="Tinted">Tinted</option>
          <option value="FullFrame">FullFrame</option>
          <option value="Mirror">Mirror</option>
        </select>
      </div>

      {editingProduct && (
        <div className="edit-form">
          <h3>Edit Product</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={editingProduct.productRefLink}
                onChange={(e) => setEditingProduct({...editingProduct, productRefLink: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Original Price:</label>
              <input
                type="number"
                value={editingProduct.mPrice}
                onChange={(e) => setEditingProduct({...editingProduct, mPrice: parseFloat(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Discounted Price:</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                value={editingProduct.productType}
                onChange={(e) => setEditingProduct({...editingProduct, productType: e.target.value})}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Shape</th>
              <th>Colors</th>
              <th>Gender</th>
              <th>Style</th>
              <th>Dimension</th>
              <th>Product Type</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productRefLink}</td>
                <td>{product.shape}</td>
                <td>{product.colors}</td>
                <td>{product.gender}</td>
                <td>{product.style}</td>
                <td>{product.dimension}</td>
                <td>{product.productType}</td>
                <td>₹{product.mPrice}</td>
                <td>₹{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length > 0 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products; 