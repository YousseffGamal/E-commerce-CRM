// axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from cookies
    const token = Cookies.get("token"); // Replace 'token' with the name of your cookie

    if (token) {
      // Attach token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
