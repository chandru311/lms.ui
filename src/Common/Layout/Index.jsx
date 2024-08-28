import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [userRole, setUserRole] = useState("Admin");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <React.Fragment>
      <div className="layout-container">
        <Header OpenSidebar={OpenSidebar} userRole="1" />
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
