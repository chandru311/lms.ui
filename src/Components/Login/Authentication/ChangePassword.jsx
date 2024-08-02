import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postApiData } from "../../../Common/helpers/axiosHelper";

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
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-lg"
        style={{ borderRadius: "20px", width: "480px" }}
      >
        <h4 className="text-2xl font-bold text-center">Change Password</h4>
        <ToastContainer closeButton={false} limit={1} />
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                name="oldPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Current Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.oldPassword || ""}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-0 focus:border-blue-500 sm:text-sm border-gray-300"
                style={{ borderRadius: "20px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {validation.touched.oldPassword &&
              validation.errors.oldPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {validation.errors.oldPassword}
                </p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                name="newPassword"
                type={passwordShown ? "text" : "password"}
                placeholder="Enter New Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.newPassword || ""}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-0 focus:border-blue-500 sm:text-sm border-gray-300"
                style={{ borderRadius: "20px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {validation.touched.newPassword &&
              validation.errors.newPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {validation.errors.newPassword}
                </p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="password_confirmation"
                type={passwordShown ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password_confirmation || ""}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-0 focus:border-blue-500 sm:text-sm border-gray-300"
                style={{ borderRadius: "20px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {validation.touched.password_confirmation &&
              validation.errors.password_confirmation && (
                <p className="mt-2 text-sm text-red-600">
                  {validation.errors.password_confirmation}
                </p>
              )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-custom-purple text-white rounded-md shadow-sm hover:bg-custom-purple-dark focus:outline-none focus:ring-0 focus:border-custom-purple"
              style={{ borderRadius: "20px" }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
