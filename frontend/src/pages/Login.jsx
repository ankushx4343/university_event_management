import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { setToken } from "../services/api";
import toast from "react-hot-toast";
import { AuthContex } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContex);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        setToken(res.data.token);
        login(res.data.user);
        toast.success(res.data.message || "Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
