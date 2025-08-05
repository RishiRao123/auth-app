import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user, success, message } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        handleSuccess(`Welcome back, ${user.name}!`);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      const { response } = error;

      if (response?.data?.errors?.length) {
        response.data.errors.forEach((err) => {
          handleError(`${err.field}: ${err.message}`);
        });
      } else {
        handleError(response?.data?.message || "Login failed. Try again.");
      }
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 px-4'>
      <div className='w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10'>
        <h2 className='text-3xl font-bold text-center  text-purple-700 mb-8'>
          Log In to Your Account
        </h2>

        <form onSubmit={handleLogin} className='space-y-6'>
          {/* Email */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:ring-purple-400'
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='••••••••'
              className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2  focus:ring-purple-400'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-lg'
          >
            Log In
          </button>
        </form>

        <p className='text-sm text-center text-gray-600 mt-6'>
          Don’t have an account?{" "}
          <Link
            to='/signup'
            className='text-purple-600 hover:underline font-medium'
          >
            Sign up here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
