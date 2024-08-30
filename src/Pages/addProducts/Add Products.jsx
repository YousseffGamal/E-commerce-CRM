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
  background-colors: #ffffff;
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
  colors: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-colors 0.3s ease;

  &:focus {
    border-colors: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-colors 0.3s ease;

  &:focus {
    border-colors: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-colors: #007bff;
  colors: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-colors 0.3s ease;

  &:hover {
    background-colors: #0056b3;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* Three images per row */
  gap: 10px;  /* Space between images */
`;

const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Three images per row
  gap: 10px; // Space between images
  margin-top: 10px; // Space above the grid
`;

const ProductImage = styled.img`
  width: 100%; // Make images fill their cell
  height: auto; // Maintain aspect ratio
  border-radius: 4px; // Optional: rounded corners
`;
const PreviewContainer = styled.div`
  padding: 40px;
  background-colors: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
  width: 100%;
`;

// const ProductImage = styled.img`
//   max-width: 100%;
//   max-height: 200px;
//   object-fit: cover;
//   border-radius: 10px;
// `;

const AddProductForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // Changed to an array
  const [imagePreview, setImagePreview] = useState([]);
  // const [images, setImages] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  // const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState('default');
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState('default');
  const [brands, setBrands] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isFormActive, setIsFormActive] = useState(false);
  const [subCat, setSubCat] = useState([]);
  const [subCategory, setSubCategory] = useState('default');
  
  // New state for managing size, colors, and stock quantity combinations
  const [SizecolorsStock, setSizecolorsStock] = useState([]);
  const [size, setSize] = useState('');
  const [colors, setcolors] = useState('');
  const [stock, setstock] = useState('');
  const [material, setMaterial] = useState(''); // Added missing material state

  useEffect(() => {
    const allFieldsEmpty = !title && !price && !description && imagePreview.length === 0;
    setIsFormActive(!allFieldsEmpty);
  }, [title, price, description, imagePreview]);



  // useEffect(() => {
  //   const allFieldsEmpty = !title && !price && !description && !imagePreview;
  //   setIsFormActive(!allFieldsEmpty);
  // }, [title, price, description, imagePreview]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get('/getallcategories');
        setCategories(response.data.allCategories);
        // console.log("response", response);
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
    setPriceAfterDiscount(price - (discount * price) / 100);
  }, [discount, price]);

  useEffect(() => {
    if (category !== 'default') {
      axiosInstance
        .get(`getAllSubCategoriesForAcertinCat/${category}`)
        .then((res) => {
          console.log(res.data);
          setSubCat(res.data.allSubCategories);
          setSubCategory('default'); // Reset subcategory when category changes
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSubCat([]);
      setSubCategory('default');
    }
  }, [category]);

  const handleImageChange = (e) => {
    // const filesArray = Array.from(e.target.files); // Convert FileList to array
    // console.log('filesArray:', filesArray);  // Log the length of files array
    // console.log('Total Files:', filesArray.length);  // Log the length of files array
    // setImages(filesArray);
    const newFilesArray = Array.from(e.target.files);
    const allFiles = [...images, ...newFilesArray];  // Combine old and new files
    console.log('Total Files:', allFiles.length); // Directly log the combined file count

    setImages(allFiles);

    newFilesArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, reader.result]);  // Append only new previews
      };
      reader.readAsDataURL(file);
    });
  
    // const filePreviews = allFiles.map(file => {
    //   // const reader = new FileReader();
    // //   reader.onloadend = () => {
    // //     setImagePreview(prev => {
    // //       const newPreviews = [...prev, reader.result];
    // //       console.log('New previews array:', newPreviews); // This should show a growing array with each file loaded
    // //       return newPreviews;
    // //   });
    // //   };
    // //   reader.readAsDataURL(file);
    // // });
    // const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //       setImagePreview(prev => [...prev, reader.result]);
    //         // setImagePreview(prev => {
    //         //   console.log('imagePreview.length1:', imagePreview.length); // This should show a growing array with each file loaded

    //         //         const newPreviews = [...prev, reader.result];
    //         //         console.log('New previews array:', newPreviews); // This should show a growing array with each file loaded
    //         //         console.log('imagePreview.length2:', imagePreview.length); // This should show a growing array with each file loaded

    //         //         return newPreviews;
                    
    //         //     }); // Append new previews
                
    //     };
    // });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('material', material);
    formData.append('priceAfterDiscount', priceAfterDiscount);
    formData.append('discount', discount);
    formData.append('subCategory', subCategory);
    console.log('without:', (SizecolorsStock));
    formData.append('SizecolorsStock', JSON.stringify(SizecolorsStock)); // Append the size-colors-quantity array
    // console.log('title //',title)
   
    

 // Log the FormData for debugging
 formData.forEach((value, key) => {
  console.log(key, value);
  
});
console.log(" -->>>>" ,formData );

    
    // if (images) {
    //   formData.append('images', images);
    // }
  //   if (images.length) {
  //     images.forEach((file, index) => {
  //         formData.append(`images[${index}]`, file);
  //     });
  // }
  if (images.length) {
    images.forEach(file => {
        formData.append('images', file); // Ensure backend accepts 'images' as an array
    });
}
  

    try {
      const response = await axiosInstance.post('/addproduct', formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
        },
      });

    // try {
    //   const response = await axiosInstance.post('/addproduct', formData, {
    //       // headers: {
    //       //   'Content-Type': 'multipart/form-data',
    //       // },
    //     });
      
      console.log(formData);
      
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
    setImages([]);
    setImagePreview([]);
    // setImages(null);
    // setImagePreview(null);
    setCategory('default');
    setBrand('default');
    setMaterial(''); // Clear material field
    setPriceAfterDiscount('');
    setDiscount(0);
    setSubCategory('default');
    setSubCat([]);
    setSizecolorsStock([]); // Clear the size-colors-quantity array
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImages(file);
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  
 
  

  const addSizecolorsStock = () => {
    if (size && colors && stock) {
      setSizecolorsStock([
        ...SizecolorsStock,
        { size, colors, stock },
      ]);
      setSize('');
      setcolors('');
      setstock('');
    }
  };

  const removeSizecolorsStock = (index) => {
    setSizecolorsStock(SizecolorsStock.filter((_, i) => i !== index));
  };

  return (
    <Container>
      
      <Sidebar />
      <div style={{ display: 'flex', width: '100%', padding: '20px' }}>
        <StyledFormContainer isFormActive={isFormActive}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Title:</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => handleInputChange(e, setTitle)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="price">Price:</Label>
              <Input
                type="number"
                id="price"
                value={price}
                onChange={(e) => handleInputChange(e, setPrice)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="discount">Discount (%):</Label>
              <Input
                type="number"
                id="discount"
                value={discount}
                onChange={(e) => handleInputChange(e, setDiscount)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="priceAfterDiscount">Price After Discount:</Label>
              <Input
                type="number"
                id="priceAfterDiscount"
                value={priceAfterDiscount}
                disabled
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description:</Label>
              <Input
                type="text"
                id="description"
                value={description}
                onChange={(e) => handleInputChange(e, setDescription)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="material">Material:</Label>
              <Input
                type="text"
                id="material"
                value={material}
                onChange={(e) => handleInputChange(e, setMaterial)}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">Category:</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => handleInputChange(e, setCategory)}
              >
                <option value="default">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </Select>
            </FormGroup>

            {subCat.length > 0 && (
              <FormGroup>
                <Label htmlFor="subCategory">Subcategory:</Label>
                <Select
                  id="subCategory"
                  value={subCategory}
                  onChange={(e) => handleInputChange(e, setSubCategory)}
                >
                  <option value="default">Select Subcategory</option>
                  {subCat.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.title}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="brand">Brand:</Label>
              <Select
                id="brand"
                value={brand}
                onChange={(e) => handleInputChange(e, setBrand)}
              >
                <option value="default">Select Brand</option>
                {brands.map((br) => (
                  <option key={br._id} value={br._id}>
                    {br.title}
                  </option>
                ))}
              </Select>
            </FormGroup>

            
            <FormGroup>
  <Label htmlFor="images">Images:</Label>
  <Input type="file" id="images" onChange={handleImageChange} multiple />
  <ImagePreviewContainer>
    {imagePreview.map((src, index) => (
      <ProductImage key={index} src={src} alt={`Preview ${index + 1}`} />
    ))}
  </ImagePreviewContainer>
</FormGroup>
            {/* <FormGroup>
    <Label htmlFor="images">Images:</Label>
    <Input type="file" id="images" onChange={handleImageChange} multiple />
      {imagePreview.map((src, index) => (
          <ProductImage key={index} src={src} alt={`Preview ${index + 1}`} />
      ))}
</FormGroup> */}
            {/* <FormGroup>
              <Label htmlFor="size">Size:</Label>
              <Input
                type="text"
                id="size"
                value={size}
                onChange={(e) => handleInputChange(e, setSize)}
                
              />
            </FormGroup> */}
            <FormGroup>
            <Label htmlFor="size">Choose a size:</Label>
            <Select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Select a size</option>
              <option value="XXS">XXSMALL</option>
              <option value="XS">XSMALL</option>
              <option value="S">SMALL</option>
              <option value="M">MEDIUM</option>
              <option value="L">LARGE</option>
              <option value="XL">XLARGE</option>
              <option value="XXL">XXLARGE</option>
            </Select>
          </FormGroup>

            <FormGroup>
              <Label htmlFor="colors">colors:</Label>
              <Input
                type="text"
                id="colors"
                value={colors}
                onChange={(e) => handleInputChange(e, setcolors)}
                
              />
              <h2>{colors}</h2>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="stock">Stock Quantity:</Label>
              <Input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => handleInputChange(e, setstock)}
                
              />
            </FormGroup>

            <Button type="button" onClick={addSizecolorsStock}>
              Add Size/colors/Stock
            </Button>

            <div>
              {SizecolorsStock.map((scs, index) => (
                <div key={index}>
                  <p>
                    Size: {scs.size}, colors: {scs.colors}, Stock: {scs.stock}
                    <Button
                      type="button"
                      onClick={() => removeSizecolorsStock(index)}
                    >
                      Remove
                    </Button>
                  </p>
                </div>
              ))}
            </div>

            <Button type="submit">Submit</Button>
          </Form>
        </StyledFormContainer>
      </div>
    </Container>
  );
};

export default AddProductForm;
