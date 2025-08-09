import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleSuccess("You have been logged out.");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 px-4'>
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-md w-full text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Welcome, <span className='text-indigo-600'>{userName}</span>! 🎉
        </h1>
        <p className='text-gray-600 mb-6'>We're glad to have you back.</p>
        <button
          onClick={handleLogout}
          className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition duration-300 cursor-pointer'
        >
          Logout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
