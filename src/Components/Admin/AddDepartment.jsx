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

const AddDepartment = ({ isOpen, toggle }) => {
  const validationSchema = Yup.object({
    managerId: Yup.string().required("Please Enter Manager ID"),
    departmentName: Yup.string().required("Please Enter Department Name"),
  });

  const initialValues = {
    managerId: "",
    departmentName: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Department added:", values);
    setSubmitting(false);
    resetForm();
    toggle();
  };

  // Use Formik for form management
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Add Department</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="managerId">Manager ID</Label>
            <Input
              type="text"
              id="managerId"
              {...formik.getFieldProps("managerId")}
              invalid={formik.touched.managerId && formik.errors.managerId}
            />
            {formik.touched.managerId && formik.errors.managerId && (
              <FormFeedback>{formik.errors.managerId}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="departmentName">Department Name</Label>
            <Input
              type="text"
              id="departmentName"
              {...formik.getFieldProps("departmentName")}
              invalid={
                formik.touched.departmentName && formik.errors.departmentName
              }
            />
            {formik.touched.departmentName && formik.errors.departmentName && (
              <FormFeedback>{formik.errors.departmentName}</FormFeedback>
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
          Add Department
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddDepartment;
