import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
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
  animation: ${fadeIn} 0.5s ease-in-out;
  margin-left: 250px; /* Adjust based on sidebar width */
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

const ActionButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #28a745;
  color: #ffffff;
`;

const ChangePasswordButton = styled(ActionButton)`
  background-color: #dc3545;
  color: #ffffff;
`;

const UsersViewPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ]);

  const handleEdit = (id) => {
    console.log('Edit user with id:', id);
    // Add edit functionality here
  };

  const handleChangePassword = (id) => {
    console.log('Change password for user with id:', id);
    // Add change password functionality here
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <h2 style={{ marginBottom: '20px' }}>Users View</h2>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableData>{user.id}</TableData>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>
                    <EditButton onClick={() => handleEdit(user.id)}>Edit</EditButton>
                    <ChangePasswordButton onClick={() => handleChangePassword(user.id)}>Change Password</ChangePasswordButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      </Content>
    </Container>
  );
};

export default UsersViewPage;
