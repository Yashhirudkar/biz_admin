// utils/axiosInstance.js
import axios from "axios";
import store from "../store"; // adjust path to your Redux store

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ensures cookies/session are sent
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to catch 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto-logout on 401
      store.dispatch({ type: "login/logout" });
      // Optionally redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
