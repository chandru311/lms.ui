import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  BsChevronDown,
  BsPerson,
  BsKey,
  BsCalendar,
  BsPower,
} from "react-icons/bs";
import { withTranslation } from "react-i18next";
import withRouter from "../components/withRouter";
import logo from "../../assets/ai4soln-logo.png";
import { roleList } from "../common/roles";
import "../../index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import logo from "../../assets/ai4soln-logo.png";
import { roleList } from "../common/roles";

const Header = ({ OpenSidebar, t, userRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [roleLabel, setRoleLabel] = useState("");

    useEffect(() => {
        const obj = JSON.parse(sessionStorage.getItem("authUser"));
        if (obj) setUsername(obj.userName);

    const role = roleList.find((role) => role.value === userRole);
    if (role) setRoleLabel(role.label);
  }, [userRole]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleProfileModal = () => setProfileModalOpen(!profileModalOpen);

  return (
    <header className="header">
      <div className="flex items-center justify-center gap-3">
        <button onClick={OpenSidebar}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
        <img src={logo} alt="AI4Soln Logo" />
      </div>

            <div className="header-right">
                <p>{roleLabel}</p> {/* Display the role label */}
                <Dropdown
                    isOpen={dropdownOpen}
                    toggle={toggleDropdown}
                    className="d-inline-block"
                >
                    <DropdownToggle
                        className="btn header-item"
                        tag="button"
                        style={{ border: "none" }}
                    >
                        <BsChevronDown />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                        {/* Conditionally render the Profile menu item */}
                        {userRole !== "Admin" && (
                            <DropdownItem onClick={toggleProfileModal}>
                                <BsPerson className="font-size-16 align-middle me-1" />
                                Profile
                            </DropdownItem>
                      )}
                      <Link to="/change-password" style={{ textDecoration: "none" }}>
                          <DropdownItem>
                              <BsKey className="font-size-16 align-middle me-1" />
                              {t("ChangePassword")}
                          </DropdownItem>
                      </Link>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <DropdownItem>
                                <BsPower className="font-size-16 align-middle me-1 text-danger" />
                                Logout
                            </DropdownItem>
                        </Link>
                    </DropdownMenu>
                </Dropdown>
            </div>
            {/* Only render Profile component when userRole is not Admin */}
            {userRole !== "Admin" && (
                <Profile isOpen={profileModalOpen} toggle={toggleProfileModal} uld={userRole} />
            )}
        </header>
    );
};

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default withRouter(withTranslation()(Header));
