import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../axios';

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

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 200px;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #333333;
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
import { useNavigate } from 'react-router-dom';
const AddAdminPage = () => {
  const navigate = useNavigate();
  const [roles, setRoles] =useState([])
  const [Data , setData] = useState({
    name : '',
    phone : '',
    email : '',
    password : '',
    isAdmin : 1,
    roleIds : [],
  })


  const handleChange = (e) =>{
    const {name , value} = e.target;
    setData({
      ...Data,
      [name] : value,
    })
  }

  const handleAddRoles = (e) =>{
    const { value , checked } =e.target;
    if(checked){
      setData({
        ...Data,
        roleIds : [...Data.roleIds ,value ] 
      })
    } else {
      setData({
        ...Data,
        roleIds : Data.roleIds.filter(id => id != value) 
      })
      
    }
    
  }

useEffect(() =>{
  axiosInstance.get('/allRoles')
  .then((res) =>{
    setRoles(res.data.roles)
  })
  .catch((err) =>{
  console.log(err)
  })
},[])

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/signup',Data)
    .then((res) =>{
      alert('New Admin added successfully')
      setData({
        name : '',
        phone : '',
        email : '',
        password : '',
        isAdmin : 1,
        roleIds : [],
      })
      
    })
    .catch((err) =>{
      alert(`Faild to add Admin : ${err.response.data.message}`)      

    })
  };

  return (
    <Container>
      <Sidebar />
      <Content>
      
        <FormContainer>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Admin</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
              name='name'
                type="text"
                id="name"
                value={Data.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">password</Label>
              <Input
              name='password'
                type="password"
                id="password"
                value={Data.password}
                onChange={handleChange}
                placeholder="Enter password"
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
                type="tel"
                id="phone"
                value={Data.phone}
                onChange={handleChange}
                placeholder="Enter phone number , only digits allowed"
                pattern="\d*"
                required
              />
            </FormGroup>
            <FormGroup>

              <Label>Roles</Label>
              <CheckboxGroup>
                {roles?.map(role => (
                  <CheckboxContainer key={role._id}>
                    <Checkbox
                      type="checkbox"
                      id={role._id}
                      name={role.name}
                      value={role._id}
                      checked={Data.roleIds.includes(role._id)}
                      onChange={handleAddRoles}
                    />
                    <CheckboxLabel >{role.name}</CheckboxLabel>
                  </CheckboxContainer>

                ))}
              </CheckboxGroup>

            </FormGroup>
            <Button type="submit">Add Admin</Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AddAdminPage;
