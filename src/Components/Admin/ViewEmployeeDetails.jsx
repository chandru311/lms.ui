import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Container,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  NavItem,
  NavLink,
  Nav,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
// import { postApiData } from "../../../../helpers/axiosHelper";
import { ToastContainer, toast } from "react-toastify";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import ReactSelect from "react-select";

// import RequiredAsterisk from "../../components/common/RequiredAsterisk";
// import reactSelect from "react-select";
// import SelectStyle from '../../../../common/data/SelectStyle'
// import { roleList } from "../../../../common/data/roles";

const ViewEmployeeDetails = ({ data, mode, viewStatus, isOpen, toggle }) => {
  useEffect(() => {
    // Check if data is received and populate form fields
    if (data) {
      newEmpRegValidation.setValues(data);
      //console.logout("details",{newEmpRegValidation});
    }
  }, [data]);
  // console.logout("details",{newEmpRegValidation});
  //   const { isOpen, toggle, branch, getAllSystemUser } = props;
  //const { isOpen, toggle } = props;

  //   const newEmpRegValidation = useFormik({
  //     enableReinitialize: true,

  //     initialValues: {
  //         empId: '',
  //       firstName: '',
  //       lastName: '',
  //       department: '',
  //       emailId: '',
  //       mobileNo: '',
  //       country: '',
  //       state: '',
  //       city: '',
  //       dob: '',
  //       dateOfJoining:'',
  //       address: '',
  //       password: '',
  //       confirmpassword: '',
  //     },

  //     validationSchema: Yup.object({
  //         empId:  Yup.string()
  //         .required("Please Enter the EmployeeId").matches(/^[0-9]*$/, 'Please enter only numbers')
  //         // .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits")
  //         ,
  //       firstName: Yup.string().matches(/^[A-Za-z\s]+$/, "First Name should contain only letters").required("Please Enter the First name"),
  //           lastName: Yup.string().matches(/^[A-Za-z\s]+$/, "Last Name should contain only letters").required("Please Enter the Last name"),
  //           department: Yup.string().matches(/^[A-Za-z\s]+$/, "department Name should contain only letters").required("Please Enter the department")
  //         //   .required("Please select the department")
  //           ,
  //       emailId: Yup.string().email('Enter a Valid Email ID').required("Please Enter the Email"),
  //       mobileNo: Yup.string()
  //         .required("Please Enter Mobile Number").matches(/^[0-9]*$/, 'Please enter only numbers')
  //         .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits"),
  //         country: Yup.string().matches(/^[A-Za-z\s]+$/, "Country Name should contain only letters").required("Please Enter the Country name"),
  //         state: Yup.string().matches(/^[A-Za-z\s]+$/, " State Name should contain only letters").required("Please Enter the State name"),
  //         city: Yup.string().matches(/^[A-Za-z\s]+$/, "City Name should contain only letters").required("Please Enter City name"),
  //           // Add validation for dateOfBirth
  //   dob: Yup.date()
  //   .required('Date of Birth is required')
  //   .max(new Date(), 'You cannot enter a future date').required("Please select the DOB"),

  // // Add validation for dateOfJoining (similar to dateOfBirth)
  // dateOfJoining: Yup.date()
  //   .required('Date of Joining is required')
  //   .max(new Date(), 'You cannot enter a future date').required("Please select the Date of Joining"),
  //   address: Yup.string()
  //   .required('Address is required'),
  //     //     dob: '',
  //     //   dateOfJoining:'',
  //     //   Address: '',

  //     //   branchId: Yup.object().shape({
  //     //     label: Yup.string().required("Please Select a Branch"),
  //     //     value: Yup.string().required("Please Select a Branch")
  //     //   }),
  //     //   role: Yup.object().shape({
  //     //     label: Yup.string().required("Please Select a Role"),
  //     //     value: Yup.string().required("Please Select a Role")

  //       password: Yup.string()
  //       .required("Please Enter Password")
  //       .matches(
  //         /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/,
  //         "Password must be at least 8 characters and must contain at least one digit, one uppercase letter, and one special character"
  //       ),
  //       confirmpassword: Yup.string()
  //         .required("Please Enter Password to Confirm")
  //         .oneOf([Yup.ref("password"), null], "Passwords must match")
  //         .required("Confirm password is required"),
  //       }),
  //     })

  // //     onSubmit: async(values, {resetForm}) => {
  // //       const branchValue = values.branchId && values.branchId.value
  // //       const roleValue = values.role && values.role.value
  // //       const combinedValues = {...values, email:values.userName,branchId: branchValue , role: roleValue}
  // //       const response = await postApiData("api/User/CreateSystemUser",JSON.stringify(combinedValues));
  // //       if(response.success === true){
  // //         toast.success("System User Created Successfully",{
  // //           position : "top-right",
  // //           autoClose: 3000,
  // //         })
  // //         toggle();
  // //         resetForm();
  // //         getAllSystemUser()
  // //       } else {
  // //         toast.error(`${response.message}`,{
  // //           position : "top-right",
  // //           autoClose: 3000
  // //         })
  // //       }
  // //     }
  // //   });

  //   return (
  //     <React.Fragment>
  //     <Modal
  //       isOpen={isOpen}
  //       // role="dialog"
  //       autoFocus={true}
  //       centered={true}
  //       className="exampleModal"
  //       tabIndex="-1"
  //       toggle={toggle}
  //       onClosed={() => {
  //         newEmpRegValidation.resetForm();
  //         // addNewSystemUserValidation.resetForm();
  //       }}
  //     >
  //       <div className="modal-content">
  //         <ModalHeader toggle={()=>{
  //             toggle()
  //             newEmpRegValidation.resetForm()
  //             // addNewSystemUserValidation.resetForm()
  //           }}
  //           >
  //             Employee Registration
  //             {/* Add System User */}
  //             </ModalHeader>
  //         <ModalBody>
  //           <Card>
  //             <CardBody>
  //               <Form
  //                 className="needs-validation"
  //                 onSubmit={(e) => {
  //                   e.preventDefault();

  //                   newEmpRegValidation.handleSubmit()
  //                 //   addNewSystemUserValidation.handleSubmit()
  //                   return false;
  //                 }}
  //               >
  //                 <Row>
  //                 <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="empId">Employee Id</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="empId"
  //                         placeholder="Enter the EmpID"
  //                         type="number"
  //                         id="empId"

  //                         // // value={addNewSystemUserValidation.values.mobile}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // // value={newEmpRegValidation.values.mobile}
  //                         // // onChange={newEmpRegValidation.handleChange}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.empId && newEmpRegValidation.errors.empId ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ? (
  //                         <FormFeedback type="invalid">{addNewSystemUserValidation.errors.mobile}</FormFeedback>
  //                       ): null} */}
  //                        {/* {newEmpRegValidation.touched.empId && newEmpRegValidation.errors.empId ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.empId}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="firstName">First name</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="firstName"
  //                         placeholder="Enter the First name"
  //                         type="text"
  //                         id="firstName"
  //                         value={newEmpRegValidation.values.name}
  //                         disabled={viewStatus}
  //                         // // value={addNewSystemUserValidation.values.firstName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         //  onBlur={ newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.firstName && addNewSystemUserValidation.errors.firstName ?
  //                         // //   true : false
  //                         // // }
  //                         //  invalid={
  //                         //   newEmpRegValidation.touched.firstName && newEmpRegValidation.errors.firstName ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {/* {addNewSystemUserValidation.touched.firstName && addNewSystemUserValidation.errors.firstName ? (
  //                         <FormFeedback type="invalid">{addNewSystemUserValidation.errors.firstName}</FormFeedback>
  //                       ): null} */}
  //                        {/* { newEmpRegValidation.touched.firstName && newEmpRegValidation.errors.firstName ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.firstName}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>

  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="lastName">Last name</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="lastName"
  //                         placeholder="Enter Last name"
  //                         type="text"
  //                         id="lastName"
  //                         disabled={viewStatus}
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.lastName && newEmpRegValidation.errors.lastName ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.lastName && newEmpRegValidation.errors.lastName ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.lastName}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                    <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="dept">Department</Label>
  //                       <Input
  //                         name="dept"
  //                         placeholder="Enter the dept Name"
  //                         id="dept"
  //                         value={newEmpRegValidation.values.department}
  //                        disabled={viewStatus}
  //                         // value={addNewSystemUserValidation.values.middleName}
  //                         // onChange={addNewSystemUserValidation.handleChange}
  //                       />
  //                     </FormGroup>
  //                   </Col>

  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="email">Email ID</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="emailId"
  //                         placeholder="Enter the EmailID"
  //                         type="emailId"
  //                         id="emailId"
  //                      //   value={newEmpRegValidation.value.email}
  //                         // // value={addNewSystemUserValidation.values.userName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // // value={addNewSystemUserValidation.values.userName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // onBlur={newEmpRegValidation.handleBlur}

  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.userName && addNewSystemUserValidation.errors.userName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.emailId && newEmpRegValidation.errors.emailId?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.emailId && newEmpRegValidation.errors.emailId ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.emailId}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="mobile">Mobile</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="mobile"
  //                         placeholder="Enter the Mobile No"
  //                         type="number"
  //                         id="mobile"
  //                         disabled={viewStatus}
  //                         // // value={addNewSystemUserValidation.values.mobile}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // // value={newEmpRegValidation.values.mobile}
  //                         // // onChange={newEmpRegValidation.handleChange}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.mobileNo && newEmpRegValidation.errors.mobileNo ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {/* {addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ? (
  //                         <FormFeedback type="invalid">{addNewSystemUserValidation.errors.mobile}</FormFeedback>
  //                       ): null} */}
  //                        {/* {newEmpRegValidation.touched.mobileNo && newEmpRegValidation.errors.mobileNo ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.mobileNo}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="country">Country</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="country"
  //                         placeholder="Enter the Country"
  //                         type="text"
  //                         id="country"
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.country && newEmpRegValidation.errors.country ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.country && newEmpRegValidation.errors.country ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.country}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="state">State</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="state"
  //                         placeholder="Enter the State"
  //                         type="text"
  //                         id="state"
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.state && newEmpRegValidation.errors.state ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.state && newEmpRegValidation.errors.state ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.state}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="city"> City</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="city"
  //                         placeholder="Enter the City"
  //                         type="text"
  //                         id="city"
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.city && newEmpRegValidation.errors.city ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.city && newEmpRegValidation.errors.city ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.city}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="dob">Date of Birth</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="dob"
  //                         placeholder="Enter the DOB"
  //                         type="date"
  //                         id="dob"
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.dob && newEmpRegValidation.errors.dob ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.dob && newEmpRegValidation.errors.dob ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.dob}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="dateOfJoining">Enter the Date Of Joining </Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="dateOfJoining"
  //                         placeholder="Enter the Date Of Joining"
  //                         type="date"
  //                         id="dateOfJoining"
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.dateOfJoining && newEmpRegValidation.errors.dateOfJoining ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.dateOfJoining && newEmpRegValidation.errors.dateOfJoining ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.dateOfJoining}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="address">Enter the Address</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="address"
  //                         placeholder="Enter the Address"
  //                         type="text"
  //                         id="address"
  //                         // // value={addNewSystemUserValidation.values.lastName}
  //                         // // onChange={addNewSystemUserValidation.handleChange}
  //                         // // onBlur={addNewSystemUserValidation.handleBlur}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // // invalid={
  //                         // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
  //                         // //   true : false
  //                         // // }
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.address && newEmpRegValidation.errors.address ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.address && newEmpRegValidation.errors.address ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.address}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>

  //                   {/* <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="role">Role</Label>
  //                       <RequiredAsterisk/>
  //                       <ReactSelect
  //                         name="role"
  //                         placeholder="Select Role"
  //                         id="role"
  //                         options={roleList}
  //                         styles={SelectStyle}
  //                         value={addNewSystemUserValidation.values.role}
  //                         onChange={(selectedOption)=> {
  //                           addNewSystemUserValidation.setFieldValue('role', selectedOption)
  //                         }}
  //                         invalid={
  //                           addNewSystemUserValidation.touched.role && addNewSystemUserValidation.errors.role ?
  //                           true : false
  //                         }
  //                       />
  //                       {addNewSystemUserValidation.values.role === null && addNewSystemUserValidation.touched.role && addNewSystemUserValidation.errors.role && (
  //                           <span className="text-danger" style={{ fontSize: "80%" }}>
  //                               Please Select a Role
  //                           </span>
  //                       )}
  //                     </FormGroup>
  //                   </Col> */}
  //                   {/* <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="branchId">Branch</Label>
  //                       <RequiredAsterisk/>
  //                       <ReactSelect
  //                         name="branchId"
  //                         placeholder="Select Branch"
  //                         options={branch}
  //                         styles={SelectStyle}
  //                         id="branchId"
  //                         value={addNewSystemUserValidation.values.branchId}
  //                         onChange={(selectedOption)=> {
  //                           addNewSystemUserValidation.setFieldValue('branchId', selectedOption)
  //                         }}
  //                         invalid={
  //                           addNewSystemUserValidation.touched.branchId && addNewSystemUserValidation.errors.branchId ?
  //                           true : false
  //                         }
  //                       />
  //                       {addNewSystemUserValidation.values.branchId === null && addNewSystemUserValidation.touched.branchId && addNewSystemUserValidation.errors.branchId && (
  //                           <span className="text-danger" style={{ fontSize: "80%" }}>
  //                               Please Select a Branch
  //                           </span>
  //                       )}
  //                     </FormGroup>
  //                   </Col> */}
  //                   <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="password">Password</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="password"
  //                         placeholder="Enter the Password"
  //                         type="password"
  //                         id="password"
  //                         // value={newEmpRegValidation.values.password}
  //                         // onChange={newEmpRegValidation.handleChange}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.password && newEmpRegValidation.errors.password ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.password && newEmpRegValidation.errors.password ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.password}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                    <Col md="6">
  //                     <FormGroup className="mb-3">
  //                       <Label htmlFor="confirmpassword">Confirm Password</Label>
  //                       <RequiredAsterisk/>
  //                       <Input
  //                         name="confirmpassword"
  //                         placeholder="Confirm Password"
  //                         type="password"
  //                         id="confirmpassword"
  //                         // value={newEmpRegValidation.values.confirmpassword}
  //                         // onChange={newEmpRegValidation.handleChange}
  //                         // onBlur={newEmpRegValidation.handleBlur}
  //                         // invalid={
  //                         //   newEmpRegValidation.touched.confirmpassword && newEmpRegValidation.errors.confirmpassword ?
  //                         //   true : false
  //                         // }
  //                       />
  //                       {/* {newEmpRegValidation.touched.confirmpassword && newEmpRegValidation.errors.confirmpassword ? (
  //                         <FormFeedback type="invalid">{newEmpRegValidation.errors.confirmpassword}</FormFeedback>
  //                       ): null} */}
  //                     </FormGroup>
  //                   </Col>
  //                 </Row>

  //               </Form>
  //             </CardBody>
  //           </Card>
  //         </ModalBody>
  //         <ModalFooter>
  //         {/* <Button color="primary" type="submit"
  //         //
  //         > */}
  //           <Button color="primary" type="submit" onClick={newEmpRegValidation.handleSubmit} hidden={viewStatus} disabled={newEmpRegValidation.isSubmitting}>
  //           {/* <Button color="primary" type="submit" onClick={addNewSystemUserValidation.handleSubmit} disabled={addNewSystemUserValidation.isSubmitting}> */}
  //             Submit
  //           </Button>
  //         </ModalFooter>
  //       </div>
  //     </Modal>
  //     <ToastContainer closeButton={false} limit={1} />
  //     </React.Fragment>
  //   );
  const deptoptions = [
    { label: "HR", value: 1 },
    { label: "Finance", value: 2 },
    { label: "IT", value: 3 },
    { label: "Sales", value: 4 },
  ];

  const newEmpRegValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      empId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      department: null,
      email: "",
      mobileNumber: "",
      dob: "",
      dateOfJoining: "",
      password: "",
      confirmPassword: "",

      personalEmail: "",
    },

    validationSchema: Yup.object({
      empId: Yup.string()
        .required("Please Enter the EmployeeId")
        .matches(/^[0-9]*$/, "Please enter only numbers"),
      // .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits")
      firstName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "First Name should contain only letters")
        .required("Please Enter the First name"),
      middleName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Middle Name should contain only letters")
        .required("Please Enter the Middle name"),

      lastName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Last Name should contain only letters")
        .required("Please Enter the Last name"),
      department: Yup.object().shape({
        label: Yup.string().required("Please Select a Department"),
        value: Yup.string().required("Please Select a Department"),
      }),

      email: Yup.string()
        .email("Enter a Valid Email ID")
        .required("Please Enter the Email"),
      password: Yup.string()
        .required("Please Enter Password")
        .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/,
          "Password must be at least 8 characters and must contain at least one digit, one uppercase letter, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Please Enter Password to Confirm")
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),

      personalEmail: Yup.string()
        .email("Enter a Valid Email ID")
        .required("Please Enter the PersonalEmail"),
      // pincode: Yup.string()
      //   .required("Please Enter the Pincode")
      //   .matches(/^[0-9]*$/, "Please enter only numbers"),
      mobileNumber: Yup.string()
        .required("Please Enter Mobile Number")
        .matches(/^[0-9]*$/, "Please enter only numbers")
        .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits"),

      // // Add validation for dateOfBirth
      dob: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "You cannot enter a future date")
        .required("Please select the DOB"),

      // Add validation for dateOfJoining (similar to dateOfBirth)
      dateOfJoining: Yup.date()
        .required("Date of Joining is required")
        .max(new Date(), "You cannot enter a future date")
        .required("Please select the Date of Joining"),
    }),

    // onSubmit: async (values) => {
    //   // onSubmit: async (values, { resetForm }) => {
    //   if (newEmpRegValidation.isValid) {
    //     console.log("save validation true");
    //     //API Call
    //     setActiveTab(2);
    //     console.log("save toggle to emp address");
    //   } else {
    //     newEmpRegValidation.setTouched({
    //       empId: true,
    //       firstName: true,
    //       middleName: true,
    //       lastName: true,
    //       department: true,
    //       emailId: true,
    //       mobileNo: true,
    //       dob: true,
    //       dateOfJoining: true,
    //       password: true,
    //       confirmPassword: true,
    //       personalEmail: true,
    //     });
    //   }
    //   // const branchValue = values.branchId && values.branchId.value;
    //   // const roleValue = values.role && values.role.value;
    //   // const combinedValues = {
    //   //   ...values,
    //   //   email: values.userName,
    //   //   branchId: branchValue,
    //   //   role: roleValue,
    //   // };
    //   // const response = await postApiData(
    //   //   "api/User/CreateSystemUser",
    //   //   JSON.stringify(combinedValues)
    //   // );
    //   // if (response.success === true) {
    //   //   toast.success("EmpDetails Saved Successfully", {
    //   //     position: "top-right",
    //   //     autoClose: 3000,
    //   //   });
    //   //   toggle();
    //   //   resetForm();
    //   //   // getAllSystemUser();
    //   // } else {
    //   //   toast.error(`${response.message}`, {
    //   //     position: "top-right",
    //   //     autoClose: 3000,
    //   //   });
    //   // }
    // },
    // onSubmit: async(values, {resetForm}) => {
    //   const response = await postApiData("api/Employee/CreateEmployee",JSON.stringify(values));
    //   if(response.success === true){
    //     toast.success("Customer Created Successfully",{
    //       position : "top-right",
    //       autoClose: 3000,
    //     })
    //     toggle();
    //     resetForm();
    //    // getCustomer();
    //   } else {
    //     toast.error(`${response.message}`,{
    //       position : "top-right",
    //       autoClose: 3000
    //     })
    //   }
    // }
    // const branchValue = values.branchId && values.branchId.value;
    // const roleValue = values.role && values.role.value;
    // const combinedValues = {
    //   ...values,
    //   email: values.userName,
    //   branchId: branchValue,
    //   role: roleValue,
    // };
    // const response = await postApiData(
    //   "api/User/CreateSystemUser",
    //   JSON.stringify(combinedValues)
    // );
    // if (response.success === true) {
    //   toast.success("EmpDetails Saved Successfully", {
    //     position: "top-right",
    //     autoClose: 3000,
    //   });
    //   toggle();
    //   resetForm();
    //   // getAllSystemUser();
    // } else {
    //   toast.error(`${response.message}`, {
    //     position: "top-right",
    //     autoClose: 3000,
    //   });
    //     // }
    //   },
  });

  const EmpAddressRegValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      country: "",
      state: "",
      city: "",
      street: "",
      houseNo: "",
      pincode: "",
    },

    validationSchema: Yup.object({
      pincode: Yup.string()
        .required("Please Enter the Pincode")
        .matches(/^[0-9]*$/, "Please enter only numbers"),

      houseNo: Yup.string()
        .required("Please Enter the House No")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "House No should contain only Alphanumeric with hypens"
        ),
      street: Yup.string()
        .required("Please Enter the Street Name")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "Street Name should contain only Alphanumeric with hypens"
        ),
      country: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Country Name should contain only letters")
        .required("Please Enter the Country name"),
      state: Yup.string()
        .matches(/^[A-Za-z\s]+$/, " State Name should contain only letters")
        .required("Please Enter the State name"),
      city: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "City Name should contain only letters")
        .required("Please Enter City name"),
      landMark: Yup.string()
        .matches(/^[a-zA-Z0-9\s\-,\.]+$/, "Invalid ")
        .required("Please Enter the landMark")
        .trim(),
      // .matches(
      //   /^[a-zA-Z0-9-]+$/,
      //   "Street Name should contain only Alphanumeric with hypens"
      // ),
    }),
    onSubmit: async (values) => {
      // onSubmit: async (values, { resetForm }) => {
      //API CALL
      // onSubmit: async (values, { resetForm }) => {
      // const branchValue = values.branchId && values.branchId.value;
      // const roleValue = values.role && values.role.value;
      // const combinedValues = {
      //   ...values,
      //   email: values.userName,
      //   branchId: branchValue,
      //   role: roleValue,
      // };
      // const response = await postApiData(
      //   "api/User/CreateSystemUser",
      //   JSON.stringify(combinedValues)
      // );
      // if (response.success === true) {
      //   toast.success("System User Created Successfully", {
      //     position: "top-right",
      //     autoClose: 3000,
      //   });
      //   toggle();
      //   resetForm();
      //   // getAllSystemUser();
      // } else {
      //   toast.error(`${response.message}`, {
      //     position: "top-right",
      //     autoClose: 3000,
      //   });
      // }
    },
  });

  //const { isOpen, toggle } = props;
  const [activeTab, setActiveTab] = useState(1);

  const handlePrevious = () => {
    setActiveTab(1);
  };

  //
  useEffect(() => {
    console.log(newEmpRegValidation.values);
    console.log(newEmpRegValidation.errors);
  }, [newEmpRegValidation.values]);

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      // role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader
          toggle={() => {
            toggle();
          }}
        >
          Employee Registration
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="d-flex justify-content-between">
              <Nav tabs>
                <NavItem
                  className={classnames({ current: activeTab === 1 })}
                  mx-20
                >
                  <NavLink
                    className={classnames({ current: activeTab === 1 })}
                    color={activeTab === 1 ? "primary" : "secondary"}
                    onClick={() => setActiveTab(1)}
                  >
                    EmpDetails
                  </NavLink>
                </NavItem>
                <NavItem
                  className={classnames({ current: activeTab === 2 })}
                  mx-20
                >
                  <NavLink
                    className={classnames({ current: activeTab === 2 })}
                    color={activeTab === 2 ? "primary" : "secondary"}
                    onClick={() => setActiveTab(2)}
                  >
                    EmpAddress
                    {/* </Button> */}
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            {activeTab === 1 && (
              <Card>
                <CardBody>
                  <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      newEmpRegValidation.handleSubmit(e);
                      return false;
                    }}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="empId">Employee Id</Label>
                          <RequiredAsterisk />
                          <Input
                            // {...register('empID',{required:'Please Enter the EmployeeId'})}
                            name="empId"
                            placeholder="Enter the EmpID"
                            type="number"
                            id="empId"
                            value={newEmpRegValidation.values.empId}
                            onBlur={newEmpRegValidation.handleBlur}
                            onChange={newEmpRegValidation.handleChange}
                            invalid={!!newEmpRegValidation.errors.empId} // Check if there's an error for empId
                          />

                          {newEmpRegValidation.errors.empId && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.empId}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="firstName">First name</Label>
                          <RequiredAsterisk />
                          <Input
                            name="firstName"
                            placeholder="Enter the First name"
                            type="text"
                            id="firstName"
                            value={newEmpRegValidation.values.firstName}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.firstName}
                          />

                          {newEmpRegValidation.errors.firstName && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.firstName}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="middleName">Middle name</Label>
                          <RequiredAsterisk />
                          <Input
                            name="middleName"
                            placeholder="Enter the Middle name"
                            type="text"
                            id="middleName"
                            value={newEmpRegValidation.values.middleName}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.middleName}
                          />

                          {newEmpRegValidation.errors.middleName && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.middleName}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="lastName">Last name</Label>
                          <RequiredAsterisk />
                          <Input
                            name="lastName"
                            placeholder="Enter Last name"
                            type="text"
                            id="lastName"
                            value={newEmpRegValidation.values.lastName}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.lastName}
                          />

                          {newEmpRegValidation.errors.lastName && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.lastName}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <RequiredAsterisk />
                          <Input
                            name="dob"
                            placeholder="Enter the DOB"
                            type="date"
                            id="dob"
                            value={newEmpRegValidation.values.dob}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.dob}
                          />

                          {newEmpRegValidation.errors.dob && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.dob}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label for="department">Select the Department:</Label>

                          <ReactSelect
                            name="department"
                            placeholder="Enter the Department"
                            id="department"
                            options={deptoptions}
                            value={newEmpRegValidation.values.department}
                            onChange={(selectedOption) => {
                              newEmpRegValidation.setFieldValue(
                                "department",
                                selectedOption
                              );
                            }}
                            invalid={
                              newEmpRegValidation.touched.department &&
                              newEmpRegValidation.errors.department
                                ? true
                                : false
                            }
                          />
                          {newEmpRegValidation.values.department === null &&
                            newEmpRegValidation.touched.department &&
                            newEmpRegValidation.errors.department && (
                              <span
                                className="text-danger"
                                style={{ fontSize: "80%" }}
                              >
                                Please Select a Department
                              </span>
                            )}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="dateOfJoining">
                            Enter the Date Of Joining{" "}
                          </Label>
                          <RequiredAsterisk />
                          <Input
                            name="dateOfJoining"
                            placeholder="Enter the Date Of Joining"
                            type="date"
                            id="dateOfJoining"
                            value={newEmpRegValidation.values.dateOfJoining}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.dateOfJoining}
                          />

                          {newEmpRegValidation.errors.dateOfJoining && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.dateOfJoining}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="email">Email ID</Label>
                          <RequiredAsterisk />
                          <Input
                            name="email"
                            placeholder="Enter the EmailID"
                            type="email"
                            id="email"
                            value={newEmpRegValidation.values.email}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.emailId}
                          />

                          {newEmpRegValidation.errors.email && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.email}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="password">Password</Label>
                          <RequiredAsterisk />
                          <Input
                            name="password"
                            placeholder="Enter the Password"
                            type="password"
                            id="password"
                            value={newEmpRegValidation.values.password}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.password}
                          />

                          {newEmpRegValidation.errors.password && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.password}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="confirmPassword">
                            Confirm Password
                          </Label>
                          <RequiredAsterisk />
                          <Input
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={newEmpRegValidation.values.confirmPassword}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={
                              !!newEmpRegValidation.errors.confirmPassword
                            }
                          />

                          {newEmpRegValidation.errors.confirmPassword && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.confirmPassword}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="personalEmail">
                            Personal Email ID
                          </Label>
                          <RequiredAsterisk />
                          <Input
                            name="personalEmail"
                            placeholder="Enter the Personal EmailID"
                            type="email"
                            id="personalEmail"
                            value={newEmpRegValidation.values.personalEmail}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.personalEmail}
                          />

                          {newEmpRegValidation.errors.personalEmail && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.personalEmail}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="mobileNumber">Mobile</Label>
                          <RequiredAsterisk />
                          <Input
                            name="mobileNumber"
                            placeholder="Enter the Mobile No"
                            type="text"
                            id="mobileNumber"
                            value={newEmpRegValidation.values.mobileNumber}
                            onChange={newEmpRegValidation.handleChange}
                            onBlur={newEmpRegValidation.handleBlur}
                            invalid={!!newEmpRegValidation.errors.mobileNumber}
                          />

                          {newEmpRegValidation.errors.mobileNumber && (
                            <FormFeedback type="invalid">
                              {newEmpRegValidation.errors.mobileNumber}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        color="primary"
                        // onClick={handleSaveAndContinue}
                      >
                        Save & Continue
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            )}
            {activeTab === 2 && (
              //   <TabPane tabId="EmpAddress">
              <Card>
                <CardBody>
                  <Form
                    className="needs-validation"
                    onSubmit={(e) => {
                      e.preventDefault();
                      newEmpRegValidation.handleSubmit(e);
                      return false;
                    }}
                  >
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="houseNo"> House no:</Label>
                          <RequiredAsterisk />
                          <Input
                            name="houseNo"
                            placeholder="Enter the House No:"
                            type="text"
                            id="houseNo"
                            value={EmpAddressRegValidation.values.houseNo}
                            onBlur={EmpAddressRegValidation.handleBlur}
                            onChange={EmpAddressRegValidation.handleChange}
                            invalid={!!EmpAddressRegValidation.errors.houseNo} // Check if there's an error for empId
                          />
                          {EmpAddressRegValidation.errors.houseNo && (
                            <FormFeedback type="invalid">
                              {EmpAddressRegValidation.errors.houseNo}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="street"> Street</Label>
                          <RequiredAsterisk />
                          <Input
                            name="street"
                            placeholder="Enter the Street Name"
                            type="text"
                            id="street"
                            value={EmpAddressRegValidation.values.street}
                            onBlur={EmpAddressRegValidation.handleBlur}
                            onChange={EmpAddressRegValidation.handleChange}
                            invalid={!!EmpAddressRegValidation.errors.street} // Check if there's an error for empId
                          />
                          {EmpAddressRegValidation.errors.street && (
                            <FormFeedback type="invalid">
                              {EmpAddressRegValidation.errors.street}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="city"> City</Label>
                          <RequiredAsterisk />
                          <Input
                            name="city"
                            placeholder="Enter the City"
                            type="text"
                            id="city"
                            value={EmpAddressRegValidation.values.city}
                            onBlur={EmpAddressRegValidation.handleBlur}
                            onChange={EmpAddressRegValidation.handleChange}
                            invalid={!!EmpAddressRegValidation.errors.city} // Check if there's an error for empId
                          />
                          {EmpAddressRegValidation.errors.city && (
                            <FormFeedback type="invalid">
                              {EmpAddressRegValidation.errors.city}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="state">State</Label>
                          <RequiredAsterisk />
                          <Input
                            name="state"
                            placeholder="Enter the State"
                            type="text"
                            id="state"
                            value={EmpAddressRegValidation.values.state}
                            onBlur={EmpAddressRegValidation.handleBlur}
                            onChange={EmpAddressRegValidation.handleChange}
                            invalid={!!EmpAddressRegValidation.errors.state} // Check if there's an error for empId
                          />
                          {EmpAddressRegValidation.errors.state && (
                            <FormFeedback type="invalid">
                              {EmpAddressRegValidation.errors.state}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="country">Country</Label>
                          <RequiredAsterisk />
                          <Input
                            name="country"
                            placeholder="Enter the Country"
                            type="text"
                            id="country"
                            value={EmpAddressRegValidation.values.country}
                            onBlur={EmpAddressRegValidation.handleBlur}
                            onChange={EmpAddressRegValidation.handleChange}
                            invalid={!!EmpAddressRegValidation.errors.country} // Check if there's an error for empId
                          />
                          {EmpAddressRegValidation.errors.country && (
                            <FormFeedback type="invalid">
                              {EmpAddressRegValidation.errors.country}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="pincode"> Pincode:</Label>
                          <RequiredAsterisk />
                          <Input
                            name="pincode"
                            placeholder="Enter the Pincode:"
                            type="number"
                            id="pincode"
                            value={EmpAddressRegValidation.values.pincode}
                            onBlur={EmpAddressRegValidation.handleBlur}
                            onChange={EmpAddressRegValidation.handleChange}
                            invalid={!!EmpAddressRegValidation.errors.pincode} // Check if there's an error for empId
                          />
                          {EmpAddressRegValidation.errors.pincode && (
                            <FormFeedback type="invalid">
                              {EmpAddressRegValidation.errors.pincode}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                      <Button
                        color="primary"
                        // type="submit"
                        disabled={activeTab === 1}
                        onClick={handlePrevious}
                        className="mx-1"
                      >
                        Previous
                      </Button>
                      <Button type="submit" color="primary" className="mx-1">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            )}
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </div>
    </Modal>
  );
};

export default ViewEmployeeDetails;
//  export default EmpRegNav;
