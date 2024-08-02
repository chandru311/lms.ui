import React, { useEffect ,useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Col,
  FormFeedback,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  postApiData,
  putApiData,
} from "../../Common/helpers/axiosHelper";
import { toast } from "react-toastify";
import RequiredAsterisk from '../../Common/components/RequiredAsterisk';
import ReactSelect from "react-select";

const LeaveTypeForm = (props) => {
  const { toggle, leaveState, getAllLeaveTypes } = props;

  const isViewMode = leaveState?.modalMode === "view";
  const isEditMode = leaveState?.modalMode === "edit";
  const isAddMode = leaveState?.modalMode === "add";
  const [isChecked, setIsChecked] = useState(false);
  const [isAdvancedLeave, setIsAdvancedLeave] = useState(false);
  const leaveoption = [
    { label: "Paid", value: 1 },
    { label: "Unpaid", value: 2 },

  ];

  //const validationSchema =

  const formik = useFormik({
    initialValues: {
      name: leaveState?.leaveTypeDetail?.name || "",
      fromDate: "",
      toDate: "",
      noOfDays: leaveState?.leaveTypeDetail?.noOfDays || "",
    },
    validationSchema: Yup.object({
        name: Yup.string().required("Leave type is required"),
        fromDate: Yup.date()
            .required('From date is required')
            .min(new Date(), 'From date cannot be in the past'),
          toDate: Yup.date()
            .required('To date is required')
            .min(Yup.ref('fromDate'), 'To date must be after from date'),
        noOfDays: Yup.number()
          .required("Number of days is required")
          .positive("Must be a positive number")
          .integer("Must be an integer"),
         advancedLeave: Yup.boolean(), // If mandatory
        carryForward:Yup.boolean(), // If mandatory
        //   category:Yup.object().shape({
        //     label: Yup.string().required("Please Select a leave category"),
        //     value: Yup.string().required("Please Select a leave category"),
        //   }),
      }),
    onSubmit: async (values) => {
        console.log("enetrd")
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
  const handleCarryForwardChange = () => {
    setIsChecked(!isChecked);
  };
  const handleAdvanceLeaveChange = () => {
    setIsAdvancedLeave(!isAdvancedLeave);
  };
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
                  <Label for="fromDate" className="text-left"> From Date</Label><RequiredAsterisk />
                  <Input
                    type="date"
                    name="fromDate"
                    id="fromDate"
                    onChange={formik.handleChange}
                    value={formik.values.fromDate || ""}
                    disabled={isViewMode}
                    aria-disabled={isViewMode}
                  
                    invalid={
                        formik.touched.fromDate && formik.errors.fromDate ? true : false
                    } />
                {formik.touched.fromDate && formik.errors.fromDate ? (
                    <FormFeedback type="invalid">{formik.errors.fromDate}</FormFeedback>
                ) : null}
                  
                </FormGroup>
                <FormGroup>
                  <Label for="toDate"> End Date</Label><RequiredAsterisk />
                  <Input
                    type="date"
                    name="toDate"
                    id="toDate"
                    onChange={formik.handleChange}
                    value={formik.values.toDate || ""}
                    disabled={isViewMode}
                    aria-disabled={isViewMode}
                  
                    invalid={
                        formik.touched.toDate && formik.errors.toDate ? true : false
                    } />
                {formik.touched.toDate && formik.errors.toDate ? (
                    <FormFeedback type="invalid">{formik.errors.toDate}</FormFeedback>
                ) : null}
                  
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
          <FormGroup>
                  <Label >Carry forward ? </Label>
                  {/* <RequiredAsterisk /> */}
                  <span style={{ marginLeft: '10px' }}>
                    <Input
                      name="carryForward"
                      type="checkbox"
                      checked={isChecked} 
                      onChange={handleCarryForwardChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.carryForward &&
                        formik.errors.carryForward
                        ? true
                        : false}
                />{" "}
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label >Use for Advance Leave? </Label>
                  {/* <RequiredAsterisk /> */}
                  <span style={{ marginLeft: '10px' }}>
                    <Input
                      type="checkbox" name="advancedLeave" checked={isAdvancedLeave} onChange={handleAdvanceLeaveChange}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.carryForward &&
                        formik.errors.carryForward
                        ? true
                        : false}
                />{" "}
                  </span>
                </FormGroup>
                {/* <FormGroup >
                  <Label for="category">Leave Category</Label>

                  <ReactSelect
                    name="category"
                  //
                    placeholder="Enter the Department"
                    id="category"
                    options={leaveoption}
                 

                  />
                  
                </FormGroup> */}
          <FormGroup>{renderSubmitButton()}</FormGroup>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default LeaveTypeForm;
