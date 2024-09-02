import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';
import Select from 'react-select';
import { FaEdit } from 'react-icons/fa';  // Importing the edit icon

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background-color: transparent;
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 30px;  // Reduced margin
  border-radius: 15px;  // Reduced border-radius
  background-color: transparent;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.03);  // Reduced shadow
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 15px;  // Reduced border-radius
  overflow: hidden;
  background-color: transparent;
`;

const Th = styled.th`
  padding: 12px 20px;  // Reduced padding
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #FFFFFF;
  color: #99A1B7;
  font-family: "LufgaRegular";
  font-size: 14px;  // Reduced font-size
  font-weight: bold;
`;

const Td = styled.td`
  padding: 15px 20px;  // Reduced padding
  border-bottom: 1px solid #FFFFFF;
  color: #78829D;
  font-size: 14px;  // Reduced font-size
  font-family: "LufgaRegular";
  font-weight: 600;
  text-align: left;
  background-color: transparent;

  &:first-child {
    border-left: 2px solid #FFFFFF;
    padding-left: 10px;  // Reduced padding
  }

  &:last-child {
    text-align: center;
    padding-right: 5px;  // Reduced padding
    color: black;
  }
`;

const statusColors = {
  'Pending': '#F6C90E',  // Example color for Pending
  'Accepted': '#299C61',  // Example color for Accepted
  'Rejected': '#9C292B',  // Example color for Rejected
  'Canceled': '#E74C3C',  // Example color for Canceled
  'Out of Stock': '#9C292B',  // Example color for Out of Stock
  'Default': '#BDC3C7'  // Default color for undefined statuses
};

const StatusTd = styled(Td)`
  color: ${({ $status }) => ($status === 'Out of Stock' ? '#FFFFFF' : '#FFFFFF')};
  background-color: ${({ $status }) => statusColors[$status] || statusColors['Default']};
  border-radius: 8px;  // Reduced border-radius
  padding: 6px 20px;  // Reduced padding
  display: inline-block;
  margin-top: 10%;  // Reduced margin
`;

const EditIcon = styled(FaEdit)`
  font-size: 1.25rem;
  color: #299C61;
  cursor: pointer;
  margin: 25px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #1D7A50;
  }
`;

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [statusIDs, setStatusIDs] = useState([]);

  const getOrderStatus = () => {
    axiosInstance.get('orderStatus')
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllOrders = () => {
    const query = statusIDs.length ? `/orders?statusIDs=${statusIDs.join(',')}` : '/orders';
    axiosInstance.get(query)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrderStatus();
    getAllOrders();
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [statusIDs]);

  const handleUpdateOrder = (order) => {
    getOrderStatus();
    setSelectedOrder(order);
    setSelectedStatus(order.status._id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
    getAllOrders();
  };

  const handleModalSave = async () => {
    axiosInstance.patch(`orders/${selectedOrder._id}`, { status: selectedStatus })
      .then((res) => {
        handleModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFilters = (selectedOptions) => {
    setStatusIDs(selectedOptions.map(option => option.value));
  };

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        <h1>Orders</h1>
        <h5>Filters</h5>
        <div className="boxCheckBox">
          <Select
            isMulti
            options={status.map(stat => ({ value: stat._id, label: stat.name }))}
            onChange={handleAddFilters}
            placeholder="Select Order Status"
          />
        </div>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
                <Th>Discount</Th>
                <Th>Total Price After Discount</Th>
                <Th>Payment Method</Th>
                <Th>Shipping Address</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <Td style={{ color: '#071437' }}>{index + 1}</Td>
                  <Td>{order.user.name}</Td>
                  <Td>
                    {order.cartItems.map(item => (
                      <div key={item.product._id}>{item.product.title}</div>
                    ))}
                  </Td>
                  <Td>{order.cartItems.reduce((total, item) => total + item.quantity, 0)}</Td>
                  <Td>${order.totalOrderPrice}</Td>
                  <Td>{order.discount}%</Td>
                  <Td>${order.totalOrderPriceAfterDiscount}</Td>
                  <Td>{order.paymentMethod}</Td>
                  <Td>{order.shippingAddress}</Td>
                  <StatusTd $status={order.status.name}>{order.status.name}</StatusTd>
                  <Td>
                    <EditIcon onClick={() => handleUpdateOrder(order)} />
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Content>

      {/* Update Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formSubcategoryCategory">
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              as="select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              {status.map((stat) => (
                <option key={stat._id} value={stat._id}>
                  {stat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </AppContainer>
  );
};

export default Orders;
