import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
  display: flex;
  height: auto;
`;

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

const FormContainerWrapper = ({ isFormActive, ...props }) => (
  <div {...props} />
);

const StyledFormContainer = styled(FormContainerWrapper)`
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
  margin-right: 20px;
  margin-left: ${(props) => (props.isFormActive ? '250px' : 'calc(50% - 200px)')};
  transition: margin-left 0.5s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddRoleForm = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });

  const handleRoleNameChange = (e) => setRoleName(e.target.value);

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      roleName,
      permissions,
    };
    console.log('New Role:', newRole);
    // Add functionality to handle form submission
  };

  return (
    <Container>
      <Sidebar />
      <div className='rrr' style={{ display: 'flex', width: '100%', padding: '20px' }}>
        <StyledFormContainer >
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Role</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                type="text"
                id="roleName"
                value={roleName}
                onChange={handleRoleNameChange}
                placeholder="Enter role name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Permissions</Label>
              <CheckboxGroup>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="read"
                    checked={permissions.read}
                    onChange={handlePermissionChange}
                  />
                  Read
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="write"
                    checked={permissions.write}
                    onChange={handlePermissionChange}
                  />
                  Write
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="delete"
                    checked={permissions.delete}
                    onChange={handlePermissionChange}
                  />
                  Delete
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>
            <Button type="submit">Add Role</Button>
          </Form>
        </StyledFormContainer>
      </div>
    </Container>
  );
};

export default AddRoleForm;
