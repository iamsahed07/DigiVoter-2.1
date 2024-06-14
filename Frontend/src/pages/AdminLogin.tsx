import React, { useState } from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

const AdminLogin: React.FC = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      // Call your API endpoint for admin login
      // Example:
      // const response = await client.post("/admin/login", adminCredentials);
      // localStorage.setItem("adminToken", response.data.adminToken);
      // navigate("/admin/dashboard");
      
      // For demonstration, I'm directly navigating to admin dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLoginAsVoter = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-indigo-500">
      <div className="flex flex-col md:flex-row items-center justify-center md:w-[80%] w-full md:max-w-[800px] rounded-lg md:shadow-lg space-y-8 md:space-y-0 md:space-x-8">
        <div className="md:w-3/5 w-full">
          <Container className="bg-white px-6 py-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Admin Login
            </h1>
            <div className="space-y-4">
              <input
                type="text"
                className="block w-full px-4 py-3 text-sm border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                placeholder="Username"
                value={adminCredentials.username}
                onChange={(e) =>
                  setAdminCredentials({
                    ...adminCredentials,
                    username: e.target.value,
                  })
                }
              />
              <input
                type="password"
                className="block w-full px-4 py-3 text-sm border rounded-lg focus:ring focus:ring-blue-500 outline-none"
                placeholder="Password"
                value={adminCredentials.password}
                onChange={(e) =>
                  setAdminCredentials({
                    ...adminCredentials,
                    password: e.target.value,
                  })
                }
              />
              <button
                className="w-full py-3 mt-4 font-semibold text-white bg-green-500 rounded-lg shadow hover:bg-green-600 transition-colors"
                onClick={handleAdminLogin}
              >
                Login
              </button>
              <button
                className="w-full py-3 mt-4 font-semibold text-white bg-blue-700 rounded-lg shadow hover:bg-blue-800 transition-colors"
                onClick={handleLoginAsVoter}
              >
                Login as Voter
              </button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
