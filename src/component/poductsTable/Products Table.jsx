import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../../store/authContext';

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
  color: black;
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

const ProductTable = () => {
  const { hasPermissions } = useAuth();
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
        // Ensure the data is an array before setting it
        setProducts(Array.isArray(response.data.allProducts) ? response.data.allProducts : []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set to empty array on error
      }
    };

    fetchProducts();
  }, []);

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

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/updateproduct/${selectedProduct._id}`, selectedProduct);
      setProducts(products.map((product) => 
        product._id === selectedProduct._id ? selectedProduct : product
      ));
      setShowEditModal(false);
      setShowSaveConfirmationModal(true); // Show save confirmation modal
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <Td>{product.title}</Td>
                <Td>{product.price}</Td>
                <Td>{product.description}</Td>

                <Td>{product.category.title}</Td>
                <Td>
                  <EditIcon onClick={() => handleEdit(product)} />
                  <TrashIcon onClick={() => confirmDelete(product._id)} />
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="4">No products found</Td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct?.name || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={selectedProduct?.price || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={selectedProduct?.category || ''}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, category: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product deleted successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Save Confirmation Modal */}
      <Modal show={showSaveConfirmationModal} onHide={() => setShowSaveConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Product saved successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSaveConfirmationModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </TableContainer>
  );
};

export default ProductTable;
