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
  Table,
  NavItem,
  NavLink,
  Nav,
  FormFeedback
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { putApiData } from "../../Common/helpers/axiosHelper.js";
// import { postApiData } from "../../../../helpers/axiosHelper";
import { ToastContainer, toast } from "react-toastify";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk.jsx";
import ReactSelect from "react-select";
//import { postApiData } from "../../../Common/helpers/axiosHelper";
import { getApiData, postApiData } from "../../Common/helpers/axiosHelper.js";
// import RequiredAsterisk from "../../components/common/RequiredAsterisk";
// import reactSelect from "react-select";
// import SelectStyle from '../../../../common/data/SelectStyle'
// import { roleList } from "../../../../common/data/roles";

const ViewEmployeeDetails = (props) => {
  const { isOpen, toggle, viewStatus, employeeAddressData, employeeData } = props
  console.log(toggle);
  console.log(employeeData);
  console.log(employeeAddressData)
   const [departDetails, setDepartDetails] = useState([]);
  useEffect(() => {
    getDepartmenDetails();
  }, []);
  const getDepartmenDetails = async () => {
    try {
     // setIsLoading(true);
      console.log("entered");
      const response = await getApiData(`api/Departments/GetAllDepartments`);
      // const deptoptions = response.data.departmentName || [];
    //  setIsLoading(false);
      console.log("****************");

      // console.log("Department" + deptoptions);
      const mappedResponse = response.data.map((item) => ({
   
        label: item.departmentName,
        value: item.departmentId,
      }));
      setDepartDetails(mappedResponse);
      console.log("DepartDetails" + departDetails);
     // setIsLoading(false);
    } catch (error) {
      // Error handling scenario
      console.error("Error fetching department data:", error);
      // Implement additional error handling as needed (e.g., display an error message to the user)
    }
  };
  const gender = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];
  const maritalStatus = [
    { label: "Married", value: 3 },
    { label: "Unmarried", value: 4 },
  ];
    // const getEmployeeData= async (employeeId) => {
  //   // setIsLoading(true)
  //   const response = await getApiData(`/api/Employee/GetEmployeeById?EmployeeId=${employeeId}`);
  //  // setIsLoading(false)

  //  setEmployeeData(response)

  // };


  // useEffect(() => {
  //   // Check if data is received and populate form fields
  //   if (data) {
  //     newEmpRegValidation.setValues(data);
  //     //console.logout("details",{newEmpRegValidation});
  //   }
  // }, [data]); 

  const newEmpRegValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // empId: "",
       employeeId: employeeData?.employeeId || '',
       managerId: employeeData?.managerId || '',
       userName: employeeData?.userName || '',
       firstName: employeeData?.firstName || '',
       middleName: employeeData?.middleName || '',
       lastName: employeeData?.lastName || '',
       maritalStatus:maritalStatus.find(status=>status.label === employeeData?.maritalStatus),
      gender:gender.find(gender=>gender.label === employeeData?.gender),
     //  departmentId: employeeData?.departmentId || '',
     departmentId:departDetails.find(dept => dept.value === employeeData.departmentId),
       // departmentName: employeeData?.departmentName || '',
       email: employeeData?.email || '',
      mobileNumber: employeeData?.mobileNumber || "",
       dob: employeeData?.dob || "",
       dateOfJoining: employeeData?.dateOfJoining || "",
     password: null || '',
    confirmPassword: null || '',

      // personalEmail: "",
    },

    validationSchema: Yup.object({
       userName: Yup.string().email('Username should be a Email').required("Please Enter Email"),
   
      firstName: Yup.string()
         .matches(/^[A-Za-z\s]+$/, "First Name should contain only letters")
        .required("Please Enter the First name"),
       middleName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Middle Name should contain only letters"),
      //  .required("Please Enter the Middle name"),

       lastName: Yup.string()
         .matches(/^[A-Za-z\s]+$/, "Last Name should contain only letters")
         .required("Please Enter the Last name"),
         maritalStatus: Yup.object().shape({
          label: Yup.string().required("Please Select a maritalStatus"),
          value: Yup.string().required("Please Select a maritalStatus"),
        }),
        gender: Yup.object().shape({
          label: Yup.string().required("Please Select a gender"),
          value: Yup.string().required("Please Select a gender"),
        }),
         departmentId: Yup.object().shape({
           label: Yup.string().required("Please Select a Department"),
          value: Yup.string().required("Please Select a Department"),
         }),
       // departmentId:,
        email: Yup.string()
       .email("Enter a Valid Email ID")
       .required("Please Enter the Email"),
      password: Yup.string()
       // .required("Please Enter Password")
         .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/,
          "Password must be at least 8 characters and must contain at least one digit, one uppercase letter, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Please Enter Password to Confirm")
         .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),

      mobileNumber: Yup.string()
        .required("Please Enter Mobile Number")
        .matches(/^[0-9]*$/, "Please enter only numbers")
        .matches(/^\+?\d{10}$/, "Mobile Number must be 10 digits"),

      // // // Add validation for dateOfBirth
      dob: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "You cannot enter a future date")
        .required("Please select the DOB"),

      // // Add validation for dateOfJoining (similar to dateOfBirth)
      dateOfJoining: Yup.date()
        .required("Date of Joining is required")
        .max(new Date(), "You cannot enter a future date")
        .required("Please select the Date of Joining"),
    }),
    onSubmit: async (values) => {
      //  if (newEmpRegValidation.isValid) {if()
      let deptId = values.departmentId && values.departmentId.value
     let status= values.maritalStatus && values.maritalStatus.label
      let genderI = values.gender && values.gender.label


      if (employeeData !== null) {
        if (employeeData.employeeId !== "") {
          const combinedValues = { ...values ,departmentId:deptId,maritalStatus:status,gender:genderI};
          const hasChanges = Object.keys(values).some(key => values[key] !== newEmpRegValidation.initialValues[key]);
          if (hasChanges) {
            const response = await putApiData(`api/Employee/UpdateEmployee/${employeeData.employeeId}`, combinedValues);
            if (response.success === true) {
              toast.success("Employee Details info Updated Successfully", {
                position: "top-right",
                autoClose: 3000,
                onClose: () => {
                  //  setSaving(false);
                }
              });
              setActiveTab(2);
            }
          } else {
            toast.error("No changes to update", {
              position: "top-right",
              autoClose: 3000,
              onClose: () => {
                // setSaving(false);
              }
            });
            newEmpRegValidation.setValues(newEmpRegValidation.initialValues);
          }
        } else {
          const combinedValues = { ...values ,departmentId:deptId,maritalStatus:status,gender:genderI};
          const hasChanges = Object.keys(values).some(key => values[key] !== newEmpRegValidation.initialValues[key]);
          if (hasChanges) {
            const response = await putApiData(`api/Manager/UpdateManager/${employeeData.managerId}`, combinedValues);
            if (response.success === true) {
              toast.success("Employee Details contact  info Updated Successfully", {
                position: "top-right",
                autoClose: 3000,
                onClose: () => {
                  //  setSaving(false);
                }
              });
              setActiveTab(2);
            }
          } else {
            toast.error("No changes to update", {
              position: "top-right",
              autoClose: 3000,
              onClose: () => {
                // setSaving(false);
              }
            });
            newEmpRegValidation.setValues(newEmpRegValidation.initialValues);
          }

        }
      } else {
        toast.info("No Changes to Update", {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            //  setSaving(false);
          },
        });
      }
    
    }
     });
