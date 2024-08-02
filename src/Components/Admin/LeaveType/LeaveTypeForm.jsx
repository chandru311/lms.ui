import React, { useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  postApiData,
  putApiData,
} from "../../../Common/helpers/axiosHelper.js";
import { toast } from "react-toastify";

const LeaveTypeForm = (props) => {
  const { toggle, leaveState, getAllLeaveTypes } = props;

  const isViewMode = leaveState?.modalMode === "view";
  const isEditMode = leaveState?.modalMode === "edit";
  const isAddMode = leaveState?.modalMode === "add";

  const validationSchema = Yup.object({
    name: Yup.string().required("Leave type is required"),
    noOfDays: Yup.number()
      .required("Number of days is required")
      .positive("Must be a positive number")
      .integer("Must be an integer"),
  });

  const formik = useFormik({
    initialValues: {
      name: leaveState?.leaveTypeDetail?.name || "",
      noOfDays: leaveState?.leaveTypeDetail?.noOfDays || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          await putApiData(
            `api/LeaveType/${leaveState?.leaveTypeDetail?.leaveTypeId}`,
            values
          );

          toast.success("Leave type updated successfully", {
            position: "top-right",
            autoClose: 2000,
          });
        } else if (isAddMode) {
          await postApiData("api/LeaveType", values);
          toast.success("Leave type added successfully", {
            position: "top-right",
            autoClose: 2000,
          });
        }
        getAllLeaveTypes();
        toggle();
      } catch (error) {
        toast.error("Error saving leave type", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (leaveState) {
      formik.setValues({
        name: leaveState?.leaveTypeDetail?.name,
        noOfDays: leaveState?.leaveTypeDetail?.noOfDays,
      });
    } else {
      formik.resetForm();
    }
  }, [leaveState]);

  const renderSubmitButton = () => {
    if (isViewMode) {
      return null;
    }
    return (
      <Button
        type="submit"
        style={{
          backgroundColor: "#5e2ced",
          border: "none",
          color: "white",
          float: "right",
        }}
      >
        {isEditMode ? "Submit" : "Submit"}
      </Button>
    );
  };
  return (
    <Modal isOpen={leaveState?.isModalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isViewMode
          ? "View Leave Type"
          : isEditMode
          ? "Edit Leave Type"
          : "Add Leave Type"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label for="name">Leave Type</Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              disabled={isViewMode}
              aria-disabled={isViewMode}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="noOfDays">No of Days</Label>
            <Input
              id="noOfDays"
              name="noOfDays"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.noOfDays}
              disabled={isViewMode}
              aria-disabled={isViewMode}
            />
            {formik.errors.noOfDays && formik.touched.noOfDays && (
              <div className="text-danger">{formik.errors.noOfDays}</div>
            )}
          </FormGroup>
          <FormGroup>{renderSubmitButton()}</FormGroup>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default LeaveTypeForm;
