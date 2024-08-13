// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';



const ProtectedRoute = ({ redirectTo }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    // If not authenticated, redirect to the login page or specified route
    return <Navigate to={redirectTo} />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};

export default ProtectedRoute;