import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link as ScrollLink, Element as ScrollElement } from "react-scroll";
import logo from "../../assets/ai4soln-logo.png";
import Home from "./Home";
import '../../index.css'
const NavbarComponent = () => {
    return (
        <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo} alt="AI4Soln Logo" width="80" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end align-items-center">
                        <Nav style={{ justifyContent: 'space-around', cursor: 'pointer' }}>
                            <ScrollLink to="home-section" smooth={true} duration={500}>
                                <Nav.Link as="span" >Home</Nav.Link>
                            </ScrollLink>
                            <ScrollLink to="about-section" smooth={true} duration={500}>
                                <Nav.Link as="span" >About</Nav.Link>
                            </ScrollLink>
                            <Nav.Link href="login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ScrollElement name="home-section">
                <Home />
            </ScrollElement>
        </>
    );
};

export default NavbarComponent;