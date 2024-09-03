import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';
import Sidebar from '../../component/sidebar/Sidebar';
import { useAuth } from '../../store/authContext';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing the edit and delete icons
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;

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
  background-color: #ffffff;
  color: #99a1b7;
  font-family: 'LufgaRegular';
  font-size: 14px;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 15px 20px;
  border-bottom: 1px solid #ffffff;
  color: #78829d;
  font-size: 14px;
  font-family: 'LufgaRegular';
  font-weight: 600;
  text-align: left;
  background-color: transparent;

  &:first-child {
    border-left: 2px solid #ffffff;
    padding-left: 10px;
  }

  &:last-child {
    text-align: center;
    padding-right: 5px;
    color: black;
  }
`;

const StatusTd = styled(Td)`
  color: ${({ $status }) => ($status === 'Out of Stock' ? '#ffffff' : '#ffffff')};
  background-color: ${({ $status }) => statusColors[$status] || statusColors['Default']};
  border-radius: 8px;
  padding: 6px 20px;
  display: inline-block;
  margin-top: 10%;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const EditIcon = styled(FaEdit)`
  font-size: 1.5rem;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1d7a50;
  }
`;

const DeleteIcon = styled(FaTrashAlt)`
  font-size: 1.5rem;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #d32f2f;
  }
`;

const statusColors = {
  'Pending': '#f6c90e',
  'Accepted': '#299c61',
  'Rejected': '#9c292b',
  'Canceled': '#e74c3c',
  'Out of Stock': '#9c292b',
  'Default': '#bdc3c7'
};

const SubcategoriesPage = () => {
  const { hasPermissions } = useAuth();
  const [subcategories, setSubcategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate()
  const handleEdit = (subcategory) => {
    getCategories();
    setEditSubcategory(subcategory);
    setTitle(subcategory.title);
    setSelectedCategory(subcategory.category._id);
    setShowEditModal(true);
  };
  const navigate = useNavigate()

  const handleDelete = () => {
    if (deleteId) {
      axiosInstance.delete(`/deletesubcategory/${deleteId}`)
        .then(() => {
          setSubcategories(subcategories.filter(sub => sub._id !== deleteId));
          setShowDeleteModal(false);
          setShowSuccessModal(true);
        })
        .catch((err) => {
          alert(`Failed to delete subcategory ${err.response.data.message}`);
        });
    }
  };

  const handleCloseEditModal = () => {
    getSubCategories();
    setShowEditModal(false);
    setEditSubcategory(null);
  };

  const handleSaveEdit = () => {
    axiosInstance.patch(`/updatesubcategory/${editSubcategory._id}`, { title, category: selectedCategory })
      .then(() => {
        handleCloseEditModal();
        setShowSaveConfirmationModal(true);
      })
      .catch((err) => {
        alert(`Failed to update subcategory ${err.response.data.message}`);
      });
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const getCategories = () => {
    axiosInstance.get('getallcategories')
      .then((res) => {
        setCategories(res.data.allCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubCategories = () => {
    axiosInstance.get('/getallsubcategories')
      .then((res) => {
        setSubcategories(res.data.allSubCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        <h2>Subcategories</h2>
        {hasPermissions(['create-subCategory']) && (
          <Button onClick={() => navigate('/addsubcategory')} style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '6px', backgroundColor: '#007bff', color: '#ffffff' }}>
            Add Subcategory
          </Button>
        )}
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th style={{textAlign:"center"}}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory, index) => (
                <tr key={subcategory._id}>
                  <Td>{index + 1}</Td>
                  <Td>{subcategory.title}</Td>
                  <Td>{subcategory.category?.title || 'No Category'}</Td>
                  <Td>
                    <IconContainer>
                      {hasPermissions(['update-subCategory']) && (
                        <EditIcon onClick={() => handleEdit(subcategory)} />
                      )}
                      {hasPermissions(['delete-subCategory']) && (
                        <DeleteIcon
                          onClick={() => {
                            setDeleteId(subcategory._id);
                            setShowDeleteModal(true);
                          }}
                        />
                      )}
                    </IconContainer>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        {/* Edit Subcategory Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formSubcategoryTitle">
                <Form.Label>Subcategory Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subcategory title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </Form.Group>
              <Form.Group controlId="formSubcategoryCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
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

export default SubcategoriesPage;
