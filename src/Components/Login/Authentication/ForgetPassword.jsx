import React, { useEffect } from "react";
import { Row, Col, Card, CardBody, Container, Input, Form } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../../css/ForgotPassword.css";
import logo from "../../../assets/ai4soln-logo.png";
import { postApiData } from "../../../Common/helpers/axiosHelper";

const ForgotPassword = (props) => {
  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  const navigate = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please Enter Your Email"),
    }),
    onSubmit: async (values) => {
      const response = await postApiData(
        "api/ForgotPassword",
        JSON.stringify(values)
      );
      if (response.success === true) {
        toast.success("Link sent successfully", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            navigate("/reset-success", { replace: true });
          },
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
  });

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>

      <div className="flex items-center justify-center  my-3 pt-sm-5 ">
        <Container>
          <Row className="justify-content-center">
            <Col md={5}>
              <Card className=" overflow-hidden card-fp">
                <Col xs={12} className="text-primary-forget p-4 text-center">
                  <div className="logo-container-forget">
                    <div className="logo-circle-forget">
                      <img src={logo} alt="" className="logo-forget" />
                    </div>
                  </div>

                  <h2 className="text-primary-forget">Reset Password</h2>
                  <p>Enter your registered email to reset</p>
                </Col>

                <CardBody className="pt-0">
                  <div className="p-2">
                    <ToastContainer closeButton={false} limit={1} />
                    <Form
                      className="form-horizontal"
                      onSubmit={validation.handleSubmit}
                    >
                      <div className="mb-3">
                        <Input
                          name="email"
                          placeholder="Email"
                          type="email"
                          style={{ borderRadius: "20px", height: "45px" }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email &&
                            !!validation.errors.email
                          }
                        />
                        {validation.touched.email &&
                          validation.errors.email && (
                            <div className="error-forget">
                              {validation.errors.email}
                            </div>
                          )}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary-forget w-md"
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                      <div className="text-center mt-3">
                        <p>
                          Go back to{" "}
                          <Link to="/login" className="font-weight: bold;">
                            Login
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassword;
