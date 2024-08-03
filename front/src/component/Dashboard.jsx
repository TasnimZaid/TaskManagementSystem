import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Function to fetch the user's name from the backend
  const getName = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        "http://localhost:2000/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setName(response.data.user_name);
      toast.success("Profile data fetched successfully");
    } catch (err) {
      console.error("Error fetching profile data:", err.message);
      toast.error("Failed to fetch profile data");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  // Function to handle logout
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      toast.success("Logout successful");
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err.message);
      toast.error("Logout failed");
    }
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Hello, {name}</h2>
      <button onClick={logout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
