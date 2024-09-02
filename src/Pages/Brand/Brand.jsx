import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

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

const SaveIcon = styled(FaSave)`
  font-size: 1.5rem;
  color: black;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #1D7A50;
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

const BrandsPage = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBrand, setEditBrand] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);

  const handleEdit = (brand) => {
    setEditBrand(brand);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedBrandId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axiosInstance.delete(`/deletebrand/${selectedBrandId}`)
      .then((res) => {
        console.log(res.data);
        setBrands(brands.filter(brand => brand._id !== selectedBrandId));
        setShowDeleteModal(false);
        setShowSuccessModal(true); // Show success modal after deletion
      })
      .catch((err) => {
        console.error(err);
        setShowDeleteModal(false); // Close delete modal on error
      });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditBrand({});
    getAllBrands();
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setEditBrand({
      ...editBrand,
      file: file
    });
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    formData.append('file', editBrand.file);
    formData.append('title', editBrand.title);
    axiosInstance.patch(`updatebrand/${editBrand._id}`, formData)
      .then((res) => {
        console.log(res.data);
        handleCloseEditModal();
        setShowSaveConfirmationModal(true); // Show save confirmation modal after saving
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddBrand = () => {
    navigate('/addbrand');
  };

  const getAllBrands = () => {
    axiosInstance.get('getallbrands')
      .then((res) => {
        console.log(res.data.allBrands);
        setBrands(res.data.allBrands);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 className='pagetitle' style={{ marginBottom: '20px' }}>Brands</h2>
        <AddButton onClick={handleAddBrand}>Add Brand</AddButton>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Brand ID</Th>
                <Th>Title</Th>
                <Th>Logo</Th>
                <Th style={{ textAlign: 'center' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={brand._id}>
                  <Td>{index + 1}</Td>
                  <Td>{brand.title}</Td>
                  <Td>
                    <img src={`http://localhost:3000/uploads/${brand.image.replace('\\', '/')}`} alt={brand.title} style={{ width: '50px', height: 'auto' }} />
                  </Td>
                  <Td>
                    <EditIcon onClick={() => handleEdit(brand)} />
                    <TrashIcon onClick={() => handleDelete(brand._id)} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit Brand Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
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
                <Form.Label>Add Another logo</Form.Label>
                <Form.Control
                  type="file"
                  name='image'
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
              <SaveIcon /> Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Confirm Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this brand?
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

        {/* Save Confirmation Modal */}
        <Modal show={showSaveConfirmationModal} onHide={() => setShowSaveConfirmationModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Changes have been saved successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowSaveConfirmationModal(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </Content>
    </Container>
  );
};

export default BrandsPage;
