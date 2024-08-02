import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFileText,
  BsBuilding,
  BsChevronDown,
  BsClipboardCheck,
  BsEye,
  BsBarChartFill,
  BsPlus,
  BsPlusLg,
} from "react-icons/bs";
import "../../index.css";

const Sidebar = ({ openSidebarToggle, OpenSidebar, userRole }) => {
  const [isLeaveManagementOpen, setIsLeaveManagementOpen] = useState(false);

  const toggleLeaveManagement = () => {
    setIsLeaveManagementOpen(!isLeaveManagementOpen);
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img src="" alt="" />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>
      <ul className="sidebar-list" style={{ marginTop: "3rem" }}>
        {userRole === "Admin" && (
          <>
            <li className="sidebar-list-item">
              <Link
                to="/admin-dashboard"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsBarChartFill className="icon" /> Dashboard
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                to="/employee-administration"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsPeopleFill className="icon" /> Emp Management
              </Link>
            </li>
            <li className="sidebar-list-item">
              <div className="submenu">
                <div className="submenu-title" onClick={toggleLeaveManagement}>
                  <BsMenuButtonWideFill className="icon" /> Leave Management{" "}
                  <BsChevronDown />
                </div>
                {isLeaveManagementOpen && (
                  <ul className="submenu-list">
                    <li>
                      <Link to="/allocate-leaves" className="submenu-item">
                        <BsClipboardCheck className="icon" /> Allocate Leaves
                      </Link>
                    </li>
                    <li>
                      <Link to="/view-leave-requests" className="submenu-item">
                        {" "}
                        <BsEye className="icon" /> View Leave Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/apply-leave" className="submenu-item">
                        {" "}
                        <BsPlusLg className="icon" /> Apply Leave
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li className="sidebar-list-item">
              <Link
                to="/department-administration"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsBuilding className="icon" /> Depart Management
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                to="/reports"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsFileText className="icon" /> Reports
              </Link>
            </li>
          </>
        )}
        {userRole === "Manager" && (
          <>
            <li className="sidebar-list-item">
              <Link
                to="/manager-dashboard"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsBarChartFill className="icon" /> Dashboard
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                to="/employee-administration"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsPeopleFill className="icon" /> Emp Management
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                to="/leave-management"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsMenuButtonWideFill className="icon" /> Leave Management
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link
                to="/reports"
                style={{ color: "black", textDecoration: "none" }}
              >
                <BsFileText className="icon" /> Reports
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
