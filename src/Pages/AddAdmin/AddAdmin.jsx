import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const FormContainer = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AddAdminPage = () => {

  const [Data , setData] = useState({
    name : '',
    phone : '',
    email : '',
    isAdmin : 1,
    roleIds : [],
    tempRole : ''
  })


  const handleChange = (e) =>{
    const {name , value} = e.target;
    setData({
      ...Data,
      [name] : value,
    })
  }

  const handleAddRoles = (e) =>{
    const { value } =e.target;

    roleIds.in



    setData({
      ...Data,
      tempRole : ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdmin = {
      username,
      email,
      role,
    };
    console.log('New Admin:', newAdmin);
    // Add functionality to handle form submission
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <FormContainer>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Admin</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Name</Label>
              <Input
              name='name'
                type="text"
                id="username"
                value={Data.name}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
               name='email'
                type="email"
                id="email"
                value={Data.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phone">Phone</Label>
              <Input
               name='phone'
                type="phone"
                id="phone"
                value={Data.phone}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="role">Role</Label>
              <Select
              name='tempRole'
                id="role"
                value={Data.tempRole}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </Select>
            </FormGroup>
            <Button type="submit">Add Admin</Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AddAdminPage;
