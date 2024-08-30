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
import { differenceInCalendarDays } from 'date-fns';
import ReactSelect from "react-select";

const LeaveTypeForm = (props) => {
  const { toggle, leaveState, getAllLeaveTypes } = props;

  const isViewMode = leaveState?.modalMode === "view";
  const isEditMode = leaveState?.modalMode === "edit";
  const isAddMode = leaveState?.modalMode === "add";
  const [isChecked, setIsChecked] = useState(false);
  const [isAdvancedLeave, setIsAdvancedLeave] = useState(false);
  // const [data, setData] = useState({
  //   isCarry: !!leaveState?.leaveTypeDetail?.isCarry // Replace with your actual data
  // });

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
      noOfDays: "",
      
      isCarry:0,
      isAdvance:0,
     

    },
    validationSchema: Yup.object({
        name: Yup.string().required("Leave type is required"),
        fromDate: Yup.date()
            .required('From date is required'),
          //  .min(new Date(), 'From date cannot be in the past'),
          toDate: Yup.date()
            .required('To date is required')
            .min(Yup.ref('fromDate'), 'To date must be after from date'),
        noOfDays: Yup.number()
          .required("Number of days is required")
          .positive("Must be a positive number")
          .integer("Must be an integer"),
          isCarry:Yup.number(), 
          isAdvance: Yup.number(), // If mandatory
       // If mandatory
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
        fromDate: leaveState?.leaveTypeDetail?.fromDate,
        toDate: leaveState?.leaveTypeDetail?.toDate,
       isCarry:leaveState?.leaveTypeDetail?.isCarry,
       isAdvance:leaveState?.leaveTypeDetail?.isAdvance,
      


      });
    } else {
      formik.resetForm();
    }
  }, [leaveState]);
  // useEffect(() => {
  //   calculateNoOfDays();
  // }, [formik.values.fromDate, formik.values.toDate]);


  // const calculateNoOfDays = () => {
  //   const { fromDate, toDate } = formik.values;
  //   if (fromDate && toDate) {
  //     const diffInDays = differenceInCalendarDays(new Date(toDate), new Date(fromDate)) + 1; // Add 1 to include both start and end dates
  //     formik.setFieldValue('noOfDays', diffInDays);
  //   } else {
  //     formik.setFieldValue('noOfDays', '');
  //   }
  // };
  const handleCarryForwardChange = (e) => {
    e.stopPropagation();
    formik.setFieldValue('isCarry', e.target.checked ? 1 : 0);
    
  };
  const handleAdvanceLeaveChange = (e) => {
    e.stopPropagation();
    formik.setFieldValue('isAdvance', e.target.checked ? 1 : 0);
  
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
              value={formik.values.name || ""} 
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
                      name="isCarry"
                      type="checkbox"
                      checked={formik.values.isCarry === 1}
                    //  checked={isChecked} 
                    //  value={formik.values.isCarry}
                    //   onChange={(isChecked) => {
                    //     // Update value to 1 when checked
                    //     formik.handleChange(isChecked);
                    //     formik.setFieldValue('isCarry', 1);
                    //   }}
                    //value={formik.values.isCarry}
                    onChange={(e) => {
                        handleCarryForwardChange(e)
                    }}
                   // checked={data.isCarry}
                  
                   disabled={isViewMode}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.isCarry &&
                        formik.errors.isCarry
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
                      type="checkbox" name="isAdvance" 
                      onChange={(e) => {
                        handleAdvanceLeaveChange(e)
                    }}
                    checked={formik.values.isAdvance === 1}
                    disabled={isViewMode}
                  //    checked={isAdvancedLeave}  
                  //    value={formik.values.isAdvance}
                    //   onChange={(isAdvancedLeave) => {
                    //     // Update value to 1 when checked
                    //     formik.handleChange(isAdvancedLeave);
                    //     formik.setFieldValue('isAdvance', 1);
                    //   }}
                      onBlur={formik.handleBlur}
                      invalid={formik.touched.isAdvance &&
                        formik.errors.isAdvance
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
