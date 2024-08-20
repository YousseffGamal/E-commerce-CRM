import React, { useEffect, useState } from 'react';
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
  background-color: #ffffff;
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
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
import { useNavigate } from 'react-router-dom';
const AddRoleForm = () => {


  const navigate = useNavigate();
  const [permissions , setPermissions] = useState([])
  const [Data , setData] = useState({
    roleName: '',
    permissionsIds: [],
  })


  useEffect(() =>{
    axiosInstance.get('/allPermissions')
    .then((res) =>{
      setPermissions(res.data)
    })
    .catch((err) =>{
      console.log(err)
    })
  },[])

  const handleChange = (e) =>{
    const { name , value } = e.target;
    setData({
      ...Data,
      [name] : value 
    })
  }

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if(checked){
      setData({
        ...Data,
       permissionsIds : [...Data.permissionsIds,value ]
      });
    } else {
      setData({
        ...Data,
       permissionsIds : Data.permissionsIds.filter(id => id!= value )
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/createRole', Data)
    .then((res) =>{
      navigate('/roles')
      console.log(res.data)
    })
    .catch((err) =>{
      alert('faild to add a new Role')
      console.log(err)
    })
  };

  return (
    <Container>
      <Sidebar />
     
      <div className='rrr' style={{ display: 'flex', width: '100%', padding: '20px' }}>
        <StyledFormContainer >
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Add Role</h2>
          <Form onSubmit={handleSubmit}>
          
            <FormGroup>
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                type="text"
                id="roleName"
                name='roleName'
                value={Data.roleName}
               onChange={handleChange}
                placeholder="Enter role name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Permissions</Label>
              <CheckboxGroup>
               { permissions?.map((per) => 
               (
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name={per.name}
                    value={per._id}
                    onChange={handlePermissionChange}
                  />
                 {per.name}
                </CheckboxLabel>
               )
               ) }
               
              </CheckboxGroup>
            </FormGroup>
            <Button type="submit">Add Role</Button>
          </Form>
        </StyledFormContainer>
      </div>
    </Container>
  );
};

export default AddRoleForm;
