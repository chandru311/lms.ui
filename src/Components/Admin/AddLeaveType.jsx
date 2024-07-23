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

const AddLeaveType = ({ isOpen, toggle }) => {
  const validationSchema = Yup.object({
    leaveName: Yup.string().required("Leave Type is required"),
    noofdays: Yup.number().required("No of Days is required"),
  });

  const initialValues = {
    leaveName: "",
    noofdays: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Leave is added:", values);

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
      <ModalHeader toggle={toggle}>Add Leave Type</ModalHeader>
      <ModalBody>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="leaveName">Leave Name</Label>
            <Input
              type="text"
              id="leaveName"
              {...formik.getFieldProps("leaveName")}
              invalid={formik.touched.leaveName && formik.errors.leaveName}
            />
            {formik.touched.leaveName && formik.errors.leaveName && (
              <FormFeedback>{formik.errors.leaveName}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="noofdays">No of Days</Label>
            <Input
              type="number"
              id="noofdays"
              {...formik.getFieldProps("noofdays")}
              invalid={formik.touched.noofdays && formik.errors.noofdays}
            />
            {formik.touched.noofdays && formik.errors.noofdays && (
              <FormFeedback>{formik.errors.noofdays}</FormFeedback>
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

export default AddLeaveType;
