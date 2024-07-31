import React, { useState, useMemo, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import { postApiData } from "../../Common/helpers/axiosHelper";

const AddDepartment = ({ isOpen, toggle }) => {
  const [departmentData, setDepartmentData] = useState([]);
  const newAddDeptValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      departmentName: departmentData?.departmentname || "",
      departmentDescription: departmentData?.departmentDescription || "",
      managerName: departmentData?.managerName || "",
    },

    validationSchema: Yup.object({
      departmentName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Department Name should contain only letters")
        .required("Please Enter the Department Name"),

      departmentDescription: Yup.string()
        .matches(
          /^[A-Za-z\s]+$/,
          "Department Description should contain only letters"
        )
        .required("Please Enter the Department Description"),

      // managerName: Yup.string()
      //   .matches(/^[A-Za-z\s]+$/, "Manager Name should contain only letters")
      //   .required("Please Enter the Manager Name"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await postApiData(
          "api/Departments/CreateDepartment",
          JSON.stringify(values)
        );
        if (response.success === true) {
          toast.success(" Department Added Successfully", {
            position: "top-right",
            autoClose: 3000,
          });
          toggle();
          resetForm();
          // if (employeeDetailsResponse.success && addressResponse.success) {
          //   resetForm();
          // getCustomer();
        } else {
          // toast.error(`${response.message}`,{
          toast.error("${response.message}", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error during API call:", error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
  });
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>Add Department</ModalHeader>
      <ModalBody>
        <Form
          className="needs-validation"
          onSubmit={(e) => {
            e.preventDefault();
            newAddDeptValidation.handleSubmit(e);
            return false;
          }}
        >
          <Row>
            <Col md="6">
              <FormGroup className="mb-3">
                <Label htmlFor="departmentName">Department Name</Label>
                <RequiredAsterisk />
                <Input
                  name="departmentName"
                  placeholder="Enter the Department Name"
                  type="text"
                  id="departmentName"
                  value={newAddDeptValidation.values.departmentName}
                  onChange={newAddDeptValidation.handleChange}
                  onBlur={newAddDeptValidation.handleBlur}
                  invalid={!!newAddDeptValidation.errors.departmentName}
                />

                {newAddDeptValidation.errors.departmentName && (
                  <FormFeedback type="invalid">
                    {newAddDeptValidation.errors.departmentName}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="mb-3">
                <Label htmlFor="departmentDescription">
                  Department Description
                </Label>
                <RequiredAsterisk />
                <Input
                  name="departmentDescription"
                  placeholder="Enter the Department Description"
                  type="text"
                  id="departmentDescription"
                  value={newAddDeptValidation.values.departmentDescription}
                  onChange={newAddDeptValidation.handleChange}
                  onBlur={newAddDeptValidation.handleBlur}
                  invalid={!!newAddDeptValidation.errors.departmentDescription}
                />

                {newAddDeptValidation.errors.departmentDescription && (
                  <FormFeedback type="invalid">
                    {newAddDeptValidation.errors.departmentDescription}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup className="mb-3">
                <Label htmlFor="managerName">Manager Name</Label>
                <RequiredAsterisk />
                <Input
                  name="managerName"
                  placeholder="Enter the Manager Name"
                  type="text"
                  id="managerName"
                  value={newAddDeptValidation.values.managerName}
                  onChange={newAddDeptValidation.handleChange}
                  onBlur={newAddDeptValidation.handleBlur}
                  invalid={!!newAddDeptValidation.errors.managerName}
                />

                {newAddDeptValidation.errors.managerName && (
                  <FormFeedback type="invalid">
                    {newAddDeptValidation.errors.managerName}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={newAddDeptValidation.handleSubmit}
          disabled={newAddDeptValidation.isSubmitting}
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
