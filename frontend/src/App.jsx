import React from "react";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
    </Routes>
  );
};

export default App;
