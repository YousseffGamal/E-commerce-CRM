import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

const UsersViewPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [editRoles, setEditRoles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSaveConfirmationModal, setShowSaveConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleEdit = (user) => {
    setEditRoles(user.roles.map(role => role._id));
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    axiosInstance.delete(`/deleteuser/${selectedUserId}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== selectedUserId));
        setShowDeleteModal(false);
        setShowSuccessModal(true); // Show success modal after deletion
      })
      .catch((err) => {
        console.error(err);
        setShowDeleteModal(false);
      });
  };

  const handleCloseEditModal = () => {
    getAllAdmins();
    setShowEditModal(false);
    setEditUser(null);
  };

  const handleSaveEdit = () => {
    axiosInstance.patch(`/updateuser/${editUser._id}`, {
      userID: editUser._id,
      name: editUser.name,
      email: editUser.email,
      phone: editUser.phone,
      roleIds: editRoles,
      isAdmin: 1
    })
      .then(() => {
        setShowSaveConfirmationModal(true); // Show save confirmation modal
        handleCloseEditModal();
      })
      .catch((err) => {
        alert(`Failed to update Admin: ${err.response.data.message}`);
        console.error(err);
      });
  };

  const handleAddUser = () => {
    navigate('/addadmin');
  };

  const handleChangeForTheCheckBox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setEditRoles([...editRoles, value]);
    } else {
      setEditRoles(editRoles.filter(role => role !== value));
    }
  };

  const getAllRoles = () => {
    axiosInstance.get('/allRoles')
      .then((res) => {
        setRoles(res.data.roles);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAllAdmins = () => {
    axiosInstance.get('/getalladmins')
      .then((res) => {
        setUsers(res.data.AllAdmins);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAllAdmins();
    getAllRoles();
  }, []);

  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 className='pagetitle' style={{ marginBottom: '20px' }}>Admins</h2>
        <AddButton onClick={handleAddUser}>Add Admin</AddButton>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Roles</Th>
                <Th style={{ textAlign: 'center' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <Td>{index + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.roles.map(role => role.name).join(' / ')}</Td>
                  <Td>
                    <EditIcon onClick={() => handleEdit(user)} />
                    <TrashIcon onClick={() => handleDelete(user._id)} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit User Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={editUser?.name || ''}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUserEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter user email"
                  value={editUser?.email || ''}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUserPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user phone"
                  value={editUser?.phone || ''}
                  onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUserRoles">
                <Form.Label>Roles</Form.Label>
                {roles.map(role => (
                  <Form.Check
                    key={role._id}
                    type="checkbox"
                    label={role.name}
                    value={role._id}
                    checked={editRoles.includes(role._id)}
                    onChange={handleChangeForTheCheckBox}
                  />
                ))}
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
          <Modal.Body>Are you sure you want to delete this role?</Modal.Body>
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
            <Modal.Title>Changes Saved</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your changes have been saved successfully.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSaveConfirmationModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Modal */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Role Deleted</Modal.Title>
          </Modal.Header>
          <Modal.Body>The role has been deleted successfully.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Content>
    </Container>
  );
};

export default UsersViewPage;