//  const updateEmployeeDetails = async (values) => { }
  // const getEmployeeAddressData= async (employeeId) => {
  //   // setIsLoading(true)
  //   const response = await getApiData(`/api/Address/GetAddressById?EmployeeId=${employeeId}`);
  //  // setIsLoading(false)

  //  setEmployeeAddressData(response)

  // };
  const empAddressRegValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      country: employeeAddressData?.country || "",
      state: employeeAddressData?.state || "",
      city: employeeAddressData?.city || "",
      street: employeeAddressData?.street || "",
      homeNo: employeeAddressData?.homeNo || "",
      postalCode: employeeAddressData?.postalCode || "",
      landMark: employeeAddressData?.landMark || "",
    },

    validationSchema: Yup.object({
      postalCode: Yup.string()
        .required("Please Enter the postalCode")
        .matches(/^[0-9]*$/, "Please enter only numbers"),

      homeNo: Yup.string()
        .required("Please Enter the Home No")
        .matches(
          /^[a-zA-Z0-9-]+$/,
          "House No should contain only Alphanumeric with hypens"
        ),
      street: Yup.string()
        // Allow any combination of allowed characters
        .matches(/^[a-zA-Z0-9\s\-,\.]+$/, "Invalid street address format")
        // Ensure there's at least one non-whitespace character
        .trim()
        // .required('Street address is required');

        .required("Please Enter the Street Name"),
      // .matches(
      //   /^[a-zA-Z0-9-]+$/,
      //   "Street Name should contain only Alphanumeric with hypens"
      // ),
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
        // .required("Please Enter the landMark")
        .trim(),
      // .matches(
      //   /^[a-zA-Z0-9-]+$/,
      //   "Street Name should contain only Alphanumeric with hypens"
      // ),
    }),
    onSubmit: async (values, {resetForm}) => {
      try{
        if (employeeAddressData !== null) {
        const combinedValues = { ...values };
        const hasChanges = Object.keys(values).some(key => values[key] !== empAddressRegValidation.initialValues[key]);
        if (hasChanges) {
          const response = await putApiData(`api/Address/UpdateAddress/${employeeData.addressId}`, combinedValues);
          if (response.success === true) {
            console.log("address")
            toast.success("Employee Address details info Updated Successfully", {
              position: "top-right",
              autoClose: 1000,
             
            });
            setActiveTab(1);
            toggle()
            return;
            
          }
        }
        else {
          toast.info("No changes to update", {
            position: "top-right",
            autoClose: 2000,
           
          });
          setActiveTab(1);
          toggle()
          empAddressRegValidation.setValues(empAddressRegValidation.initialValues);
        }
        
      }
      else {
        toast.info("No Changes to Update", {
          position: "top-right",
          autoClose: 3000,
          onClose: () => {
            //  setSaving(false);
          },
        });
      }}catch (error) {
        console.error("Error updating :", error);
        toast.error("Failed to update  details", {
            position: "top-right",
            autoClose: 2000,
        });
    } 
      
   //  toggle()
    
    }


  });

  //const { isOpen, toggle } = props;
  const [activeTab, setActiveTab] = useState(1);


  const handlePrevious = () => {
    setActiveTab(1);
  };

  const onCloseFun = () => {
    alert("Hi")
  }

  //
  useEffect(() => {
    console.log(newEmpRegValidation.values);
    console.log(newEmpRegValidation.errors);
  }, [newEmpRegValidation.values]);

  return (
    <>
      <ToastContainer containerId="viewEmpContainer" closeButton={false} limit={1} />


      <Modal
        size="lg"
        isOpen={isOpen}
        toggle={toggle}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        onClose={onCloseFun}
      
      >
        <div className="modal-content">
       
        <ModalHeader toggle={toggle}>
            Employee Details
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
                        {/* <Col md="6">
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
                    </Col> */}
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="userName">Username</Label>
                            <RequiredAsterisk />
                            <Input
                              name="userName"
                              placeholder="Enter Username"
                              type="email"
                              id="userName"
                              disabled={true}
                              value={newEmpRegValidation.values.userName}
                            />
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
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.firstName}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.firstName &&
                                newEmpRegValidation.errors.firstName
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.firstName &&
                            newEmpRegValidation.errors.firstName ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.firstName}
                              </FormFeedback>
                            ) : null}
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
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.middleName}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.middleName &&
                                newEmpRegValidation.errors.middleName
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.middleName &&
                            newEmpRegValidation.errors.middleName ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.middleName}
                              </FormFeedback>
                            ) : null}
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
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.lastName}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.lastName &&
                                newEmpRegValidation.errors.lastName
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.lastName &&
                            newEmpRegValidation.errors.lastName ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.lastName}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label for="gender"> Gender:</Label>
                            <RequiredAsterisk />

                            <ReactSelect
                              name="gender"
                              placeholder="Select the Gender"
                              id="gender"
                              options={gender}
                              value={newEmpRegValidation.values.gender}
                              // onChange={handleRoleChange}
                              onChange={(selectedOption) => {
                                newEmpRegValidation.setFieldValue(
                                  "gender",
                                  selectedOption
                                );
                              }}
                              invalid={
                                newEmpRegValidation.touched.gender &&
                                newEmpRegValidation.errors.gender
                                  ? true
                                  : false
                              }
                              isDisabled={viewStatus}
                            />
                            {newEmpRegValidation.values.gender === null &&
                              newEmpRegValidation.touched.gender &&
                              newEmpRegValidation.errors.gender && (
                                <span
                                  className="text-danger"
                                  style={{ fontSize: "80%" }}
                                >
                                  Please Select a Gender
                                </span>
                              )}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label for="maritalStatus"> MaritalStatus:</Label>
                            

                            <ReactSelect
                              name="maritalStatus"
                              placeholder="Select the MaritalStatus"
                              id="maritalStatus"
                              options={maritalStatus}
                              value={newEmpRegValidation.values.maritalStatus}
                              // onChange={handleRoleChange}
                              onChange={(selectedOption) => {
                                newEmpRegValidation.setFieldValue(
                                  "maritalStatus",
                                  selectedOption
                                );
                              }}
                              invalid={
                                newEmpRegValidation.touched.maritalStatus &&
                                newEmpRegValidation.errors.maritalStatus
                                  ? true
                                  : false
                              }
                              isDisabled={viewStatus}
                            />
                            {newEmpRegValidation.values.maritalStatus ===
                              null &&
                              newEmpRegValidation.touched.maritalStatus &&
                              newEmpRegValidation.errors.maritalStatus && (
                                <span
                                  className="text-danger"
                                  style={{ fontSize: "80%" }}
                                >
                                  Please Select a Marital Status
                                </span>
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
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.dob}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.dob &&
                                newEmpRegValidation.errors.dob
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.dob &&
                            newEmpRegValidation.errors.dob ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.dob}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label for="departmentId">Select the Department:</Label>

                            <ReactSelect
                              name="departmentId"
                              placeholder="Enter the Department"
                              id="departmentId"
                              options={departDetails}
                              value={newEmpRegValidation.values.departmentId}
                             
                            //  value={newEmpRegValidation.values.departmentName}
                              onChange={(selectedOption) => {
                                newEmpRegValidation.setFieldValue(
                                  "departmentId",
                                  selectedOption
                                );
                              }}
                              invalid={
                                newEmpRegValidation.touched.departmentId &&
                                  newEmpRegValidation.errors.departmentId
                                  ? true
                                  : false
                              }
                              isDisabled={viewStatus}
                            />
                            {newEmpRegValidation.values.departmentId === null &&
                              newEmpRegValidation.touched.departmentId &&
                              newEmpRegValidation.errors.departmentId && (
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
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.dateOfJoining}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.dateOfJoining &&
                                newEmpRegValidation.errors.dateOfJoining
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.dateOfJoining &&
                            newEmpRegValidation.errors.dateOfJoining ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.dateOfJoining}
                              </FormFeedback>
                            ) : null}
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
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.email}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.email &&
                                newEmpRegValidation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.email &&
                            newEmpRegValidation.errors.email ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        {viewStatus === false && (
                          <>
                            <Col md="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="password">Password</Label>
                          
                                <Input
                                  name="password"
                                  placeholder="********"
                                  type="password"
                                  id="password"
                                  disabled={viewStatus}
                                  value={newEmpRegValidation.values.password || ''}
                                  onChange={newEmpRegValidation.handleChange}
                                  onBlur={newEmpRegValidation.handleBlur}
                                  invalid={
                                    newEmpRegValidation.touched.password &&
                                    newEmpRegValidation.errors.password
                                      ? true
                                      : false
                                  }
                                />
                                {newEmpRegValidation.touched.password &&
                                newEmpRegValidation.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {newEmpRegValidation.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup className="mb-3">
                                <Label htmlFor="confirmPassword">
                                  Confirm Password
                                </Label>
                              
                                <Input
                                  name="confirmPassword"
                                  placeholder="********"
                                  type="password"
                                  id="confirmPassword"
                                  disabled={viewStatus}
                                  value={newEmpRegValidation.values.confirmPassword || ''}
                                  onChange={newEmpRegValidation.handleChange}
                                  onBlur={newEmpRegValidation.handleBlur}
                                  invalid={
                                    newEmpRegValidation.touched.confirmPassword &&
                                    newEmpRegValidation.errors.confirmPassword
                                      ? true
                                      : false
                                  }
                                />
                                {newEmpRegValidation.touched.confirmPassword &&
                                newEmpRegValidation.errors.confirmPassword ? (
                                  <FormFeedback type="invalid">
                                    {newEmpRegValidation.errors.confirmPassword}
                                  </FormFeedback>
                                ) : null}
                              </FormGroup>
                            </Col>
                          </>
                        )}
                        {/* <Col md="6">
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
                    </Col> */}
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="mobileNumber">Mobile</Label>
                            <RequiredAsterisk />
                            <Input
                              name="mobileNumber"
                              placeholder="Enter the Mobile No"
                              type="text"
                              id="mobileNumber"
                              disabled={viewStatus}
                              value={newEmpRegValidation.values.mobileNumber}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.mobileNumber &&
                                newEmpRegValidation.errors.mobileNumber
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.mobileNumber &&
                            newEmpRegValidation.errors.mobileNumber ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.mobileNumber}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          color="primary"
                          //disabled={viewStatus}
                          hidden={viewStatus}
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
                            <Label htmlFor="homeNo"> Home no:</Label>
                            <RequiredAsterisk />
                            <Input
                              name="homeNo"
                              placeholder="Enter the Home No:"
                              type="text"
                              id="homeNo"
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.homeNo}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={!!empAddressRegValidation.errors.homeNo} // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.homeNo && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.homeNo}
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
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.street}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={!!empAddressRegValidation.errors.street} // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.street && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.street}
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
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.city}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={!!empAddressRegValidation.errors.city} // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.city && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.city}
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
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.state}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={!!empAddressRegValidation.errors.state} // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.state && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.state}
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
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.country}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={!!empAddressRegValidation.errors.country} // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.country && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.country}
                              </FormFeedback>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="postalCode"> postalCode:</Label>
                            <RequiredAsterisk />
                            <Input
                              name="postalCode"
                              placeholder="Enter the postalCode:"
                              type="text"
                              id="postalCode"
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.postalCode}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={
                                !!empAddressRegValidation.errors.postalCode
                              } // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.postalCode && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.postalCode}
                              </FormFeedback>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="landMark"> LandMark</Label>

                            <Input
                              name="landMark"
                              placeholder="Enter the LandMark Name"
                              type="text"
                              id="landMark"
                              disabled={viewStatus}
                              value={empAddressRegValidation.values.landMark}
                              onBlur={empAddressRegValidation.handleBlur}
                              onChange={empAddressRegValidation.handleChange}
                              invalid={!!empAddressRegValidation.errors.landMark} // Check if there's an error for empId
                            />
                            {empAddressRegValidation.errors.landMark && (
                              <FormFeedback type="invalid">
                                {empAddressRegValidation.errors.landMark}
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
                          hidden={viewStatus}
                          onClick={handlePrevious}

                          className="mx-1"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={empAddressRegValidation.handleSubmit}
                          type="submit"
                          color="primary"
                          className="mx-1"
                          hidden={viewStatus}
                        >
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

    </>

  );
};

export default ViewEmployeeDetails;
