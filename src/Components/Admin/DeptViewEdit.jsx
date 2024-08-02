import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  FormFeedback,
} from "reactstrap";
import { putApiData } from "../../Common/helpers/axiosHelper";
import { ToastContainer, toast } from "react-toastify";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import ReactSelect from "react-select";
// import SelectStyle from "../../../../common/data/SelectStyle";
import { useFormik } from "formik";
import * as Yup from "yup";
const DeptViewEdit = (props) => {
  const {
    isOpen,
    toggle,
    editMode,
    departmentData,
    departmentId,
    getDepartmentDetails,
  } = props;
  const [error, setError] = useState(null);

  const deptValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      departmentName: departmentData?.departmentName || "",
      departmentDescription: departmentData?.departmentDescription || "",
      managerName: departmentData?.managerName || "",
      departmentId: departmentData?.departmentId || "",
    },

    validationSchema: Yup.object({
      departmentName: Yup.string()
        .matches(/^[A-Za-z]+$/, "DepartmentName should contain only letters")
        .required("Please Enter DepartmentName"),
      departmentDescription: Yup.string()
        .matches(
          /^[A-Za-z]+$/,
          "DepartmentDescription should contain only letters"
        )
        .required("Please Enter DepartmentDescription"),

      // departmentDescription: Yup.string()
      //   .matches(
      //     /^[A-Za-z]+$/,
      //     "DepartmentDescription should contain only letters"
      //   )
      // .required("Please Enter DepartmentDescription"),
      //   managerName: Yup.string()
      //     .matches(/^[A-Za-z]+$/, "ManagerName should contain only letters")
      //     .required("Please Enter ManagerName"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const hasChanges = Object.keys(values).some(
        (key) => values[key] !== deptValidation.initialValues[key]
      );
      if (hasChanges) {
        try {
          const response = await putApiData(
            `api/Departments/UpdateDepartment/${departmentId}`,

            JSON.stringify(values)
          );
          // console.log("values" + values);
          console.log("updated data" + { response });

          if (response.success === true) {
            toast.success("Department Updated Successfully", {
              position: "top-right",
              autoClose: 3000,
              onClose: () => {
                getDepartmentDetails();
              },
            });
            // toggle();
          } else {
            toast.error(`${response.message}` || "Error, Contact Admin", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } catch (error) {
          setError(error);
          toast.error(`${error.message || "An unexpected error occurred"}`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else if (!hasChanges) {
        toast.error("No Changes to Update", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    },
  });
  // const hasChanges = [];
  // const [values, setValues] = useState({});
  // useEffect(() => {
  //   console.log("values before API Update call:", values);
  // }, [hasChanges]);
  // useEffect(() => {
  //   console.log(addressValidation.values);
  //   console.log(addressValidation.errors);
  // }, [addressValidation.values, addressValidation.errors]);

  // useEffect(() => {
  //   if (error) {
  //     console.error("Error during update:", error);
  //   }
  // }, [error]);

  useEffect(() => {
    console.log("validation values" + JSON.stringify(deptValidation.values));
    console.log("Validation errors" + JSON.stringify(deptValidation.errors));
  }, [deptValidation.values]);
  // useEffect(() => {
  //   const response = await putApiData(
  //     `api/Departments/UpdateDepartment/${departmentId}`,

  //     JSON.stringify(values)
  // },[]);

  return (
    <>
      <ToastContainer closeButton={false} limit={1} />
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add Department</ModalHeader>
        <ModalBody>
          <Form
            className="needs-validation"
            onSubmit={(e) => {
              e.preventDefault();
              deptValidation.handleSubmit(e);
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
                    disabled={editMode}
                    value={deptValidation.values.departmentName}
                    onChange={deptValidation.handleChange}
                    onBlur={deptValidation.handleBlur}
                    invalid={
                      deptValidation.touched.departmentName &&
                      deptValidation.errors.departmentName
                        ? true
                        : false
                    }
                  />
                  {deptValidation.touched.departmentName &&
                  deptValidation.errors.departmentName ? (
                    <FormFeedback type="invalid">
                      {deptValidation.errors.departmentName}
                    </FormFeedback>
                  ) : null}
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
                    disabled={editMode}
                    value={deptValidation.values.departmentDescription}
                    onChange={deptValidation.handleChange}
                    onBlur={deptValidation.handleBlur}
                    invalid={
                      deptValidation.touched.departmentDescription &&
                      deptValidation.errors.departmentDescription
                        ? true
                        : false
                    }
                  />
                  {deptValidation.touched.departmentName &&
                  deptValidation.errors.departmentDescription ? (
                    <FormFeedback type="invalid">
                      {deptValidation.errors.departmentDescription}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label htmlFor="managerName">Manager Name</Label>
                  <Input
                    name="managerName"
                    placeholder="Enter ManagerName"
                    id="managerName"
                    value={deptValidation.values.managerName}
                    onChange={deptValidation.handleChange}
                    disabled={editMode}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          {editMode ? null : (
            <Button
              type="submit"
              color="primary"
              onClick={deptValidation.handleSubmit}
              disabled={deptValidation.isSubmitting}
            >
              Update
            </Button>
          )}
        </ModalFooter>
      </Modal>
      {/* {!editMode && ( */}
    </>
  );
};

export default DeptViewEdit;
