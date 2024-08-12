import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import styled from 'styled-components';

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
`;

const Orders = () => {
  const orders = [
    { id: 1, customer: 'John Doe', product: 'T-Shirt', quantity: 2, total: 40 },
    { id: 2, customer: 'Jane Smith', product: 'Jeans', quantity: 1, total: 40 },
    { id: 3, customer: 'Alice Johnson', product: 'Jacket', quantity: 1, total: 60 },
    { id: 4, customer: 'Bob Brown', product: 'Hat', quantity: 3, total: 30 },
    { id: 5, customer: 'Charlie Davis', product: 'Shoes', quantity: 2, total: 80 },
    { id: 6, customer: 'Diana Evans', product: 'Scarf', quantity: 1, total: 20 },
    { id: 7, customer: 'Eve Foster', product: 'Socks', quantity: 5, total: 25 },
    { id: 8, customer: 'Frank Green', product: 'Sweater', quantity: 1, total: 45 },
    { id: 9, customer: 'Grace Harris', product: 'T-Shirt', quantity: 4, total: 80 },
    { id: 10, customer: 'Henry Irving', product: 'Jeans', quantity: 2, total: 80 },
    { id: 11, customer: 'Ivy Jackson', product: 'Belt', quantity: 1, total: 15 },
    { id: 12, customer: 'Jack Kelly', product: 'Shirt', quantity: 3, total: 75 },
    { id: 13, customer: 'Karen Lewis', product: 'Skirt', quantity: 2, total: 50 },
    { id: 14, customer: 'Larry Moore', product: 'Shorts', quantity: 2, total: 35 },
    { id: 15, customer: 'Mona Nash', product: 'Dress', quantity: 1, total: 45 },
    { id: 16, customer: 'Nancy Owens', product: 'Coat', quantity: 1, total: 100 },
    { id: 17, customer: 'Oliver Peters', product: 'Gloves', quantity: 2, total: 25 },
    { id: 18, customer: 'Paula Quinn', product: 'Cap', quantity: 2, total: 20 },
    { id: 19, customer: 'Quincy Rogers', product: 'Sunglasses', quantity: 1, total: 50 },
    { id: 20, customer: 'Rachel Scott', product: 'Sandals', quantity: 2, total: 40 },
  ];

  const handleCancelOrder = (orderId) => {
    // Implement cancel order logic here
    console.log(`Cancel order with ID: ${orderId}`);
  };

  return (
    <AppContainer>
      <Sidebar />
      <Content>
        <h1>Orders</h1>
        <div className="table-responsive">
          <Table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>${order.total}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleCancelOrder(order.id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Content>
    </AppContainer>
  );
};

export default Orders;
