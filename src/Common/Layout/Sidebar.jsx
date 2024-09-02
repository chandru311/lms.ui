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
    BsPlusLg,
    BsSearch,
    BsCalendar,
    BsBarChartFill,
} from "react-icons/bs";
import "../../index.css";
import logo from "../../assets/ai4soln-logo.png";

const Sidebar = ({ openSidebarToggle, OpenSidebar, userRole }) => {
    const [isLeaveManagementOpen, setIsLeaveManagementOpen] = useState(false);
    const [isReportsOpen, setIsReportsOpen] = useState(false);

    const toggleLeaveManagement = () => {
        setIsLeaveManagementOpen(!isLeaveManagementOpen);
    };
    const toggleReports = () => {
        setIsReportsOpen(!isReportsOpen);
    };


    return (
        <aside
            id="sidebar"
            className={openSidebarToggle ? "sidebar-responsive" : ""}
        >
            <div className="sidebar-title">
                {/* <div className="sidebar-brand"> */}
                <img src={logo} alt="AI4Soln Logo" style={{ width: "80px",  }} />
                {/* <img src="" alt="" /> */}
                {/* </div> */}
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
                            // style={{ color: "black", textDecoration: "none" }}
                            >
                                <BsBarChartFill className="icon" /> Dashboard
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <Link
                                to="/employee-administration"
                            // style={{ color: "black", textDecoration: "none" }}
                            >
                                <BsPeopleFill className="icon" /> Emp Management
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <div className="submenu">
                                <div className="submenu-title" onClick={toggleLeaveManagement}>
                                    <BsMenuButtonWideFill className="icon" /> Leave Management
                                    <BsChevronDown />
                                </div>
                                {isLeaveManagementOpen && (
                                    <ul className="submenu-list">
                                        <li>
                                            <Link to="/allocated-leaves" className="submenu-item">
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
                            // style={{ color: "black", textDecoration: "none" }}
                            >
                                <BsBuilding className="icon" /> Depart Management
                            </Link>
                        </li>
                        <li className="sidebar-list-item">
                            <div className="submenu">
                                <div className="submenu-title" onClick={toggleReports}>
                                    <Link
                                        to="/reports"
                                        style={{ color: "black", textDecoration: "none" }}
                                    >
                                        <BsFileText className="icon" /> Reports  <BsChevronDown />
                                    </Link>
                                </div>
                                {isReportsOpen && (
                                    <ul className="submenu-list">
                                        <li>
                                            <Link to="/overall-employee-report" className="submenu-item">
                                                <BsSearch className="icon" /> Emp Report
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/annual-report" className="submenu-item">
                                                <BsCalendar className="icon" /> Annual Report
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
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
                            <div className="submenu">
                                <div className="submenu-title" onClick={toggleReports}>
                                    <Link
                                        to="/reports"
                                        style={{ color: "black", textDecoration: "none" }}
                                    >
                                        <BsFileText className="icon" /> Reports  <BsChevronDown />
                                    </Link>
                                </div>
                                {isReportsOpen && (
                                    <ul className="submenu-list">
                                        <li>
                                            <Link to="/overall-employee-report" className="submenu-item">
                                                <BsSearch className="icon" /> Emp Report
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/annual-report" className="submenu-item">
                                                <BsCalendar className="icon" /> Annual Report
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;
