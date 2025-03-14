import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import Charts from '../../component/charts/Charts';
import ProductTable from '../../component/poductsTable/Products Table'; // Fixed import
import { FaTasks, FaBoxes, FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import BarChart from "../../component/BarChart/BarChart";


const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 250px;
  padding: 20px;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Box = styled.div`
  background-color: transparent;
  padding: 20px;
  border-radius: 25px;
  border: 1px solid #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-right: 20px;
  text-align: center;
  
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Value = styled.p`
  color: #666;
  font-size: 24px;
`;

const Header = styled.div`
  color: #ffffff;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideDown 0.5s ease;

  @keyframes slideDown {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

function CRM() {
  const [products, setProducts] = useState([
    { id: 1, name: 'T-Shirt', price: 20, description: 'Comfortable cotton t-shirt', status: 'Available' },
    { id: 2, name: 'Jeans', price: 40, description: 'Stylish denim jeans', status: 'Available' },
    // ... other products
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleSaveEdit = () => {
    setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
    handleCloseEditModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };
  const barChartData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 60 },
    { month: "Apr", value: 75 },
    { month: "May", value: 90 },
    { month: "Jun", value: 105 },
  ];
  return (
    <AppContainer>
      <Sidebar />
      <Content className="container-fluid">
        <Header>
          <Title className='welcome' style={{ fontSize: "3rem", color: "#000", margin: "0",  }}> Welcome Back !</Title>
          <div>
            {/* Any additional header content goes here */}
          </div>
        </Header>
        <div className="row">
          <BoxContainer className='Coll'>
            <Box className='col-md-3'>
            <Value className='CardNumber'><CountUp end={5} duration={5} /></Value>

              {/* <Icon><FaTasks /></Icon> */}
              <Title className='CardTitle'>Ongoing Orders</Title>
            </Box>
            <Box className='col-md-3'>
            <Value className='CardNumber'><CountUp end={150} duration={5} /></Value>

              {/* <Icon><FaBoxes /></Icon> */}
              <Title className='CardTitle'>Total Products in Stock</Title>
            </Box>
            <Box className='col-md-3'>
              {/* <Icon><FaDollarSign /></Icon> */}
              <Value className='CardNumber'><CountUp end={5000} duration={5} prefix="$" separator="," /></Value>

              <Title className='CardTitle'>Total Stock Value</Title>
            </Box>
            <Box className='col-md-3'>
              {/* <Icon><FaMoneyBillWave /></Icon> */}
              <Value className='CardNumber'><CountUp end={200} duration={5} prefix="$" separator="," /></Value>

              <Title className='CardTitle'>Savings from Promotions</Title>
            </Box>
          </BoxContainer>
        </div>
        <div className="row">
          <div className="col-md mt-3">
          <div className='barChartWrapper'>
              <BarChart data={barChartData} />
            </div>
            <ProductTable products={products} onEdit={handleEdit} />
          </div>
        </div>
      </Content>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  name="status"
                  value={currentProduct.status}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          )}
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
    </AppContainer>
  );
}

export default CRM;
