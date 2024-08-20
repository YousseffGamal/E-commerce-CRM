import React from 'react';
import styled from 'styled-components';
import { FaHome, FaShoppingCart, FaChartBar, FaCog, FaEdit, FaUserPlus, FaTag, FaUsers } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../../axios";
import { useAuth } from '../../store/authContext';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #203648;
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const SidebarHeader = styled.h1`
  padding: 20px;
  font-size: 1.5em;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 1em;
    padding: 10px;
  }
`;

const MenuItem = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #34495e;
  }
  @media (max-width: 768px) {
    padding: 10px;
    justify-content: center;
  }
`;

const MenuText = styled.span`
  margin-left: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: auto; /* Pushes the buttons to the bottom */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.primary ? '#007bff' : '#dc3545'};

  &:hover {
    background-color: ${(props) => props.primary ? '#0056b3' : '#c82333'};
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout ,hasPermissions} = useAuth();

  const handleclick = async () => {
  const check =  hasPermissions(['update-coupon'])
     console.log(check)
  };

  const handleLogOut = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarContainer>
      <SidebarHeader>CRM</SidebarHeader>
     <MenuItem>
      <StyledLink to="/CRM">
        <FaHome />
        <MenuText>Dashboard</MenuText>
      </StyledLink>
    </MenuItem>
   { hasPermissions(['read-order','update-order','create-order','delete-order']) && <MenuItem>
        <StyledLink to="/orders">
          <FaShoppingCart />
          <MenuText>Orders</MenuText>
        </StyledLink>
      </MenuItem>}
      {/* <MenuItem>
        <StyledLink to="/addproduct">
          <FiPlus />
          <MenuText>Add Products</MenuText>
        </StyledLink>
      </MenuItem> */}
  {    hasPermissions(['read-product','update-product','create-product','delete-product']) &&    <MenuItem>
            <StyledLink to="/products">
              <FaEdit />
              <MenuText>Products</MenuText>
            </StyledLink>
          </MenuItem>}
      {  hasPermissions(['read-role','update-role','create-role','delete-role']) &&   <MenuItem>
        <StyledLink to="/roles">
          <FaUserPlus />
          <MenuText>Roles</MenuText>
        </StyledLink>
      </MenuItem>}
     {  hasPermissions(['read-brand','update-brand','create-brand','delete-brand']) && <MenuItem>
        <StyledLink to="/brand">
          <FaTag />
          <MenuText>Brand</MenuText>
        </StyledLink>
      </MenuItem>}
      {/* <MenuItem>
        <StyledLink to="/addadmin">
          <FaUserPlus />
          <MenuText>Add Admin</MenuText>
        </StyledLink>
      </MenuItem> */}
      { hasPermissions(['read-category','update-category','create-category','delete-category']) && <MenuItem>
        <StyledLink to="/category">
          <FaTag />
          <MenuText>Categorys</MenuText>
        </StyledLink>
      </MenuItem>}
     { hasPermissions(['read-subCategory','update-subCategory','create-subCategory','delete-subCategory']) && <MenuItem>
        <StyledLink to="/subcategory">
          <FaTag />
          <MenuText>Subcategory</MenuText>
        </StyledLink>
      </MenuItem>}
      { hasPermissions(['read-user','update-user','create-user','delete-user']) && <MenuItem>
        <StyledLink to="/usersview">
          <FaUsers />
          <MenuText>Admins</MenuText>
        </StyledLink>
      </MenuItem>}
      {/* <MenuItem>
        <StyledLink to="/Reports">
          <FaChartBar />
          <MenuText>Reports</MenuText>
        </StyledLink>
      </MenuItem> */}

      <ButtonContainer>
        <Button onClick={handleLogOut}>Logout</Button>
        <Button onClick={handleclick}>Test</Button>
      </ButtonContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
