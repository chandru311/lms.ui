import React from "react";
import Login from "../Components/Login/Authentication/Login";
import ForgotPassword from "../Components/Login/Authentication/ForgetPassword";
import Navbar from "../Components/Home/Navbar";
import Logout from "../Components/Login/Authentication/Logout";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import ManagerDashboard from "../Components/Manager/ManagerDashboard";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
import ManageCompany from "../Components/Admin/EmployeeAdministration";
import LeaveType from "../Components/Admin/LeaveType";
import HolidayList from "../Components/Admin/HolidayList";
import LeaveBalance from "../Components/Admin/LeaveBalance";
import ApplyLeaveModal from "../Components/Admin/ApplyLeave";
import LeaveRequestsDashboard from "../Components/Admin/ViewLeaveRequests";
import LeaveAdministration from '../Components/Admin/LeaveAdministartion'
import LeaveHistroy from "../Components/Admin/LeaveHistroy";
const authProtectedRoutes = [
    { path: "/admin-dashboard", component: <AdminDashboard /> },
  { path: "/manager-dashboard", component: <ManagerDashboard /> },
    { path: "/employee-dashboard", component: <EmployeeDashboard /> },
    { path: "/leave-administration", component: <LeaveAdministration /> },
    { path: "/view-leave-requests", component: <LeaveRequestsDashboard /> },
  { path: "/allocated-leaves", component: <LeaveType /> },
    { path: "/employee-administration", component: <EmployeeAdministration /> },
  { path: "/leave-type", component: <LeaveType /> },
  { path: "/holiday-list", component: <HolidayList /> },
  { path: "/leave-balance", component: <LeaveBalance /> },
    { path: "/apply-leave", component: <ApplyLeaveModal /> },
    {
        path: "/leave-history", component: <LeaveHistroy />
    }
];

const publicRoutes = [
  { path: "/", component: <Navbar /> },
  { path: "/login", component: <Login /> },
  { path: "/forget-password", component: <ForgotPassword /> },
  { path: "/logout", component: <Logout /> },
];

export { authProtectedRoutes, publicRoutes };
