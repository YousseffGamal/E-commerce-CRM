import React, { useState, useEffect } from 'react';
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

const FormContainer = styled.div`
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

const Select = styled.select`
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

const PreviewContainer = styled.div`
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
  width: 100%;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const AddProductForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    const allFieldsEmpty = !name && !price && !description && !imagePreview;
    setIsFormActive(!allFieldsEmpty);
  }, [name, price, description, imagePreview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price,
      description,
      image,
      category,
      size,
      color,
      stockQuantity,
      sku,
      brand,
      material,
      discountPrice,
    };
    onAdd(newProduct);
    setName('');
    setPrice('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setCategory('');
    setSize('');
    setColor('');
    setStockQuantity('');
    setSku('');
    setBrand('');
    setMaterial('');
    setDiscountPrice('');
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <Sidebar />
      <div className='rrr' style={{ display: 'flex', width: '100%', padding: '20px' }}>
        <FormContainer className='ffff' isFormActive={isFormActive}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Product Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
                placeholder="Enter product name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription)}
                placeholder="Enter product description"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => handleInputChange(e, setPrice)}
                placeholder="Enter product price"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="category">Category</Label>
              <Select id="category" value={category} onChange={(e) => handleInputChange(e, setCategory)} required>
                <option value="">Select category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="size">Size</Label>
              <Input
                type="text"
                id="size"
                value={size}
                onChange={(e) => handleInputChange(e, setSize)}
                placeholder="Enter product size"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="color">Color</Label>
              <Input
                type="text"
                id="color"
                value={color}
                onChange={(e) => handleInputChange(e, setColor)}
                placeholder="Enter product color"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input
                type="number"
                id="stockQuantity"
                value={stockQuantity}
                onChange={(e) => handleInputChange(e, setStockQuantity)}
                placeholder="Enter stock quantity"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="sku">SKU</Label>
              <Input
                type="text"
                id="sku"
                value={sku}
                onChange={(e) => handleInputChange(e, setSku)}
                placeholder="Enter SKU"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="brand">Brand</Label>
              <Input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => handleInputChange(e, setBrand)}
                placeholder="Enter brand name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="material">Material</Label>
              <Input
                type="text"
                id="material"
                value={material}
                onChange={(e) => handleInputChange(e, setMaterial)}
                placeholder="Enter material"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="discountPrice">Discount Price</Label>
              <Input
                type="number"
                id="discountPrice"
                value={discountPrice}
                onChange={(e) => handleInputChange(e, setDiscountPrice)}
                placeholder="Enter discount price"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="image">Upload Image</Label>
              <Input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  handleInputChange(e, setImage);
                  handleImageChange(e);
                }}
                required
              />
            </FormGroup>
            <Button type="submit">Add Product</Button>
          </Form>
        </FormContainer>
        {isFormActive && (
          <PreviewContainer className='asd'>
            <div className="row">
              <div className="col-md">
                {imagePreview && <ProductImage style={{height:"100%",maxHeight:"617px",maxWidth:"475px",width:"100%"}} src={imagePreview} alt="Product Preview" />}
              </div>
              <div className="col-md">
                <h2  style={{marginBottom:"40px",fontWeight:"bold"}}>Product Preview</h2>
                <p style={{fontSize:"1.875rem",fontWeight:"bold",lineHeight:"2.25rem"}}> {name}</p>
                <p style={{fontSize:"0.899rem",opacity:"0.8"}}> {description}</p>
                <p style={{fontSize:"36px",fontWeight:"bold"}}> {price} $</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Category: {category}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Size: {size}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Color: {color}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Stock: {stockQuantity}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>SKU: {sku}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Brand: {brand}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Material: {material}</p>
                <p style={{fontSize:"0.875rem",fontWeight:"bold"}}>Discount Price: {discountPrice} $</p>
              </div>
            </div>
          </PreviewContainer>
        )}
      </div>
    </Container>
  );
};

export default AddProductForm;