// src/components/Sidebar/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { FaHome, FaShoppingCart, FaChartBar, FaCog, FaEdit, FaUserPlus, FaTag, FaPlusCircle, FaUsers } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>CRM</SidebarHeader>
      <MenuItem>
        <StyledLink to="/CRM">
          <FaHome />
          <MenuText>Dashboard</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/orders">
          <FaShoppingCart />
          <MenuText>Orders</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/addproduct">
          <FiPlus />
          <MenuText>Add Products</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/ManageProducts">
          <FaEdit />
          <MenuText>Manage Products</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/addrole">
          <FaUserPlus />
          <MenuText>Add Role</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/brandpage">
          <FaTag />
          <MenuText>Brand</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/addadmin">
          <FaUserPlus />
          <MenuText>Add Admin</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/category">
          <FaTag  />
          <MenuText>Categorys</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/subcategory">
          <FaTag />
          <MenuText>Subcategory</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/usersview">
          <FaUsers />
          <MenuText>Users View</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/Reports">
          <FaChartBar />
          <MenuText>Reports</MenuText>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/settings">
          <FaCog />
          <MenuText>Settings</MenuText>
        </StyledLink>
      </MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
