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
  border-radius: 10px;
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
  font-weight: bold;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FileInputLabel = styled.label`
  display: block;
  width: 100%;
  padding: 14px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 16px;
  color: #333333;
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  line-height: 1.5;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &::after {
    content: 'Choose file';
  }
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const AddBrandPage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSlugChange = (e) => setSlug(e.target.value);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBrand = {
      title,
      slug,
      logo,
    };
    console.log('New Brand:', newBrand);
    // Add functionality to handle form submission
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <FormContainer>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Brand</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter brand title"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="slug">Slug</Label>
              <Input
                type="text"
                id="slug"
                value={slug}
                onChange={handleSlugChange}
                placeholder="Enter brand slug"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="logo">Logo</Label>
              <FileInputWrapper>
                <FileInputLabel htmlFor="logo">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '100px', margin: 'auto', display: 'block' }} />
                  ) : (
                    'Upload Logo'
                  )}
                </FileInputLabel>
                <FileInput
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  required
                />
              </FileInputWrapper>
            </FormGroup>
            <Button type="submit">Add Brand</Button>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default AddBrandPage;
