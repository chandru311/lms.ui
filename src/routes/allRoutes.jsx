import React from "react";
import Login from "../Components/Login/Authentication/Login";
import ForgotPassword from "../Components/Login/Authentication/ForgetPassword";
import Navbar from "../Components/Home/Navbar";
import Logout from "../Components/Login/Authentication/Logout";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import ManagerDashboard from "../Components/Manager/ManagerDashboard";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
import LeaveAdministration from "../Components/Admin/LeaveAdministartion";
import ManageCompany from "../Components/Admin/EmployeeAdministration";
import LeaveType from "../Components/Admin/LeaveType";
import HolidayList from "../Components/Admin/HolidayList";
import LeaveBalance from "../Components/Admin/LeaveBalance";


const authProtectedRoutes = [
    { path: "/admin-dashboard", component: <AdminDashboard /> },
  { path: "/manager-dashboard", component: <ManagerDashboard /> },
  { path: "/employee-dashboard", component: <EmployeeDashboard /> },
  { path: "/leave-administration", component: <LeaveAdministration /> },
  { path: "/allocated-leaves", component: <LeaveType /> },
  { path: "/employee-administration", component: <ManageCompany /> },
  { path: "/leave-type", component: <LeaveType /> },
  { path: "/holiday-list", component: <HolidayList /> },
  { path: "/leave-balance", component: <LeaveBalance /> },
];

const publicRoutes = [
  { path: "/", component: <Navbar /> },
  { path: "/login", component: <Login /> },
  { path: "/forget-password", component: <ForgotPassword /> },
  { path: "/logout", component: <Logout /> },
];

export { authProtectedRoutes, publicRoutes };
