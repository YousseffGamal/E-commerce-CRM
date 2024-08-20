import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Sidebar from '../../component/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../../axios';

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

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f4f6f9;
  margin-left: 250px; /* Adjust based on sidebar width */
  transition: margin-left 0.3s ease;
  animation: ${fadeIn} 0.6s ease-in-out;
  
  @media (max-width: 768px) {
    margin-left: 60px; /* Adjust for mobile view */
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: #ffffff;
  padding: 12px;
  text-align: left;
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dddddd;
  text-align: left;
  &:last-child {
    border-right: none;
  }
`;

const TableRow = styled.tr`
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f1f5f9;
  }
`;

const AddButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const EditButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background-color: #28a745;
  color: #ffffff;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  background-color: #dc3545;
  color: #ffffff;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #c82333;
  }
`;

const UsersViewPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [roles, setRoles] =useState([])
  const [editRoles , setEditRoles] =useState([])

  const handleEdit = (user) => {
    console.log(user)
    setEditRoles(user.roles.map(role => role._id))
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
   
    if( confirm('Are you Sure you want to delete this Admin')){
      axiosInstance.delete(`/deleteuser/${id}`)
      .then((res) =>{
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((err) =>{
      console.log(err)
      })
    }
  
  };

  const handleCloseEditModal = () => {
    getAllAdmins()
    setShowEditModal(false);
    setEditUser(null);
  };

  const handleSaveEdit = () => {
    setEditUser({
      ...editUser,
      roleIds : editRoles,
    })

   axiosInstance.patch(`/updateuser/${editUser._id}`,{ userID : editUser._id,name :editUser.name , email : editUser.email, phone :editUser.phone ,roleIds :editRoles ,isAdmin: 1 } )
   .then((res) =>{
    console.log(res.data)
    handleCloseEditModal();
  })
  .catch((err) =>{
    alert(`Faild to add Admin : ${err.response.data.message}`)  
  console.log(err)
  })

   
  };
  useEffect(() => {
    console.log(editUser);
  }, [editUser]);
  const handleAddUser = () => {
    navigate('/addadmin');
  };

  const handleChangeForTheCheckBox =  (e) => {
    const { value , checked} = e.target;
    if(checked){
      setEditRoles([...editRoles,value])
    }else {
      setEditRoles([...editRoles.filter(role => role != value)])
    }
    
  }



  const getAllRoles = () =>{
    axiosInstance.get('/allRoles')
    .then((res) =>{
      setRoles(res.data.roles)
    })
    .catch((err) =>{
    console.log(err)
    })
  }
  const getAllAdmins = () => {
    axiosInstance.get('/getalladmins')
    .then((res) =>{
      setUsers(res.data.AllAdmins)
      console.log(res.data.AllAdmins)
    })
    .catch((err) =>{
    console.log(err)
    })
  }
  useEffect(() =>{
    getAllAdmins()
    getAllRoles()
  },[])
  
  return (
    <Container>
      <Sidebar />
      <Content>
    
        <h2 style={{ marginBottom: '20px' }}>Admins</h2>
        <AddButton onClick={handleAddUser}>Add Admin</AddButton>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>phone</TableHeader>
                <TableHeader>roles</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => (
                <TableRow key={user._id}>
                  <TableData>{index+1}</TableData>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.phone}</TableData>
                  <TableData>{user.roles.map(role => role.name).join(' / ')}</TableData>
                  <TableData>
                    <EditButton onClick={() => handleEdit(user)}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDelete(user._id)}>Delete</DeleteButton>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        {/* Edit User Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={editUser?.name || ''}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUserEmail">
                <Form.Label>ُُEmail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter user Email"
                  value={editUser?.email || ''}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUserPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Enter user phone"
                  value={editUser?.phone || ''}
                  onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formUserEmail">
                <Form.Label>Roles</Form.Label>
                {  roles.map((role) => (
                  <Form.Check // prettier-ignore 
                  key={role._id}
                  id={role.name}
                  value={role._id}
                  type='checkbox'
                  checked={editRoles.includes(role._id)}
                  label={role.name}
                   onChange={handleChangeForTheCheckBox}
                />
              ))  }
              </Form.Group>
            </Form>
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
      </Content>
    </Container>
  );
};

export default UsersViewPage;
