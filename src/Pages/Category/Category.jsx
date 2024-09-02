import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../store/authContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f4f6f9;
  margin-left: 250px; /* Adjust based on sidebar width */
  transition: margin-left 0.3s ease;
  animation: ${fadeIn} 0.6s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 60px; /* Adjust for mobile view */
  }
`;

const TableWrapper = styled.div`
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
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #FF4C4C;
  }
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CategoriesPage = () => {
  const { hasPermissions } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axiosInstance.delete(`/deletecategory/${selectedCategoryId}`)
      .then((res) => {
        setCategories(categories.filter(cat => cat._id !== selectedCategoryId));
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error(err);
        setShowDeleteModal(false);
      });
  };

  const handleCloseEditModal = () => {
    getAllCat();
    setShowEditModal(false);
    setEditCategory(null);
  };

  const handleSaveEdit = () => {
    axiosInstance.patch(`/updatecategory/${editCategory._id}`, editCategory)
      .then(() => {
        handleCloseEditModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddCategory = () => {
    navigate('/addcategory');
  };

  const getAllCat = () => {
    axiosInstance.get('/getallcategories')
      .then((res) => {
        setCategories(res.data.allCategories);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllCat();
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 className='pagetitle' style={{ marginBottom: '20px' }}>Categories</h2>
        {hasPermissions(['create-category']) && <AddButton onClick={handleAddCategory}>Add Category</AddButton>}
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th style={{ textAlign: 'center' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id}>
                  <Td>{index + 1}</Td>
                  <Td>{category.title}</Td>
                  <Td>
                    {hasPermissions(['update-category']) && <EditIcon onClick={() => handleEdit(category)} />}
                    {hasPermissions(['delete-category']) && <TrashIcon onClick={() => handleDelete(category._id)} />}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit Category Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCategoryTitle">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category title"
                  value={editCategory?.title || ''}
                  onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Confirm Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this category?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Content>
    </Container>
  );
};

export default CategoriesPage;