import React from "react";
import Login from "../Components/Login/Authentication/Login";
import ForgotPassword from "../Components/Login/Authentication/ForgetPassword";
import Navbar from "../Components/Home/Navbar";
import Logout from "../Components/Login/Authentication/Logout";
import EmpRegBut from "../Components/pages/EmployeeReport/EmpRegBut";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import ManagerDashboard from "../Components/Manager/ManagerDashboard";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
import LeaveAdministration from "../Components/Admin/LeaveAdministartion";
import ManageCompany from "../Components/Admin/EmployeeAdministration";

import LeaveBalance from "../Components/Leave/LeaveBalance";
import HolidayList from "../Components/Leave/HolidayList";
import Reports from "../Components/Admin/Reports/Reports";

const authProtectedRoutes = [
  { path: "/empregbut", component: <EmpRegBut /> },
  { path: "/admin-dashboard", component: <AdminDashboard /> },
  { path: "/manager-dashboard", component: <ManagerDashboard /> },
  { path: "/employee-dashboard", component: <EmployeeDashboard /> },
  { path: "/leave-administration", component: <LeaveAdministration /> },
  { path: "/employee-administration", component: <ManageCompany /> },

  { path: "/holiday-list", component: <HolidayList /> },
  { path: "/leave-balance", component: <LeaveBalance /> },
  { path: "/reports", component: <Reports /> },
];

const publicRoutes = [
  { path: "/", component: <Navbar /> },
  { path: "/login", component: <Login /> },
  { path: "/forget-password", component: <ForgotPassword /> },
  { path: "/logout", component: <Logout /> },
];

export { authProtectedRoutes, publicRoutes };
