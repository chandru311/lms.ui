import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../../css/Login.css";
import logo from "../../../assets/ai4soln-logo.png";
import { postApiData } from "../../../Common/helpers/axiosHelper";
import { ToastContainer, toast } from "react-toastify";
import { role, roles } from "../../../Common/common/roles";

const Login = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Please Enter Your userName"),
    password: Yup.string().required("Please Enter Your Password"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },

    validationSchema,
    onSubmit: async (values) => {
      const response = await postApiData("api/Login", JSON.stringify(values));

      if (response.success && response.data.token) {
        const userType = response.data.role;

        const logged_user = {
          userName: response.data.userName,
          token: response.data.token,
          userType: userType,
        };
        sessionStorage.setItem("authUser", JSON.stringify(logged_user));
        if (userType) {
          toast.success(`Welcome! Logging in as ${roles[userType]}`, {
            position: "top-right",
            autoClose: 2000,
            closeButton: false,
            onClose: () => {
              navigate(
                `/${
                  userType === 1
                    ? "admin"
                    : userType === 2
                    ? "manager"
                    : "employee"
                }-dashboard`
              );
            },
          });
        }
      } else {
        toast.error(
          `${
            response.message ||
            "Login failed. Please check your credentials and try again."
          }`,
          {
            position: "top-right",
            autoClose: 2000,
            closeButton: false,
          }
        );
      }
    },
  });

  return (
    <div className="contain-login">
      <div className="login-box-login">
        <div className="login-content-login">
          <div className="logo-container-login">
            <div className="logo-circle-login">
              <img src={logo} alt="" className="logo-login" />
            </div>
          </div>
          <h2>Sign In</h2>

          <Form onSubmit={formik.handleSubmit} className="form-horizontal">
            <FormGroup className="input-container">
              <div className="input-wrapper-login">
                <FaUser className="icon-login" />
                <Input
                  type="text"
                  name="userName"
                  //id="userName"
                  placeholder="UserName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.userName && !!formik.errors.userName}
                />
              </div>
              {formik.touched.userName && formik.errors.userName && (
                <div className="error-login">{formik.errors.userName}</div>
              )}
            </FormGroup>
            <FormGroup className="input-container">
              <div className="input-wrapper-login">
                <FaLock className="icon-login" />
                <Input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.password && !!formik.errors.password}
                />
                {formik.values.password.length > 0 && (
                  <>
                    {passwordShown ? (
                      <FaEyeSlash
                        className="password-icon-login"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="password-icon-login"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </>
                )}
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="error-login">{formik.errors.password}</div>
              )}
            </FormGroup>
            <Button type="submit" className="login-button-login">
              Log In
            </Button>
            <Link to="/forget-password" className="login-link-login">
              Forgot password?
            </Link>
          </Form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
