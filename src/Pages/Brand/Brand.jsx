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

const BrandsPage = () => {

  const {  hasPermissions } = useAuth();

  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBrand, setEditBrand] = useState({});

  const handleEdit = (brand) => {
    setEditBrand(brand);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    axiosInstance.delete(`/deletebrand/${id}`)
    .then((res) => {
      console.log(res.data)
      setBrands(brands.filter(brand => brand._id !== id));
    })
    .catch((err) => {
      console.error(err);
    });

    
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditBrand(null);
    getAllBrands()
  };
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setEditBrand({
      ...editBrand,
      file : file
    })
   

  };
  const handleSaveEdit = () => {
    delete editBrand.image
    delete editBrand.slug
    delete editBrand.createdAt
    delete editBrand.updatedAt

    const formData = new FormData();
    formData.append('file', editBrand.file);
    formData.append('title', editBrand.title);
    axiosInstance.patch(`updatebrand/${editBrand._id}`,formData )
    .then((res) => {
      console.log(res.data);
      handleCloseEditModal();
    })
    .catch((err) => {
      console.error(err);
    });
   
  };

  const handleAddBrand = () => {
    navigate('/addbrand');
  };
  const getAllBrands = () =>{
    axiosInstance.get('getallbrands')
    .then((res) => {
        console.log(res.data.allBrands);
        setBrands(res.data.allBrands)
      })
      .catch((err) => {
        console.error(err);
      });


  }

 
  useEffect(() =>{
    getAllBrands()
  },[])
  return (
     <Container>
   <Sidebar />
      <Content>
        <h2 style={{ marginBottom: '20px' }}>Brands</h2>
      { hasPermissions(['create-brand']) && <AddButton onClick={handleAddBrand}>Add Brand</AddButton>}
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Brand ID</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Logo</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {brands?.map((brand,index) => (
           
                <TableRow key={brand._id}>
                  <TableData>{index + 1}</TableData>
                  <TableData>{brand.title}</TableData>
                  <TableData>
                    <img src={`http://localhost:3000/uploads/${brand.image.replace('\\', '/')}`} alt={brand.title} style={{ width: '50px', height: 'auto' }} />
                  </TableData>
                  <TableData>

                     {  hasPermissions(['update-brand']) && <EditButton onClick={() => handleEdit(brand)}>Edit</EditButton> }
                   
                   { hasPermissions(['delete-brand']) && <DeleteButton onClick={() => handleDelete(brand._id)}>Delete</DeleteButton>}
                  </TableData>
                </TableRow>
                    
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit Brand Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Brand</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBrandTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand title"
                  value={editBrand?.title || ''}
                  onChange={(e) => setEditBrand({ ...editBrand, title: e.target.value })}
                />
              </Form.Group>
              
              <Form.Group controlId="formBrandLogo">
                {/* <FileInput
                name='image'
                  id="image"
                  accept="image/*"
                  // onChange={handleLogoChange}
                  required
                /> */}

<Form.Label>Add Another logo</Form.Label>
<Form.Control type="file"   name='image'
                  
                  accept="image/*"
                  onChange={handleLogoChange}
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

export default BrandsPage;
