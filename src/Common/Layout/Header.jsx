import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { BsChevronDown, BsPerson, BsPower } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";
import logo from "../../assets/ai4soln-logo.png";
import { roleList } from "../common/roles";

const Header = ({ OpenSidebar, userRole }) => {
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
                        <DropdownItem onClick={toggleProfileModal}>
                            <BsPerson className="font-size-16 align-middle me-1" />
                            Profile
                        </DropdownItem>

                        <DropdownItem />
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <DropdownItem>
                                <BsPower className="font-size-16 align-middle me-1 text-danger" />
                                Logout
                            </DropdownItem>
                        </Link>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <Profile isOpen={profileModalOpen} toggle={toggleProfileModal} />
        </header>
    );
};

Header.propTypes = {
    OpenSidebar: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
};

export default Header;
