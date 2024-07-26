import React, { useEffect, useState } from "react"
import {Button, Card, Col, Form, Input, Label, Row, Container, CardBody,FormFeedback, FormGroup } from 'reactstrap'
import RequiredAsterisk from "../../Common/components/RequiredAsterisk"; 
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { postApiData } from "../../Common/helpers/axiosHelper";
import Select from 'react-select'

const ApplyLeaveModal = props => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const leaveTypeOptions = [
                {value: "casual", label: "Casual leave"}, 
                {value:"Sick", label: "Sick leave"},
                {value :"Vacation", label: "Vacation"}, 
                {value: "Earned", label: " Earned"},
                {value: "LWP", label: "Leave without Pay"},
                {value: "Maternity", label: "Maternity Leave"},
                {value: "Flexible leave", label: "Flexible leave"}
               ];

    const leaveValidation = useFormik({
        enableReinitialize: true,
        initialValues: {
            uID: "",
            leaveType: "",
            leaveStartDate: "",
            leaveEndDate: "",
            reason: "",
        },
        validationSchema: Yup.object({
            uID: Yup.string()
                .required("Please Enter the Emp ID"),
            leaveType: Yup.string()
            .required("Please select the leave type"),
            leaveStartDate: Yup.string()
            .required("Please select the leave start date"),
            leaveEndDate: Yup.string()
            .required("Please select the leave end date"),
            reason: Yup.string()
            .required("Please provide the reason for the leave"),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log("button clicked")
            // setIsLoading(true);
            const combinedValues = { ...values }
            const response = await postApiData(
                "api/Leave/ApplyLeave",
                JSON.stringify(combinedValues)
            );
            if (response.success === true) {
                    toast.success(
                        "Leave Request Submitted",
                        {
                            position: "top-right",
                            autoClose: 3000,
                        })
                                setIsLoading(false);
                }
            else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
                resetForm();
                setIsLoading(false);
            }
        },
    });
    
    useEffect (() =>
    {
     console.log("validation errors" + leaveValidation.errors);
    },[leaveValidation.values])

    function FileUpload() {

        const handleChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
        };
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        leaveValidation.setFieldValue(name, value);
      };

      const handleclick = (event) => {
        console.log("clicked")
      }

