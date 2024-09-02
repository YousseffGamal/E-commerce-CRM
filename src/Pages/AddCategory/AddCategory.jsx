import React, { useState } from 'react';
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

const AddCategoryPage = () => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('New Category:', newCategory);
    axiosInstance.post('/addcategory', {title : title})
    .then((res) =>{
      alert('Category added successfully')
      setTitle('')
      console.log(res.data)
    })
    .catch((err) =>{
      alert(`Faild to add category ${err.response.data.message}`)
      console.log(err)
    })
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <FormContainer>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Category</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Category Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter category title"
                required
              />
            </FormGroup>
            <Button type="submit">Add Category</Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AddCategoryPage;
