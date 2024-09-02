import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  margin-left: 250px; /* Adjust based on sidebar width */
  background-color: #f4f6f9;
  animation: ${fadeIn} 0.6s ease-in-out;
  transition: margin-left 0.3s ease;
  
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

const SubcategoriesPage = () => {
  const {hasPermissions} = useAuth();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState(null);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   // Fetch subcategories and categories from API or static data
  //   setSubcategories([
  //     { id: 1, title: 'Subcategory 1', category: 'Electronics' },
  //     { id: 2, title: 'Subcategory 2', category: 'Books' },
  //   ]);
    
  //   setCategories([
  //     { id: 1, name: 'Electronics' },
  //     { id: 2, name: 'Books' },
  //     { id: 3, name: 'Clothing' },
  //   ]);
  // }, []);

  const handleEdit = (subcategory) => {
    console.log(subcategory)
    getCategories()
    setEditSubcategory(subcategory);
    setTitle(subcategory.title);
    setSelectedCategory(subcategory.category._id);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete that ?')){
      axiosInstance.delete(`/deletesubcategory/${id}` )
      .then((res) =>{
        console.log(res.data)
        setSubcategories(subcategories.filter(sub => sub._id !== id));
      
      })
      .catch((err) =>{
        alert(`Faild to delete category ${err.response.data.message}`)
        console.log(err)
      })
      
    }
  
  };

  const handleCloseEditModal = () => {
    getSubCategories()
    setShowEditModal(false);
    setEditSubcategory(null);
  };
``
  const handleSaveEdit = () => {
    axiosInstance.patch(`/updatesubcategory/${editSubcategory._id}`,{ title , category: selectedCategory} )
    .then((res) =>{
      handleCloseEditModal();
     console.log(res.data)
    })
    .catch((err) =>{
      alert(`Faild to add category ${err.response.data.message}`)
      console.log(err)
    })
   
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const getCategories = () =>{
    axiosInstance.get('getallcategories')
    .then((res) =>{
      setCategories(res.data.allCategories)
     console.log(res.data.allCategories)
    })
    .catch((err) =>{
      // alert(`Faild to add category ${err.response.data.message}`)
      console.log(err)
    })
  }
  const getSubCategories = () =>{
    axiosInstance.get('/getallsubcategories')
    .then((res) =>{
      setSubcategories(res.data.allSubCategories)
     console.log(res.data.allSubCategories)
    })
    .catch((err) =>{
      // alert(`Faild to add category ${err.response.data.message}`)
      console.log(err)
    })
  }
  useEffect(() =>{
    getSubCategories()
  },[])
  




  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 style={{ marginBottom: '20px' }}>Subcategories</h2>
      { hasPermissions(['create-subCategory']) && <AddButton onClick={() => navigate('/addsubcategory')}>Add Subcategory</AddButton>}        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory,index) => (
                <TableRow key={subcategory._id}>
                  <TableData >{index+1}</TableData>
                  <TableData>{subcategory.title}</TableData>
                  <TableData>{subcategory.category.title}</TableData>
                  <TableData>
                    {hasPermissions(['update-subCategory']) && <EditButton onClick={() => handleEdit(subcategory)}>Edit</EditButton>}
                    {hasPermissions(['delete-subCategory']) && <DeleteButton onClick={() => handleDelete(subcategory._id)}>Delete</DeleteButton>}
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

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

export default SubcategoriesPage;