return (
    <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Card className="overflow-hidden mt-7 mb-3">
                        <CardBody>                           
                                <div className="modal-header d-flex justify-content-between">
                                    <h1 className="mt-0 mb-3 fw-bold">
                                        Leave Application Form
                                    </h1>                                 
                                </div>
                           
                                <Card className="overflow-hidden">
                                    <div className="form-body">
                                        <Form className="needs-validation pt-4 pb-2 px-3" onSubmit={leaveValidation.handleSubmit}
                                           
                                        >
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label for="empID">EmployeeID<RequiredAsterisk /></Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            name ="uID"
                                                            id="empID"
                                                            placeholder="Enter the EmployeeID"
                                                            onChange={handleInputChange}
                                                            onBlur={leaveValidation.handleBlur}
                                                            // disabled={isLoading}
                                                            value={leaveValidation.values.uID}
                                                            invalid={!!leaveValidation.errors.uID}
                                                        />
                                                        {leaveValidation.touched.uID && leaveValidation.errors.uID ? (
                                                            <FormFeedback type="invalid">
                                                                {leaveValidation.errors.uID}
                                                            </FormFeedback>
                                                        ) : null}
                                                        
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label for="leaveType">Leave Type<RequiredAsterisk /></Label>
                                                        <Select
                                                    
                                                            name="leaveType"
                                                            id="leaveType"
                                                            
                                                            onChange={(selectedOption) => {
                                                                    leaveValidation.setFieldValue('leaveType', selectedOption)
                                                                    }}  
                                                            onBlur={() => leaveValidation.setFieldTouched('leaveType', true)}
                                                            // disabled={isLoading}
                                                            value={leaveValidation.values.leaveType}
                                                            invalid={!!leaveValidation.errors.leaveType}
                                                            options={leaveTypeOptions} 
                                                        />
                                                        {leaveValidation.touched.leaveType && leaveValidation.errors.leaveType ? (
                                                            <FormFeedback type="invalid">
                                                                {leaveValidation.errors.leaveType}
                                                            </FormFeedback>
                                                        ) : null}
                                                        
                                                            
                                                        
                                                    </div>
                                                </Col>
                                            </Row>
                                      
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label for="startDate" className="text-left">Leave start Date<RequiredAsterisk /></Label>
                                                        <Input
                                                            type="date"
                                                            name="leaveStartDate"
                                                            id="startDate"
                                                            onBlur={leaveValidation.handleBlur}
                                                            // disabled={isLoading}
                                                            onChange={handleInputChange}
                                                            value={leaveValidation.values.leaveStartDate || ""}
                                                            invalid={!!leaveValidation.errors.leaveStartDate}
                                                        />
                                                        {leaveValidation.touched.leaveStartDate && leaveValidation.errors.leaveStartDate ? (
                                                            <FormFeedback type="invalid">
                                                                {leaveValidation.errors.leaveStartDate}
                                                            </FormFeedback>
                                                        ) : null}
                                                        
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label for="endDate" className="text-left">Leave End Date<RequiredAsterisk /></Label>
                                                        <Input
                                                            type="date"
                                                            name="leaveEndDate"
                                                            id="endDate"
                                                            onBlur={leaveValidation.handleBlur}
                                                            // disabled={isLoading}
                                                            value={leaveValidation.values.leaveEndDate || ""}
                                                            onChange={handleInputChange}
                                                            invalid={!!leaveValidation.errors.leaveEndDate}
                                                        />
                                                        {leaveValidation.touched.leaveEndDate && leaveValidation.errors.leaveEndDate ? (
                                                            <FormFeedback type="invalid">
                                                                {leaveValidation.errors.leaveEndDate}
                                                            </FormFeedback>
                                                        ) : null}
                                                       
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label for="reason">Reason for Leave<RequiredAsterisk /></Label>
                                                        <Input
                                                            type="textarea"
                                                            name="reason"
                                                            id="reason"
                                                            rows={5}
                                                            placeholder="Provide the reason for leave"
                                                            onBlur={leaveValidation.handleBlur}
                                                            onChange={handleInputChange}
                                                            // disabled={isLoading}
                                                            value={leaveValidation.values.reason || ""}
                                                            invalid={!!leaveValidation.errors.reason}
                                                        />
                                                        {leaveValidation.touched.reason && leaveValidation.errors.reason ? (
                                                            <FormFeedback type="invalid">
                                                                {leaveValidation.errors.reason}
                                                            </FormFeedback>
                                                        ) : null}
                                                        
                                                    </div>
                                                </Col>
                                                <Col lg="6">
                                                    <div className="mb-3">
                                                        <Label for="leaveDocs">Upload Supporting Docs</Label>
                                                        <Input type="file" onChange={FileUpload} className='mb-3' 
                                                        />
                                                        {selectedFile && (
                                                            <p>Selected File: {selectedFile.name}</p>
                                                        )}
                                                    </div>
                                                </Col>
                                               
                                            </Row>
                                            

                                        </Form>
                                        <Row>
                                            <div className="mt-4 text-center">
                                                    <Button className="btn btn-primary btn-block" 
                                                    // type="submit"

                                                    onClick= {() => 
                                                        {debugger
                                                        leaveValidation.handleSubmit()}}
                                                    >
                                                        Apply Leave
                                                    </Button>
                                                </div>
                                        </Row>
                                    </div>
                                </Card>
                            </CardBody>
                        </Card>
                </Container>
            </div>
           </React.Fragment>
)
};

    

export default ApplyLeaveModal