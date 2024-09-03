import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../store/authContext';

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background-color: transparent;
  height: 100vh; /* Set height to 100vh */
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 30px;
  border-radius: 15px;
  background-color: transparent;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.03);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 15px;
  overflow: hidden;
  background-color: transparent;
`;

const Th = styled.th`
  padding: 12px 20px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #FFFFFF;
  color: #99A1B7;
  font-family: "LufgaRegular";
  font-size: 14px;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 15px 20px;
  border-bottom: 1px solid #FFFFFF;
  color: #78829D;
  font-size: 14px;
  font-family: "LufgaRegular";
  font-weight: 600;
  text-align: left;
  background-color: transparent;

  &:first-child {
    border-left: 2px solid #FFFFFF;
    padding-left: 10px;
  }

  &:last-child {
    text-align: center;
    padding-right: 5px;
    color: black;
  }
`;

const EditIcon = styled(FaEdit)`
  font-size: 1.5rem;
  color: black;
  cursor: pointer;
  margin-right: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #1D7A50;
  }
`;

const TrashIcon = styled(FaTrash)`
  font-size: 1.5rem;
  color: white; /* Match the color style in the UsersViewPage */
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #FF4C4C;
  }
`;

const SaveIcon = styled(FaSave)`
  font-size: 1.5rem;
  color: black;
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1D7A50;
  }
`;

const ManageProducts = () => {
  const { hasPermissions } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:3000/deleteproduct/${productToDelete}`);
  //     setProducts(products.filter((product) => product._id !== productToDelete));
  //     setShowDeleteModal(false);
  //     setShowSuccessModal(true); // Show success message modal
  //     setProductToDelete(null);
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/deleteproduct/${productToDelete}`);
      setProducts(products.filter((product) => product._id !== productToDelete));
      setShowDeleteModal(false);
      setShowSuccessModal(true); // Show success message modal
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      setShowDeleteModal(false);
    }
  };
  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };
  const deleteProduct = (id) => {
    confirmDelete(id);
  };
  
  // When user confirms the delete action, `handleDelete` will be called
      

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
      setShowSaveConfirmationModal(true); // Show save confirmation modal
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
        <h1 className='pagetitle'>Manage Products</h1>
        <Button
          variant="primary"
          onClick={handleAddProduct}
          style={{ marginBottom: '20px' }}
        >
          Add Product
        </Button>
        {hasPermissions(['create-product', 'update-product', 'delete-product']) && (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Description</Th>
                  <Th style={{textAlign:"center"}}>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <Td>{product._id}</Td>
                      <Td>{product.title}</Td>
                      <Td>${product.price}</Td>
                      <Td>{product.description}</Td>
                      <Td>
                        <EditIcon onClick={() => handleEdit(product)} />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setProductToDelete(product._id);
                            setShowDeleteModal(true);
                          }}
                          style={{ backgroundColor: 'transparent', border: 'none' }} // Match style from UsersViewPage
                        >
                          <TrashIcon style={{color:"black"}} /> 
                        </Button>
                      </Td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Td colSpan="5" className="text-center">
                      No products available
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableContainer>
        )}

        {/* Edit Product Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.title}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              <SaveIcon style={{color:"white"}} /> Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Message Modal */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Product deleted successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Save Confirmation Modal */}
        <Modal show={showSaveConfirmationModal} onHide={() => setShowSaveConfirmationModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Product updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSaveConfirmationModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Content>
    </AppContainer>
  );
};

export default ManageProducts;