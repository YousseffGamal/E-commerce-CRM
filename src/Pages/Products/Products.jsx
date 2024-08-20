import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 250px;
  padding: 20px;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const ProductTable = ({ products, handleEdit, handleDelete }) => {
  return (
    <>
      <div className="table-responsive">
        <div className="table-container">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td></td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        style={{ marginRight: '10px' }}
                        className="btn btn-warning btn-sm mr-1"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getallproducts');
        setProducts(response.data.allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/deleteproduct/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`http://localhost:3000/updateproduct/${selectedProduct._id}`, selectedProduct);
      setProducts(products.map((product) =>
        product._id === selectedProduct._id ? selectedProduct : product
      ));
      setShowEditModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddProduct = () => {
    navigate('/addproduct'); // Update this path to match your actual route
  };

  return (
    <AppContainer>
      <Sidebar />
      <Content className="container-fluid">
        <h1>Manage Products</h1>
        <Button
          variant="primary"
          onClick={handleAddProduct}
          style={{ marginBottom: '20px' }}
        >
          Add Product
        </Button>
        <ProductTable products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
        
        {/* Edit Product Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <form>
                <div className="form-group">
                  <label htmlFor="title">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={selectedProduct.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Content>
    </AppContainer>
  );
}

export default ManageProducts;
