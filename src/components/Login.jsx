import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);
      setMessage(response.data.message || "Login successful!");
      navigate("/"); // Kullanıcı giriş yaptıktan sonra ana sayfaya yönlendirme
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">      
      <form className="bg-white p-6 pb-10 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username or Email</label>
          <input
            type="text"
            name="usernameOrEmail"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter your username or email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
