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
      <div>
        <Header OpenSidebar={OpenSidebar} userRole="1" />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          userRole={userRole}
        />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
