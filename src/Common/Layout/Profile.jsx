// src/components/Profile.js
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
  Row,
  Col,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Profile = ({ isOpen, toggle }) => {
  const validationSchema = Yup.object({
    address: Yup.string().required("Please Enter Address"),
    personalEmail: Yup.string()
      .email("Invalid Email Address")
      .required("Please Enter Personal Email"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
      .required("Please Enter Mobile Number"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Please Enter Password"),
  });

  const initialValues = {
    empID: "12345",
    doj: "01/01/2020",
    email: "employee@example.com",
    address: "",
    personalEmail: "",
    mobileNumber: "",
    password: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Profile updated:", values);
    setSubmitting(false);
    toggle();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>My Account</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="empID">Employee ID</Label>
                <Input
                  type="text"
                  id="empID"
                  value={formik.values.empID}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="doj">Date of Joining</Label>
                <Input
                  type="text"
                  id="doj"
                  value={formik.values.doj}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={formik.values.email}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  {...formik.getFieldProps("address")}
                  invalid={formik.touched.address && formik.errors.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <FormFeedback>{formik.errors.address}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="personalEmail">Personal Email</Label>
                <Input
                  type="email"
                  id="personalEmail"
                  {...formik.getFieldProps("personalEmail")}
                  invalid={
                    formik.touched.personalEmail && formik.errors.personalEmail
                  }
                />
                {formik.touched.personalEmail &&
                  formik.errors.personalEmail && (
                    <FormFeedback>{formik.errors.personalEmail}</FormFeedback>
                  )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="mobileNumber">Mobile Number</Label>
                <Input
                  type="text"
                  id="mobileNumber"
                  {...formik.getFieldProps("mobileNumber")}
                  invalid={
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                  }
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                  <FormFeedback>{formik.errors.mobileNumber}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
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
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          Save Changes
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Profile;
