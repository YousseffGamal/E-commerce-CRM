import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from 'react-bootstrap';

const TableContainer = styled.div`
  overflow-x: auto;
  padding: 20px;
  margin-top: 50px;
  border: 1px solid #F1F1F4;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.03);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  background-color: #f2f2f2;
  color: #99A1B7;
  font-size: 13.36px;
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  color: #78829D;
  font-size: 13.975px;
  font-weight: 600;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TableRow = styled.tr`
  animation: ${fadeIn} 0.5s ease;
`;

const StatusTd = styled(Td)`
  color: ${({ $status }) => ($status === 'Out of Stock' ? '#FF0033' : '#4CAF50')};
  background-color: ${({ $status }) => ($status === 'Out of Stock' ? '#FFEEF3' : '#E8F5E9')};
`;

const ProductTable = ({ products, onEdit }) => {
  return (
    <TableContainer>
      <h4 style={{ fontSize: '1.275rem', fontWeight: '600' }}>Stock Report</h4>
      <p style={{ color: '#99A1B7', fontSize: '1.075rem', fontWeight: '500' }}>
        Total {products.length} Items in the Stock
      </p>
      <Table>
        <thead>
          <tr>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <Td style={{ color: '#071437' }}>{product.name}</Td>
              <Td>${product.price}</Td>
              <Td>{product.description}</Td>
              <StatusTd $status={product.status}>{product.status}</StatusTd>
              <Td>
                <Button variant="primary" onClick={() => onEdit(product)}>Edit</Button>
              </Td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
