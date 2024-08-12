// import React, { useState } from 'react';
// import Sidebar from '../../component/sidebar/Sidebar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import styled, { keyframes } from 'styled-components';
// import { FaUser, FaLock, FaBell, FaPaintBrush } from 'react-icons/fa';

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const Container = styled.div`
//   display: flex;
//   height: 100vh;
//   overflow: hidden;
// `;

// const Content = styled.div`
//   flex: 1;
//   padding: 20px;
//   margin-left: 250px; /* Adjust based on sidebar width */
//   background-color: #f4f6f9;
//   animation: ${fadeIn} 0.6s ease-in-out;
//   transition: margin-left 0.3s ease;
//   @media (max-width: 768px) {
//     margin-left: 60px; /* Adjust for mobile view */
//   }
// `;

// const FormContainer = styled.div`
//   max-width: 800px;
//   width: 100%;
//   margin: 0 auto;
//   padding: 40px;
//   background-color: #ffffff;
//   border-radius: 12px;
//   box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 8px;
//   font-weight: 600;
//   color: #333333;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 14px;
//   border: 1px solid #dddddd;
//   border-radius: 8px;
//   font-size: 16px;
//   transition: border-color 0.3s ease;

//   &:focus {
//     border-color: #007bff;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//   }
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 14px;
//   border: 1px solid #dddddd;
//   border-radius: 8px;
//   font-size: 16px;
//   transition: border-color 0.3s ease;

//   &:focus {
//     border-color: #007bff;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//   }
// `;

// const Button = styled.button`
//   padding: 14px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// const SectionTitle = styled.h3`
//   margin-bottom: 20px;
//   display: flex;
//   align-items: center;
//   font-size: 20px;
//   color: #333333;
// `;

// const Icon = styled.div`
//   margin-right: 10px;
//   font-size: 24px;
//   color: #007bff;
// `;

// const Settings = () => {
//   const [profile, setProfile] = useState({ name: '', email: '' });
//   const [security, setSecurity] = useState({ password: '', twoFactor: false });
//   const [notifications, setNotifications] = useState({ email: true, sms: false });
//   const [appearance, setAppearance] = useState({ theme: 'light' });

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleSecurityChange = (e) => {
//     const { name, value, checked } = e.target;
//     setSecurity({ ...security, [name]: value || checked });
//   };

//   const handleNotificationChange = (e) => {
//     const { name, checked } = e.target;
//     setNotifications({ ...notifications, [name]: checked });
//   };

//   const handleAppearanceChange = (e) => {
//     const { value } = e.target;
//     setAppearance({ theme: value });
//   };

//   return (
//     <Container>
//       <Sidebar />
//       <Content>
//         <FormContainer>
//           <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Settings</h2>
//           <Form>
//             <FormGroup>
//               <SectionTitle><Icon><FaUser /></Icon>Profile</SectionTitle>
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleProfileChange}
//                 placeholder="Enter your name"
//                 required
//               />
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleProfileChange}
//                 placeholder="Enter your email address"
//                 required
//               />
//             </FormGroup>

//             <FormGroup>
//               <SectionTitle><Icon><FaLock /></Icon>Security</SectionTitle>
//               <Label htmlFor="password">New Password</Label>
//               <Input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={security.password}
//                 onChange={handleSecurityChange}
//                 placeholder="Enter a new password"
//                 required
//               />
//               <Label>
//                 <input
//                   type="checkbox"
//                   name="twoFactor"
//                   checked={security.twoFactor}
//                   onChange={handleSecurityChange}
//                 />
//                 Enable Two-Factor Authentication
//               </Label>
//             </FormGroup>

//             <FormGroup>
//               <SectionTitle><Icon><FaBell /></Icon>Notifications</SectionTitle>
//               <Label>
//                 <input
//                   type="checkbox"
//                   name="email"
//                   checked={notifications.email}
//                   onChange={handleNotificationChange}
//                 />
//                 Email Notifications
//               </Label>
//               <Label>
//                 <input
//                   type="checkbox"
//                   name="sms"
//                   checked={notifications.sms}
//                   onChange={handleNotificationChange}
//                 />
//                 SMS Notifications
//               </Label>
//             </FormGroup>

//             <FormGroup>
//               <SectionTitle><Icon><FaPaintBrush /></Icon>Appearance</SectionTitle>
//               <Label htmlFor="theme">Theme</Label>
//               <Select
//                 id="theme"
//                 value={appearance.theme}
//                 onChange={handleAppearanceChange}
//               >
//                 <option value="light">Light Mode</option>
//                 <option value="dark">Dark Mode</option>
//               </Select>
//             </FormGroup>

//             <Button type="submit">Save Changes</Button>
//           </Form>
//         </FormContainer>
//       </Content>
//     </Container>
//   );
// };

// export default Settings;
