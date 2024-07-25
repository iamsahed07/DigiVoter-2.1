// components/AdminProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken"); // Replace with your admin token key
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (!token) {
        toast.error("You need to log in as an admin to access this page.");
      }
    }, 1000); // Simulate loading time
  }, [token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!token) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};
export default AdminProtectedRoute;
