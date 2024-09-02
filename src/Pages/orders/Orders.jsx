import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import axios, { Axios } from 'axios';
import axiosInstance from '../../axios';

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  background-color: #f4f6f9;
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: #007bff;
    color: white;
    th {
      padding: 12px;
      text-align: left;
    }
  }
  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #f9f9f9;
      }
      td {
        padding: 12px;
      }
    }
  }
  .btn-danger {
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #c82333;
    }
  }
  .btn-primary {
    margin-left: 10px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #0056b3;
    }
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
        console.log(res.data);
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
        console.log("products comeing form the backend ",res.data);
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
  }, [statusIDs]); // Trigger fetching orders when statusIDs changes

  const handleUpdateOrder = (order) => {
    getOrderStatus();
    setSelectedOrder(order);
    setSelectedStatus(order.status._id);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
    getAllOrders(); // Refresh orders after closing modal
  };

  const handleModalSave = async () => {
    axiosInstance.patch(`orders/${selectedOrder._id}`, { status: selectedStatus })
      .then((res) => {
        console.log(res.data);
        handleModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFilters = (e) => {
    const { value, checked } = e.target;
    setStatusIDs(prevIDs =>
      checked ? [...prevIDs, value] : prevIDs.filter(id => id !== value)
    );
  };

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        <h1>Orders</h1>
        <h5>Filers</h5>
       
         <div className="boxCheckBox">

        {
          
          status.map((stat,index) => (
          <div>
                <input type="checkbox" id={stat._id}  key={stat._id} name={stat.name}
                        value={stat._id} 
            // checked={Data.roleIds.includes(role._id)}
            onChange={handleAddFilters}
            />
             <span  key={index}>  {stat.name}</span>
            </div>
            
          ))
        } 
        
     
        </div>
       
        <div className="table-responsive">
          <Table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Discount</th>
                <th>Total Price After Discount</th>
                <th>Payment Method</th>
                <th>Shipping address</th>
                <th>ٍStatus</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order,index) => (
                <tr key={index +1}>
                  <td>{index +1}</td>
                  <td>{order.user.name}</td>
                  <td>
                    {order?.cartItems?.map(item => (
                      <div key={item.product._id}>{item.product.title}</div>
                    ))}
                  </td>
                  <td>{order.cartItems.reduce((total, item) => total + item.quantity, 0)}</td>
                  <td>${order.totalOrderPrice}</td>
                  <td>{order.discount}%</td>
                  <td>${order.totalOrderPriceAfterDiscount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.shippingAddress}</td>
                  <td>{order.status.name}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => handleUpdateOrder(order)}>
                      Update Status
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        </div>
      </Content>

      {/* Update Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formSubcategoryCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {status?.map((stat) => (
                    <option key={stat._id} value={stat._id}>
                      {stat.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>




          {/* {selectedOrder && (
            <Form>
              <Form.Group controlId="formOrderId">
                <Form.Label>Order ID</Form.Label>
                <Form.Control type="text" readOnly value={selectedOrder._id} />
              </Form.Group>
              <Form.Group controlId="formCustomerName">
                <Form.Label>Customer</Form.Label>
                <Form.Control type="text" value={selectedOrder.user.name} onChange={(e) => setSelectedOrder({ ...selectedOrder, user: { ...selectedOrder.user, name: e.target.value } })} />
              </Form.Group>
              <Form.Group controlId="formProducts">
                <Form.Label>Products</Form.Label>
                {selectedOrder?.cartItems.map((item, index) => (
                  <div key={index} className="mb-3">
                    <Form.Control
                      type="text"
                      value={item.productId.title}
                      readOnly
                    />
                     <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newCartItems = [...selectedOrder.cartItems];
                        newCartItems[index].quantity = parseInt(e.target.value, 10);
                        setSelectedOrder({ ...selectedOrder, cartItems: newCartItems });
                      }}
                    /> 
                  </div>
                ))}
              </Form.Group>
              <Form.Group controlId="formTotalPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedOrder.totalOrderPrice}
                 onChange={(e) => setSelectedOrder({ ...selectedOrder, totalOrderPrice: parseFloat(e.target.value) })}
                />
              </Form.Group>
              <Form.Group controlId="formDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedOrder.discount}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, discount: parseFloat(e.target.value) })}
                />
              </Form.Group>
              <Form.Group controlId="formTotalPriceAfterDiscount">
                <Form.Label>Total Price After Discount</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedOrder.totalOrderPriceAfterDiscount}
                 onChange={(e) => setSelectedOrder({ ...selectedOrder, totalOrderPriceAfterDiscount: parseFloat(e.target.value) })}
                />
              </Form.Group>
              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.paymentMethod}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, paymentMethod: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formShippingAddress">
                <Form.Label>Shipping Address</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.shippingAddress}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, shippingAddress: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formIsPaid">
                <Form.Check
                  type="checkbox"
                  label="Paid"
                  checked={selectedOrder.isPaid}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, isPaid: e.target.checked })}
                />
              </Form.Group>
              <Form.Group controlId="formIsDelivered">
                <Form.Check
                  type="checkbox"
                  label="Delivered"
                  checked={selectedOrder.isDelivered}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, isDelivered: e.target.checked })}
                />
              </Form.Group>
            </Form>
          )} */}
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