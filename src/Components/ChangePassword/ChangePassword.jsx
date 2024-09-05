import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postApiData } from "../../Common/helpers/axiosHelper";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    document.title = "Change Password";
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please Enter Your current Password"),
      newPassword: Yup.string().required("Please Enter Your new Password"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      const response = await postApiData(
        "api/ChangePassword",
        JSON.stringify(values)
      );
      if (response.success === true) {
        toast.success("Password Successfully Changed", {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            navigate(`/login`);
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
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="card p-4"
        style={{ borderRadius: "20px", width: "480px" }}
      >
        <h4 className="card-title text-center mb-3">Change Password</h4>
        <ToastContainer closeButton={false} limit={1} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <div className="input-group">
              <input
                name="oldPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Current Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.oldPassword || ""}
                className={`form-control ${
                  validation.touched.oldPassword &&
                  validation.errors.oldPassword
                    ? "is-invalid"
                    : ""
                }`}
                // style={{ borderRadius: "10px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="input-group-text"
                // style={{ cursor: "pointer" }}
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </span>
              {validation.touched.oldPassword &&
                validation.errors.oldPassword && (
                  <div className="invalid-feedback">
                    {validation.errors.oldPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <div className="input-group">
              <input
                name="newPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter New Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.newPassword || ""}
                className={`form-control ${
                  validation.touched.newPassword &&
                  validation.errors.newPassword
                    ? "is-invalid"
                    : ""
                }`}
                // style={{ borderRadius: "10px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="input-group-text"
                // style={{ cursor: "pointer" }}
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </span>
              {validation.touched.newPassword &&
                validation.errors.newPassword && (
                  <div className="invalid-feedback">
                    {validation.errors.newPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                name="password_confirmation"
                type={passwordShown ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password_confirmation || ""}
                className={`form-control ${
                  validation.touched.password_confirmation &&
                  validation.errors.password_confirmation
                    ? "is-invalid"
                    : ""
                }`}
                // style={{ borderRadius: "10px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="input-group-text"
                // style={{ cursor: "pointer" }}
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </span>
              {validation.touched.password_confirmation &&
                validation.errors.password_confirmation && (
                  <div className="invalid-feedback">
                    {validation.errors.password_confirmation}
                  </div>
                )}
            </div>
          </div>
          <button
            type="submit"
            className="btn text-white w-100"
            style={{ backgroundColor: "#5e2ced", borderRadius: "10px" }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
