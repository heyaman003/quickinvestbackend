import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../containers/AuthPages/Login";
import Register from "../containers/AuthPages/Register";
import ForgotPassword from "../containers/AuthPages/ForgotPassword";
import ResetPassword from "../containers/AuthPages/ResetPassword";
import Page404 from "../containers/Page404NotFound/Page404";
import UserDashboardLayout from "../layout/UserDashboardLayout";
import AdminDashboadLayout from "../layout/AdminDashboadLayout";
import LandingPage from "../containers/LandingPage";
import AdminLogin from "../containers/AuthPages/AdminLogin";

const Routers = () => {
  return (
    <>
      <Routes>
        {/* This for not found page */}
        <Route path='*' element={<Page404 />} />
        {/* This for user auth page */}
        <Route path="/" index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* This for user dashboard */}
        <Route path='/dashboard/*' element={<UserDashboardLayout />} />
        {/* This for admin dashboard */}
        <Route path='/admin/*' element={<AdminDashboadLayout />} />
        {/* For Admin Login page */}
        <Route path="/adminlogin" element={<AdminLogin/>} />
      </Routes>
    </>
  );
};

export default Routers;
