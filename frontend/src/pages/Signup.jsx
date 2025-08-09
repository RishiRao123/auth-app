import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const url = "http://localhost:8000/auth/signup";
      const response = await axios.post(url, formData);

      if (response.status === 200 || response.status === 201) {
        handleSuccess("Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      const { response } = error;

      if (response?.status === 400 && response?.data?.message) {
        handleError(response.data.message);
      } else {
        handleError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 px-4'>
      <div className='w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10'>
        <h2 className='text-3xl font-bold text-center text-purple-700 mb-8'>
          Sign Up for Free
        </h2>

        <form onSubmit={handleSignup} className='space-y-6' noValidate>
          {/* Name */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Full Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
              className={`mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className='text-red-600 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

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
              className={`mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>{errors.email}</p>
            )}
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
              className={`mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className='text-red-600 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-lg cursor-pointer '
          >
            Sign Up
          </button>
        </form>

        <p className='text-sm text-center text-gray-600 mt-6'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='text-purple-600 hover:underline font-medium'
          >
            Log in here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
