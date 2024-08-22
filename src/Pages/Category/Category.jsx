import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';
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
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: #ffffff;
  padding: 12px;
  text-align: left;
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dddddd;
  text-align: left;
  &:last-child {
    border-right: none;
  }
`;

const TableRow = styled.tr`
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1f5f9;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const EditButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background-color: #28a745;
  color: #ffffff;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background-color: #dc3545;
  color: #ffffff;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #c82333;
  }
`;

const CategoriesPage = () => {
  const { hasPermissions } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this category')){
      axiosInstance.delete(`/deletecategory/${id}`)
      .then((res) =>{
        setCategories(categories.filter(cat => cat._id !== id));
     })
     .catch((err) =>{
      alert('failed to Delete cat')
       console.log(err)
     })
    }
   
   
   
  };

  const handleCloseEditModal = () => {
    getAllCat()
    setShowEditModal(false);
    setEditCategory(null);
  };

  const handleSaveEdit = () => {
    axiosInstance.patch(`/updatecategory/${editCategory._id}`,editCategory)
    .then((res) =>{
      handleCloseEditModal();
   })
   .catch((err) =>{
    alert('faild to add cat')
     console.log(err)
   })
 
  };

  const handleAddCategory = () => {
    navigate('/addcategory');
  };
  const getAllCat = () =>{
    axiosInstance.get('/getallcategories')
    .then((res) =>{
       setCategories(res.data.allCategories)
    })
    .catch((err) =>{
     
      console.log(err)
    })
  }
  useEffect(() =>{
    getAllCat()
  },[])
  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 style={{ marginBottom: '20px' }}>Categories</h2>
        {hasPermissions(['create-category']) && <AddButton onClick={handleAddCategory}>Add Category</AddButton>}
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category,index) => (
                <TableRow key={category._id}>
                  <TableData id={category._id}>{index+1}</TableData>
                  <TableData id={category._id}>{category.title}</TableData>
                  <TableData>
                   { hasPermissions(['update-category']) && <EditButton onClick={() => handleEdit(category)}>Edit</EditButton>}
                   {hasPermissions(['delete-category']) && <DeleteButton onClick={() => handleDelete(category._id)}>Delete</DeleteButton>}
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit Category Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} animation={true}>
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
      </Content>
    </Container>
  );
};

export default CategoriesPage;
