import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../axios';

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

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState('default');
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('default');
  const [brands, setBrands] = useState([]);
  const [material, setMaterial] = useState('');
  const [priceAfterDiscount, setpriceAfterDiscount] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    const allFieldsEmpty = !title && !price && !description && !imagePreview;
    setIsFormActive(!allFieldsEmpty);
  }, [title, price, description, imagePreview]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get('/getallcategories');
        setCategories(response.data.allCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await axiosInstance.get('/getallbrands');
        setBrands(response.data.allBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrand();
  }, []);

  useEffect(() => {
    setpriceAfterDiscount(price - (discount * price) / 100);
  }, [discount, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('stockQuantity', stockQuantity);
    formData.append('brand', brand);
    formData.append('material', material);
    formData.append('priceAfterDiscount', priceAfterDiscount);
    formData.append('discount', discount);

    if (images) {
      formData.append('images', images);
    }

    try {
      const response = await axiosInstance.post('/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API response:', response.data);
      // Handle success if needed
    } catch (error) {
      console.error('Error submitting the product:', error);
      // Handle error if needed
    }

    // Clear form fields
    setTitle('');
    setPrice('');
    setDescription('');
    setImages(null);
    setImagePreview(null);
    setCategory('default');
    setSize('');
    setColor('');
    setStockQuantity('');
    setSku('');
    setBrand('default');
    setMaterial('');
   setpriceAfterDiscount('');
    setDiscount(0);
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImages(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

 

  return (
    <Container>
      <Sidebar />
      <div style={{ display: 'flex', width: '100%', padding: '20px' }}>
        <StyledFormContainer isFormActive={isFormActive}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Product Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => handleInputChange(e, setTitle)}
                placeholder="Enter product title"
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
              <Select
                id="category"
                value={category}
                onChange={(e) => handleInputChange(e, setCategory)}
                required
              >
                <option value="default" disabled>Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => handleInputChange(e, setCategory)}
                required
              >
                <option value="default" disabled>Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
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
              <Label htmlFor="brand">Brand</Label>
              <Select
                id="brand"
                value={brand}
                onChange={(e) => handleInputChange(e, setBrand)}
                required
              >
                <option value="default" disabled>Select brand</option>
                {brands.map((bran) => (
                  <option key={bran._id} value={bran._id}>
                    {bran.title}
                  </option>
                ))}
              </Select>
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
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                type="number"
                id="discount"
                value={discount}
                onChange={(e) => handleInputChange(e, setDiscount)}
                placeholder="Enter discount percentage"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="priceAfterDiscount">Discount Price</Label>
              <Input
                type="number"
                id="priceAfterDiscount"
                value={priceAfterDiscount}
                placeholder="Calculated discount price"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="images">Product Image</Label>
              <Input
                type="file"
                id="images"
                onChange={handleImageChange}
                required
              />
            </FormGroup>
            {imagePreview && <ProductImage src={imagePreview} alt="Product Preview" />}
            <Button type="submit">Add Product</Button>
          </Form>
        </StyledFormContainer>
        <PreviewContainer></PreviewContainer>
      </div>
    </Container>
  );
};

export default AddProductForm;
