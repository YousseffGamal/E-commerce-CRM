import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

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

const RolesPage = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['View', 'Edit', 'Delete'] },
    { id: 2, name: 'Manager', permissions: ['View', 'Edit'] },
    { id: 3, name: 'Employee', permissions: ['View'] },
    { id: 4, name: 'Guest', permissions: [] },
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRole, setEditRole] = useState(null);

  const handleEdit = (role) => {
    setEditRole(role);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditRole(null);
  };

  const handleSaveEdit = () => {
    setRoles(roles.map(role =>
      role.id === editRole.id ? editRole : role
    ));
    handleCloseEditModal();
  };

  const handleAddRole = () => {
    navigate('/addrole');
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 style={{ marginBottom: '20px' }}>Roles</h2>
        <AddButton onClick={handleAddRole}>Add Role</AddButton>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>Role ID</TableHeader>
                <TableHeader>Role Name</TableHeader>
                <TableHeader>Permissions</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableData>{role.id}</TableData>
                  <TableData>{role.name}</TableData>
                  <TableData>{role.permissions.join(', ')}</TableData>
                  <TableData>
                    <EditButton onClick={() => handleEdit(role)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(role.id)}>Delete</DeleteButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit Role Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRoleName">
                <Form.Label>Role Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter role name"
                  value={editRole?.name || ''}
                  onChange={(e) => setEditRole({ ...editRole, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formPermissions">
                <Form.Label>Permissions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editRole?.permissions.join(', ') || ''}
                  onChange={(e) => setEditRole({ ...editRole, permissions: e.target.value.split(',').map(p => p.trim()) })}
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

export default RolesPage;
