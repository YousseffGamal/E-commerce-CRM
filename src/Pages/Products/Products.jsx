import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  const handleEdit = (product) => {
    setEditedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to the product
    // You can update the product in the products array or make an API call to update it
    setShowModal(false);
    setEditedProduct(null); // Reset edited product
  };

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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button style={{ marginRight: "10px" }} className="btn btn-warning btn-sm mr-1" onClick={() => handleEdit(product)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Product Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedProduct && (
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" value={editedProduct.name} />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="text" className="form-control" id="price" value={editedProduct.price} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" rows="3" value={editedProduct.description}></textarea>
              </div>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function ManageProducts() {
  const navigate = useNavigate();
  const initialProducts = [
    { id: 1, name: 'T-Shirt', price: 20, description: 'Comfortable cotton t-shirt' },
    { id: 2, name: 'Jeans', price: 40, description: 'Stylish denim jeans' },
    { id: 3, name: 'Hoodie', price: 35, description: 'Warm and cozy hoodie' },
    { id: 4, name: 'Sneakers', price: 50, description: 'Trendy sneakers for everyday wear' },
    { id: 5, name: 'Backpack', price: 25, description: 'Durable backpack for school or travel' },
    { id: 6, name: 'Dress', price: 55, description: 'Elegant dress for special occasions' },
    { id: 7, name: 'Sunglasses', price: 15, description: 'Stylish sunglasses for sun protection' },
    { id: 8, name: 'Watch', price: 30, description: 'Classic wristwatch for telling time' },
    { id: 9, name: 'Wallet', price: 20, description: 'Slim and sleek wallet for holding cards and cash' },
    { id: 10, name: 'Jacket', price: 60, description: 'Waterproof jacket for outdoor activities' },
    { id: 11, name: 'Skirt', price: 25, description: 'Versatile skirt for various occasions' },
    { id: 12, name: 'Boots', price: 45, description: 'Sturdy boots for hiking or winter weather' },
    { id: 13, name: 'Scarf', price: 10, description: 'Soft scarf for keeping warm in cold weather' },
    { id: 14, name: 'Gloves', price: 12, description: 'Cozy gloves for protecting hands from the cold' },
    { id: 15, name: 'Hat', price: 8, description: 'Stylish hat for adding flair to outfits' },
    { id: 16, name: 'Socks', price: 5, description: 'Comfortable socks for everyday wear' },
    { id: 17, name: 'Leggings', price: 18, description: 'Stretchy leggings for exercise or casual wear' },
    { id: 18, name: 'Sweater', price: 30, description: 'Soft sweater for staying warm and stylish' },
    { id: 19, name: 'Blouse', price: 22, description: 'Chic blouse for work or evenings out' },
    { id: 20, name: 'Pants', price: 35, description: 'Classic pants for a polished look' },
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleAddProduct = () => {
    navigate('/addproduct'); // Update this path to match your actual route
  };

  return (
    <AppContainer>
      <Sidebar />
      <Content className="container-fluid">
        <h1>Manage Products</h1>
        <Button variant="primary" onClick={handleAddProduct} style={{ marginBottom: '20px' }}>
          Add Product
        </Button>
        <ProductTable products={products} onDelete={handleDelete} />
      </Content>
    </AppContainer>
  );
}

export default ManageProducts;
