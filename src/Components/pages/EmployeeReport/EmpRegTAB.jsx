import React, { useState } from "react";
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
  FormFeedback,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import * as Yup from "yup";
import RequiredAsterisk from "../../../Common/components/RequiredAsterisk";
import { Tabs } from "react-bootstrap";
import { register } from "react-hook-form";

const EmpRegTAB = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const onSubmit = (data) => {
  //     try {
  //       if (validateEmpDetails(data)) {
  //         const newCombinedData = { ...combinedData, ...data };
  //         setCombinedData(newCombinedData);
  //         // Additional actions after successful validation (e.g., API calls)
  //       }
  //     } catch (error) {
  //       // Display error messages to the user based on the error message
  //       console.error('Validation error:', error.message); // For debugging
  //       // You can show error messages on the UI using state or toasts
  //     }
  //   };
  const [combinedData, setCombinedData] = useState({}); // Initialize combined data as an empty object
  const [isDisabled, setIsDisabled] = useState(true); // Next button disabled initially
  const [activeTab, setActiveTab] = useState("EmpDetails");

  const onSubmit = (data) => {
    try {
      if (newEmpRegValidation(data)) {
        const newCombinedData = { ...combinedData, ...data };
        setCombinedData(newCombinedData);
        // Additional actions after successful validation (e.g., API calls)
        //       setActiveTab('empAddress'); // Switch to Emp Address tab
        // setIsDisabled(false); // Enable Next button
      }
    } catch (error) {
      // Display error messages to the user based on the error message
      console.error("Validation error:", error.message); // For debugging
      // You can show error messages on the UI using state or toasts
    }
  };

  //code for previous, save, next, submit buttons
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleTabIndexClick = (tabId) => {
    setActiveTabIndex(tabId); // Update the active tab index
  };

  const handlePrevious = () => {
    setActiveTabIndex(activeTabIndex > 0 ? activeTabIndex - 1 : 0);
  };

  const handleNext = () => {
    setActiveTabIndex(activeTabIndex + 1);
  };
  //   const handleSubmit = (values, { setSubmitting }) => {
  //     // Implement your form submission logic here (e.g., send data to server)
  //     console.log("Form submitted:", values);
  //     setSubmitting(false); // Reset form submission state after processing
  //   };
  //   //Ends - code for previous, save, next, submit buttons

  const { isOpen, toggle } = props;
  const handleTabClick = (tabName) => setActiveTab(tabName);
  const dropoptions = ["HR", "IT", "Sales", "Finance"];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});

  const newEmpRegValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      empId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      department: "",
      deptId: "",
      emailId: "",
      mobileNo: "",
      country: "",
      state: "",
      city: "",
      dob: "",
      dateOfJoining: "",
      password: "",
      confirmpassword: "",
      houseNo: "",
      pincode: "",
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
      department: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "department Name should contain only letters")
        .required("Please Enter the department"),
      //   .required("Please select the department")
      deptId: Yup.string()
        .required("Please Enter the DepartmentId")
        .matches(/^[0-9]*$/, "Please enter only numbers"),
      // .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits")
      emailId: Yup.string()
        .email("Enter a Valid Email ID")
        .required("Please Enter the Email"),
      mobileNo: Yup.string()
        .required("Please Enter Mobile Number")
        .matches(/^[0-9]*$/, "Please enter only numbers")
        .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits"),
      country: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Country Name should contain only letters")
        .required("Please Enter the Country name"),
      state: Yup.string()
        .matches(/^[A-Za-z\s]+$/, " State Name should contain only letters")
        .required("Please Enter the State name"),
      city: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "City Name should contain only letters")
        .required("Please Enter City name"),
      // Add validation for dateOfBirth
      dob: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "You cannot enter a future date")
        .required("Please select the DOB"),

      // Add validation for dateOfJoining (similar to dateOfBirth)
      dateOfJoining: Yup.date()
        .required("Date of Joining is required")
        .max(new Date(), "You cannot enter a future date")
        .required("Please select the Date of Joining"),
      address: Yup.string().required("Address is required"),
      //     dob: '',
      //   dateOfJoining:'',
      //   Address: '',

      //   branchId: Yup.object().shape({
      //     label: Yup.string().required("Please Select a Branch"),
      //     value: Yup.string().required("Please Select a Branch")
      //   }),
      //   role: Yup.object().shape({
      //     label: Yup.string().required("Please Select a Role"),
      //     value: Yup.string().required("Please Select a Role")

      password: Yup.string()
        .required("Please Enter Password")
        .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/,
          "Password must be at least 8 characters and must contain at least one digit, one uppercase letter, and one special character"
        ),
      confirmpassword: Yup.string()
        .required("Please Enter Password to Confirm")
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
  });

  //     onSubmit: async(values, {resetForm}) => {
  //       const branchValue = values.branchId && values.branchId.value
  //       const roleValue = values.role && values.role.value
  //       const combinedValues = {...values, email:values.userName,branchId: branchValue , role: roleValue}
  //       const response = await postApiData("api/User/CreateSystemUser",JSON.stringify(combinedValues));
  //       if(response.success === true){
  //         toast.success("System User Created Successfully",{
  //           position : "top-right",
  //           autoClose: 3000,
  //         })
  //         toggle();
  //         resetForm();
  //         getAllSystemUser()
  //       } else {
  //         toast.error(`${response.message}`,{
  //           position : "top-right",
  //           autoClose: 3000
  //         })
  //       }
  //     }
  //   });
  return (
    <React.Fragment>
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
              <Nav tabs>
                <NavItem>
                  <NavLink
                    color={activeTab === "EmpDetails" ? "primary" : "secondary"}
                    onClick={() => handleTabClick("EmpDetails")}
                  >
                    {/* <span className="number" 
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "Ffff",
                      textAlign: "center",
                      lineHeight: "20px",
                      marginRight: "5px",
                    }}
                    >1.</span> */}
                    {/* <Button  
    color={activeTab === 'EmpDetails' ? 'primary : 'secondary'}
    onClick={() => handleTabClick('EmpDetails') }
    > */}
                    EmpDetails
                    {/* </Button> */}
                  </NavLink>
                </NavItem>

                {/* <Button */}
                {/* <div> */}
                {/* <Nav tabs> */}
                <NavItem>
                  <NavLink
                    color={activeTab === "EmpAddress" ? "primary" : "secondary"}
                    onClick={() => handleTabClick("EmpAddress")}
                  >
                    {/* <span className="number">2.</span> */}
                    EmpAddress
                    {/* </Button> */}
                  </NavLink>
                </NavItem>
              </Nav>

              {/* </div> */}

              {activeTab === "EmpDetails" && (
                // {/* <TabContent activeTab={activeTab}> */}
                // {/* <Tabs activeTab={activeTabIndex} onSelect={handleTabIndexClick}>
                //   <TabPane tabId="EmpDetails"> */}
                <Card>
                  <CardBody>
                    <Form
                      className="needs-validation"
                      onSubmit={(e) => {
                        e.preventDefault();

                        newEmpRegValidation.handleSubmit();
                        //   addNewSystemUserValidation.handleSubmit()
                        return false;
                      }}
                    >
                      <Row>
                        {/* <Col md="6">
          <FormGroup className="mb-3">
            <Label htmlFor="firstName">First name</Label>
            <RequiredAsterisk />
            <Input
              {...register('firstName', { required: 'First name is required' })} // Register the field with validation rule
              name="firstName"
              placeholder="Enter the First name"
              type="text"
              id="firstName"
              value={data.firstName} // Set the initial value from data prop
            />
            {/* Conditionally render error message based on validation */}
                        {/* {errors.firstName && <FormFeedback type="invalid">{errors.firstName.message}</FormFeedback>}
          </FormGroup>
        </Col> */}
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="empId">Employee Id</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("empID", {
                                required: "Please Enter the EmployeeId",
                              })}
                              name="empId"
                              placeholder="Enter the EmpID"
                              type="number"
                              id="empId"
                            />
                            {errors.empId && (
                              <FormFeedback type="invalid">
                                {errors.empId.message}
                              </FormFeedback>
                            )}
                            {/* // // value={addNewSystemUserValidation.values.mobile}
                                // // onChange={addNewSystemUserValidation.handleChange}
                                // // onBlur={addNewSystemUserValidation.handleBlur}
                                // // value={newEmpRegValidation.values.mobile}
                                // // onChange={newEmpRegValidation.handleChange}
                                //    onBlur={newEmpRegValidation.handleBlur}
                                // // invalid={ */}
                            {/* // //   addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ?
                                // //   true : false
                                // // }
                                // invalid={ */}
                            {/* //   newEmpRegValidation.touched.empId && newEmpRegValidation.errors.empId ?
                                //   true : false
                                //  */}

                            {/* {addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ? (
                        <FormFeedback type="invalid">{addNewSystemUserValidation.errors.mobile}</FormFeedback>
                      ): null} */}
                            {/* {newEmpRegValidation.touched.empId && newEmpRegValidation.errors.empId ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.empId}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="firstName">First name</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("firstName", {
                                required: "Please Enter the FirstName",
                              })}
                              name="firstName"
                              placeholder="Enter the First name"
                              type="text"
                              id="firstName"
                              // // value={addNewSystemUserValidation.values.firstName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              //  onBlur={ newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.firstName && addNewSystemUserValidation.errors.firstName ?
                              // //   true : false
                              // // }
                              //  invalid={
                              //   newEmpRegValidation.touched.firstName && newEmpRegValidation.errors.firstName ?
                              //   true : false
                              // }
                            />
                            {errors.firstName && (
                              <FormFeedback type="invalid">
                                {errors.firstName.message}
                              </FormFeedback>
                            )}

                            {/* {/* {addNewSystemUserValidation.touched.firstName && addNewSystemUserValidation.errors.firstName ? (
                        <FormFeedback type="invalid">{addNewSystemUserValidation.errors.firstName}</FormFeedback>
                      ): null} */}
                            {/* { newEmpRegValidation.touched.firstName && newEmpRegValidation.errors.firstName ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.firstName}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="middleName">Middle name</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("middleName", {
                                required: "Please Enter the MiddleName",
                              })}
                              name="middleName"
                              placeholder="Enter the Middle name"
                              type="text"
                              id="middleName"
                              // // value={addNewSystemUserValidation.values.firstName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              //  onBlur={ newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.firstName && addNewSystemUserValidation.errors.firstName ?
                              // //   true : false
                              // // }
                              //  invalid={
                              //   newEmpRegValidation.touched.middleName && newEmpRegValidation.errors.middleName ?
                              //   true : false
                              // }
                            />
                            {errors.middleName && (
                              <FormFeedback type="invalid">
                                {errors.middleName.message}
                              </FormFeedback>
                            )}

                            {/* {/* {addNewSystemUserValidation.touched.firstName && addNewSystemUserValidation.errors.firstName ? (
                        <FormFeedback type="invalid">{addNewSystemUserValidation.errors.firstName}</FormFeedback>
                      ): null} */}
                            {/* { newEmpRegValidation.touched.middleName && newEmpRegValidation.errors.middleName ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.middleName}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>

                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="lastName">Last name</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("lastName", {
                                required: "Please Enter the LastName",
                              })}
                              name="lastName"
                              placeholder="Enter Last name"
                              type="text"
                              id="lastName"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.lastName && newEmpRegValidation.errors.lastName ?
                              //   true : false
                              // }
                            />
                            {errors.lastName && (
                              <FormFeedback type="invalid">
                                {errors.lastName.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.lastName && newEmpRegValidation.errors.lastName ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.lastName}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("dob", {
                                required: "Please Enter the Date of Birth",
                              })}
                              name="dob"
                              placeholder="Enter the DOB"
                              type="date"
                              id="dob"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.dob && newEmpRegValidation.errors.dob ?
                              //   true : false
                              // }
                            />
                            {errors.dob && (
                              <FormFeedback type="invalid">
                                {errors.dob.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.dob && newEmpRegValidation.errors.dob ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.dob}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label for="dept">Select the Department:</Label>
                            <Dropdown
                              isOpen={dropdownOpen}
                              toggle={() => setDropdownOpen(!dropdownOpen)}
                            >
                              <DropdownToggle caret>Select ...</DropdownToggle>
                              <DropdownMenu>
                                {dropoptions.map((Option) => (
                                  <DropdownItem key={Option}>
                                    {Option}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </Col>
                        {/* <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="dept">Department</Label>
                          <Input
                            name="dept"
                            placeholder="Enter the dept Name"
                            id="dept"
                            // value={addNewSystemUserValidation.values.middleName}
                            // onChange={addNewSystemUserValidation.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      {/*                   
                  <Col md="6">
                    <FormGroup className="mb-3">
                      <Label htmlFor="deptId">Department Id</Label>
                      <RequiredAsterisk/>
                      <Input
                        name="deptId"
                        placeholder="Enter the deptID"
                        type="number"
                        id="deptId"
                        // // value={addNewSystemUserValidation.values.mobile}
                        // // onChange={addNewSystemUserValidation.handleChange}
                        // // onBlur={addNewSystemUserValidation.handleBlur}
                        // // value={newEmpRegValidation.values.mobile}
                        // // onChange={newEmpRegValidation.handleChange}
                        onBlur={newEmpRegValidation.handleBlur}
                        // // invalid={
                        // //   addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ?
                        // //   true : false
                        // // }
                        // invalid={
                        //   newEmpRegValidation.touched.deptId && newEmpRegValidation.errors.deptId ?
                        //   true : false
                        // }
                      />
                      {/* {addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ? (
                        <FormFeedback type="invalid">{addNewSystemUserValidation.errors.mobile}</FormFeedback>
                      ): null} */}
                        {/* {newEmpRegValidation.touched.deptId && newEmpRegValidation.errors.deptId ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.deptId}</FormFeedback>
                      ): null} */}
                        {/* </FormGroup>
                  </Col> */}
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="dateOfJoining">
                              Enter the Date Of Joining{" "}
                            </Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("dateOfJoining", {
                                required: "Please Enter the Date of Joining",
                              })}
                              name="dateOfJoining"
                              placeholder="Enter the Date Of Joining"
                              type="date"
                              id="dateOfJoining"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.dateOfJoining && newEmpRegValidation.errors.dateOfJoining ?
                              //   true : false
                              // }
                            />
                            {errors.dateOfJoining && (
                              <FormFeedback type="invalid">
                                {errors.dateOfJoining.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.dateOfJoining && newEmpRegValidation.errors.dateOfJoining ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.dateOfJoining}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>

                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="emailId">Email ID</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("emailId", {
                                required: "Please Enter the EmailId",
                              })}
                              name="emailId"
                              placeholder="Enter the EmailID"
                              type="email"
                              id="emailId"
                              // // value={addNewSystemUserValidation.values.userName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // // value={addNewSystemUserValidation.values.userName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // onBlur={newEmpRegValidation.handleBlur}

                              // // invalid={
                              // //   addNewSystemUserValidation.touched.userName && addNewSystemUserValidation.errors.userName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.emailId && newEmpRegValidation.errors.emailId?
                              //   true : false
                              // }
                            />
                            {errors.emailId && (
                              <FormFeedback type="invalid">
                                {errors.emailId.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.emailId && newEmpRegValidation.errors.emailId ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.emailId}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="password">Password</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("password", {
                                required: "Please Enter the Password",
                              })}
                              name="password"
                              placeholder="Enter the Password"
                              type="password"
                              id="password"
                              // value={newEmpRegValidation.values.password}
                              // onChange={newEmpRegValidation.handleChange}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // invalid={
                              //   newEmpRegValidation.touched.password && newEmpRegValidation.errors.password ?
                              //   true : false
                              // }
                            />
                            {errors.password && (
                              <FormFeedback type="invalid">
                                {errors.password.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.password && newEmpRegValidation.errors.password ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.password}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="confirmpassword">
                              Confirm Password
                            </Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("confirmpassword", {
                                required: "Please Enter the same password ",
                              })}
                              name="confirmpassword"
                              placeholder="Confirm Password"
                              type="password"
                              id="confirmpassword"
                              // value={newEmpRegValidation.values.confirmpassword}
                              // onChange={newEmpRegValidation.handleChange}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // invalid={
                              //   newEmpRegValidation.touched.confirmpassword && newEmpRegValidation.errors.confirmpassword ?
                              //   true : false
                              // }
                            />
                            {errors.confirmpassword && (
                              <FormFeedback type="invalid">
                                {errors.confirmpassword.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.confirmpassword && newEmpRegValidation.errors.confirmpassword ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.confirmpassword}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="personalEmail">
                              Personal Email ID
                            </Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("personalEmail", {
                                required: "Please Enter the Personal EmailId",
                              })}
                              name="personalEmail"
                              placeholder="Enter the Personal EmailID"
                              type="email"
                              id="personalEmail"
                              // // value={addNewSystemUserValidation.values.userName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // // value={addNewSystemUserValidation.values.userName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // onBlur={newEmpRegValidation.handleBlur}

                              // // invalid={
                              // //   addNewSystemUserValidation.touched.userName && addNewSystemUserValidation.errors.userName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.emailId && newEmpRegValidation.errors.emailId?
                              //   true : false
                              // }
                            />
                            {errors.personalEmail && (
                              <FormFeedback type="invalid">
                                {errors.personalEmail.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.emailId && newEmpRegValidation.errors.emailId ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.emailId}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="mobile">Mobile</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("mobile", {
                                required: "Please Enter the Mobile No",
                              })}
                              name="mobile"
                              placeholder="Enter the Mobile No"
                              type="number"
                              id="mobile"
                              // // value={addNewSystemUserValidation.values.mobile}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // // value={newEmpRegValidation.values.mobile}
                              // // onChange={newEmpRegValidation.handleChange}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.mobileNo && newEmpRegValidation.errors.mobileNo ?
                              //   true : false
                              // }
                            />
                            {errors.mobile && (
                              <FormFeedback type="invalid">
                                {errors.mobile.message}
                              </FormFeedback>
                            )}
                            {/* {/* {addNewSystemUserValidation.touched.mobile && addNewSystemUserValidation.errors.mobile ? (
                        <FormFeedback type="invalid">{addNewSystemUserValidation.errors.mobile}</FormFeedback>
                      ): null} */}
                            {/* {newEmpRegValidation.touched.mobileNo && newEmpRegValidation.errors.mobileNo ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.mobileNo}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          color="primary"
                          className="mx-1"
                          onClick={handleNext}
                        >
                          Save & Continue
                        </Button>
                        {/* <Button
                          color="secondary"
                          disabled={activeTabIndex === 1}
                          onClick={handleNext}
                          className="mx-1"
                        >
                          Next
                        </Button> */}
                      </div>
                    </Form>
                  </CardBody>
                </Card>
                // {/* </TabPane> */}
              )}
              {activeTab === "EmpAddress" && (
                // <div> */}
                // <h2>ADDRESS</h2>
                // <TabPane tabId="EmpAddress">
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            {/* <h2>ADDRESS</h2> */}
                            <Label htmlFor="houseNo"> House no:</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("houseNo", {
                                required: "Please Enter the House No",
                              })}
                              name="houseNo"
                              placeholder="Enter the House No:"
                              type="text"
                              id="houseNo"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.address && newEmpRegValidation.errors.address ?
                              //   true : false
                              // }
                            />
                            {errors.houseNo && (
                              <FormFeedback type="invalid">
                                {errors.houseNo.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.address && newEmpRegValidation.errors.address ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.address}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="street"> Street</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("street", {
                                required: "Please Enter the Street Name",
                              })}
                              name="street"
                              placeholder="Enter the Street Name"
                              type="text"
                              id="street"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.city && newEmpRegValidation.errors.city ?
                              //   true : false
                              // }
                            />
                            {errors.street && (
                              <FormFeedback type="invalid">
                                {errors.street.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.city && newEmpRegValidation.errors.city ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.city}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>

                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="city"> City</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("city", {
                                required: "Please Enter the City",
                              })}
                              name="city"
                              placeholder="Enter the City"
                              type="text"
                              id="city"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.city && newEmpRegValidation.errors.city ?
                              //   true : false
                              // }
                            />
                            {errors.city && (
                              <FormFeedback type="invalid">
                                {errors.city.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.city && newEmpRegValidation.errors.city ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.city}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="state">State</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("state", {
                                required: "Please Enter the State",
                              })}
                              name="state"
                              placeholder="Enter the State"
                              type="text"
                              id="state"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.state && newEmpRegValidation.errors.state ?
                              //   true : false
                              // }
                            />
                            {errors.state && (
                              <FormFeedback type="invalid">
                                {errors.state.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.state && newEmpRegValidation.errors.state ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.state}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>

                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="country">Country</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("country", {
                                required: "Please Enter the Country",
                              })}
                              name="country"
                              placeholder="Enter the Country"
                              type="text"
                              id="country"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.country && newEmpRegValidation.errors.country ?
                              //   true : false
                              // }
                            />
                            {errors.country && (
                              <FormFeedback type="invalid">
                                {errors.country.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.country && newEmpRegValidation.errors.country ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.country}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="pincode"> Pincode:</Label>
                            <RequiredAsterisk />
                            <Input
                              {...register("pincode", {
                                required: "Please Enter the Pincode",
                              })}
                              name="pincode"
                              placeholder="Enter the Pincode:"
                              type="number"
                              id="pincode"
                              // // value={addNewSystemUserValidation.values.lastName}
                              // // onChange={addNewSystemUserValidation.handleChange}
                              // // onBlur={addNewSystemUserValidation.handleBlur}
                              // onBlur={newEmpRegValidation.handleBlur}
                              // // invalid={
                              // //   addNewSystemUserValidation.touched.lastName && addNewSystemUserValidation.errors.lastName ?
                              // //   true : false
                              // // }
                              // invalid={
                              //   newEmpRegValidation.touched.address && newEmpRegValidation.errors.address ?
                              //   true : false
                              // }
                            />
                            {errors.pincode && (
                              <FormFeedback type="invalid">
                                {errors.pincode.message}
                              </FormFeedback>
                            )}
                            {/* {newEmpRegValidation.touched.address && newEmpRegValidation.errors.address ? (
                        <FormFeedback type="invalid">{newEmpRegValidation.errors.address}</FormFeedback>
                      ): null} */}
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          color="primary"
                          disabled={activeTabIndex === 0}
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
      {/* //   onClosed={() => { */}
      {/* //     newEmpRegValidation.resetForm();
            // addNewSystemUserValidation.resetForm(); */}

      <div>
        {/* EmpREG */}
        {/* <Button  
    color = {activeTab === 'EmpDetails' ? 'primary : 'secondary'}
    onClick={() => handleTabClick('EmpDetails') }
    >
    EmpDetails
    </Button> */}
      </div>
    </React.Fragment>
  );
};

export default EmpRegTAB;
