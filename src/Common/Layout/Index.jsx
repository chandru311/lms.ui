import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { roles } from "../common/roles";

const Layout = (props) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        if (obj) setUserRole(roles[obj.userType]);
    }, []);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <React.Fragment>
            <div className="layout-container">
                <Header OpenSidebar={OpenSidebar} userRole={userRole} />
                <div className="main-content-container">
            <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
                userRole={userRole}
            />
                    <div className="main-content">{props.children}</div>
                </div>
                <Footer />

            </div>
        </React.Fragment>
    );
};

export default Layout;

