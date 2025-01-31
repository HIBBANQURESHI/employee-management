import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://ems-backend-mu.vercel.app/api/auth/login", { email, password });
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate(response.data.user.role === "admin" ? "/admin-dashboard" : "/employee-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Server Error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-gray-900 rounded-xl shadow-lg p-8 text-white"
      >
        <h2 className="text-3xl font-semibold text-center mb-6">Employee Management System</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5 py-6">
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              {/*<span className="text-gray-400">Remember me</span>*/}
            </label>
            {/*<a href="#" className="text-teal-400 hover:underline">Forgot password?</a>*/}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 transition duration-200 text-white py-2 rounded-lg shadow-lg"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
