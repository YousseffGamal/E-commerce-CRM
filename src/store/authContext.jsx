import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    permissions: JSON.parse(localStorage.getItem("permissions")) || [], // Added permissions state
  });

  const login = async (cred) => {
    try {
      const { data } = await axiosInstance.post("/signin", cred);
      console.log(data);
      
      // Extract permissions and other user data
      const permissions = data.user.roles.flatMap((role) => role.permissions.map(permission => permission.name)) || []; 
     
      setAuth({
        token: data.token,
        user: data.user,
        permissions: permissions,
      });

      // Save data to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("permissions", JSON.stringify(permissions)); // Save permissions to localStorage
      console.log(localStorage.getItem('permissions'))
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setAuth({ token: "", user: null, permissions: [] }); // Reset permissions state
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions"); 
    
  };




  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) { // Token expired or unauthorized
          logout(); // Logout the user and redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on component unmount
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, [logout]);


  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);