import React from "react";
import { Container, Row, Col } from "reactstrap";
import '../../index.css'
const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container fluid={true}>
                    <Row>
                        {/* <Col md={6}>{new Date().getFullYear()} © Crescent Exchange.</Col> */}
                        <Col md={5} className="mt-5">
                            <div className="text-sm-end d-none d-sm-block mt-5">
                                Developed by Ai4soln
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
