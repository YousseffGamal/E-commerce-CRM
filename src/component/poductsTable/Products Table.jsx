import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';  // Importing the edit icon

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 50px;
  border-radius: 25px;
  background-color: transparent;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.03);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 25px;
  overflow: hidden;
  background-color: transparent;
`;

const Th = styled.th`
  padding: 18.69px 40px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #FFFFFF;
  color: #99A1B7;
  font-family: "LufgaRegular";
  font-size: 17.7px;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 33.5px 40px;
  border-bottom: 1px solid #FFFFFF;
  color: #78829D;
  font-size: 17.7px;
  font-family: "LufgaRegular";
  font-weight: 600;
  text-align: left;
  background-color: transparent;

  &:first-child {
    border-left: 2px solid #FFFFFF;
    padding-left: 20px;
  }

  &:last-child {
    text-align: center;
    padding-right: 10px;
    color: black;
 
  }
`;

const StatusTd = styled(Td)`
  color: ${({ $status }) => ($status === 'Out of Stock' ? '#9C292B' : '#299C61')};
  border: 2px solid ${({ $status }) => ($status === 'Out of Stock' ? '#9C292B' : '#299C61')};
  border-radius: 10px;
  padding: 8px 35px;
  display: inline-block;
  margin-top:22%;
;


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

const EditIcon = styled(FaEdit)`
  font-size: 1.25rem;
  color: #299C61;
  cursor: pointer;
  margin: 25px 0;  // Add top and bottom margin
  transition: color 0.3s ease;

  &:hover {
    color: #1D7A50;  // Change color on hover
  }
`;

const ProductTable = ({ products, onEdit }) => {
  return (
    <TableContainer style={{zIndex:"150",position:"relative"}}>
      <h4 style={{ fontSize: '1.275rem', fontWeight: '600',padding:"10px" }}>Stock Report</h4>
      <p style={{ color: '#99A1B7', fontSize: '1.075rem', fontWeight: '500' }}>
        Total {products.length} Items in the Stock
      </p>
      <Table className="userTable">
        <thead className="tableHeader">
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
              <Td className="firstTd" style={{ color: '#071437' }}>{product.name}</Td>
              <Td>${product.price}</Td>
              <Td>{product.description}</Td>
              <StatusTd $status={product.status}>{product.status}</StatusTd>
              <Td>
                <EditIcon style={{color:"black",fontSize:"2rem"}} onClick={() => onEdit(product)} />  {/* Replaced button with icon */}
              </Td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
