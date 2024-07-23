import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddManager = ({ isOpen, toggle }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Please enter only letters")
      .required("Please Enter First Name"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Please enter only letters")
      .required("Please Enter Last Name"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Please Enter Email"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
      .required("Please Enter Mobile Number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Please Enter Password"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Manager added:", values);
    setSubmitting(false);
    resetForm();
    toggle();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Add Manager</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              {...formik.getFieldProps("firstName")}
              invalid={formik.touched.firstName && formik.errors.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <FormFeedback>{formik.errors.firstName}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              {...formik.getFieldProps("lastName")}
              invalid={formik.touched.lastName && formik.errors.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <FormFeedback>{formik.errors.lastName}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
              invalid={formik.touched.email && formik.errors.email}
            />
            {formik.touched.email && formik.errors.email && (
              <FormFeedback>{formik.errors.email}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="mobile">Mobile</Label>
            <Input
              type="text"
              id="mobile"
              {...formik.getFieldProps("mobile")}
              invalid={formik.touched.mobile && formik.errors.mobile}
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <FormFeedback>{formik.errors.mobile}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
              invalid={formik.touched.password && formik.errors.password}
            />
            {formik.touched.password && formik.errors.password && (
              <FormFeedback>{formik.errors.password}</FormFeedback>
            )}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddManager;
