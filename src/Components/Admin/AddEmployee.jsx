import React, { useRef, useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import { postApiData } from "../../Common/helpers/axiosHelper";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import { getApiData } from "../../Common/helpers/axiosHelper.js";
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
  Nav,
  NavItem,
  NavLink,
  FormFeedback,
} from "reactstrap";
import ReactSelect from "react-select";
const AddEmployee = ({ isOpen, toggle }) => {
  const [isUid, setIsUid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const [departDetails, setDepartDetails] = useState([]);
  const [noManDeptDetails, setNoManDeptDetails] = useState([]);
  const [role, setRole] = useState(false);

  const [addressUid, setAddressUid] = useState([]);
  // if (!document.querySelector('Input[name="gender"]:checked')) {
  //   // Handle error, e.g., display an error message
  //   alert("Please select a gender.");
  //   return;
  // }
  // const deptoptions = [
  //   { label: "HR", value: 1 },
  //   { label: "Finance", value: 2 },
  //   { label: "IT", value: 3 },
  //   { label: "Sales", value: 4 },
  // ];

  // Dept with No manager details
  // const getNoManagerDeptDetails = async () => {
  //   try {
  //     setIsLoading(true);
  //     console.log("entered");
  //     const response = await getApiData(
  //       `api/Departments/GetDepartmentsWithNoManagers`
  //     );
  //     // const deptoptions = response.data.departmentName || [];
  //     setIsLoading(false);
  //     console.log("****************");

  //     // console.log("Department" + deptoptions);
  //     const mappedResponse = response.data.map((item) => ({
  //       // index: index + 1,
  //       // sno: item.id,
  //       // name: item.firstName,
  //       // // email: item.email,
  //       // email: item.userName,
  //       label: item.departmentName,
  //       value: item.departmentId,
  //     }));
  //     setNoManDeptDetails(mappedResponse);
  //     console.log("NoManagerDeptDetails" + departDetails);
  //     setIsLoading(false);
  //   } catch (error) {
  //     // Error handling scenario
  //     console.error("Error fetching department data:", error);
  //     // Implement additional error handling as needed (e.g., display an error message to the user)
  //   }
  // };

  //All department details
  const getDepartmentDetails = async () => {
    // console.log(
    //   "role" + JSON.stringify(newEmpRegValidation.values.roleOptions.label)
    // );

    try {
      setIsLoading(true);
      console.log("entered");
      // console.log("Role - " + role);
      // const response = await getApiData(`api/Departments/GetAllDepartments`);

      const response =
        newEmpRegValidation.values?.roleOptions?.label === "Manager"
          ? await getApiData(`api/Departments/GetDepartmentsWithNoManagers`)
          : await getApiData(`api/Departments/GetAllDepartments`);

      // if (Roleselected === "Employee") {
      //   // role={newEmpRegValidation.values.roleOptions};

      //   const response = await getApiData(`api/Departments/GetAllDepartments`);
      // } else {
      // const response = await getApiData(
      //   `api/Departments/GetDepartmentsWithNoManagers`
      // );
      // }
      // const deptoptions = response.data.departmentName || [];
      setIsLoading(false);
      console.log("****************");
      console.log(role);

      // console.log("Department" + deptoptions);
      const mappedResponse = response.data.map((item) => ({
        // index: index + 1,
        // sno: item.id,
        // name: item.firstName,
        // // email: item.email,
        // email: item.userName,
        label: item.departmentName,
        value: item.departmentId,
      }));
      setDepartDetails(mappedResponse);
      console.log("DepartDetails" + departDetails);
      setIsLoading(false);
    } catch (error) {
      // Error handling scenario
      console.error("Error fetching department data:", error);
      // Implement additional error handling as needed (e.g., display an error message to the user)
    }
  };
  const [subdetails, setSubdetails] = useState();
  const roleOptions = [
    { label: "Manager", value: 11 },
    { label: "Employee", value: 22 },
  ];
  const gender = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];
  const maritalStatus = [
    { label: "Married", value: 3 },
    { label: "Unmarried", value: 4 },
  ];

  // console.log({ role });
  // const deptoptions = [
  //   { label: "HR", value: 1 },
  //   { label: "Finance", value: 2 },
  //   { label: "IT", value: 3 },
  //   { label: "Sales", value: 4 },
  // ];
  // var handleRoleChange = (selectedOption) => {
  // selectedOption;

  // onChange={(selectedOption) => {
  // newEmpRegValidation.setFieldValue("roleOptions", selectedOption);
  // console.log("role: " + roleOptions);
  //  console.log("role selected" + selectedOption);
  // console.log(JSON.stringify(selectedOption));
  // console.log(selectedOption.label);
  // const apiEndpoint =
  // selectedRole === "Manager"
  //   ? "api/Manager/CreateManager"
  //   : "api/Employee/CreateEmployee";

  // const Roleselected = selectedOption.label;
  // setRole = selectedOption.label === "Manager" ? true : false;
  // if (Roleselected === "Manager") {
  //   setRole = true;
  // }
  // === "Manager" ? "Manager" : "Employee";
  //  console.log("Role - " + Roleselected);
  // if (selectedOption.label === "Manager") {
  //   setRole = "Manager";
  // } else {
  //   setRole = "Employee";
  // }
  // console.log("Role" + role);
  // return Roleselected;
  // getDepartmentDetails(Roleselected);
  // };/*}

  // const handleDepartmentChange = (selectedOption) => {
  //   setSubdetails({ ...subdetails, department: selectedOption.value });
  // };

  const newEmpRegValidation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // empId: "",
      roleOptions: null,
      firstName: "",
      middleName: "",
      lastName: "",
      maritalStatus: "",
      gender: "",
      departmentId: null,
      // department: "",
      userName: "",
      mobileNumber: "",
      dob: "",
      dateOfJoining: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      roleOptions: Yup.object().shape({
        label: Yup.string().required("Please Select a Role"),
        value: Yup.string().required("Please Select a Role"),
      }),
      firstName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "First Name should contain only letters")
        .required("Please Enter the First name"),
      // middleName: Yup.string()
      //   .matches(/^[A-Za-z\s]+$/, "Middle Name should contain only letters")
      //   .required("Please Enter the Middle name"),

      lastName: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Last Name should contain only letters")
        .required("Please Enter the Last name"),

      // if (!document.querySelector('Input[name="gender"]:checked')) {
      //   // Handle error, e.g., display an error message
      //   alert('Please select a gender.');
      //   return;
      // }
      // maritalStatus: Yup.string().required("Marital status is required"),

      departmentId: Yup.object().shape({
        label: Yup.string().required("Please Select a Department"),
        value: Yup.string().required("Please Select a Department"),
      }),
      maritalStatus: Yup.object().shape({
        label: Yup.string().required("Please Select a maritalStatus"),
        value: Yup.string().required("Please Select a maritalStatus"),
      }),
      gender: Yup.object().shape({
        label: Yup.string().required("Please Select a gender"),
        value: Yup.string().required("Please Select a gender"),
      }),

      userName: Yup.string()
        .email("Enter a Valid Email ID")
        .required("Please Enter the UserEmailID"),
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

    onSubmit: async (values) => {
      if (newEmpRegValidation.isValid) {
        console.log("save validation true");
        // setSubdetails(values);
        setSubdetails({
          ...values,
          email: values.userName,
          departmentId: values.departmentId.value,
          gender: values.gender.label,
          maritalStatus: values.maritalStatus.label,
        });
        // const Subdetails = {
        //   firstName: values.firstName,
        //   middleName: values.middleName,
        //   lastName: values.lastName,
        //   department: values.department,
        //   email: values.email,
        //   mobileNumber: values.mobileNumber,
        //   dob: values.dob,
        //   dateOfJoining: values.dateOfJoining,
        //   password: values.password,
        //   confirmPassword: values.confirmPassword,
        // };
        setActiveTab(2);
        console.log("save toggle to emp address");
        console.log(subdetails);
      }
    },
  });
  const EmpAddressRegValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      country: "",
      state: "",
      city: "",
      street: "",
      homeNo: "",
      postalCode: "",
      landMark: "",
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
      country: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Country Name should contain only letters")
        .required("Please Enter the Country name"),
      state: Yup.string()
        .matches(/^[A-Za-z\s]+$/, " State Name should contain only letters")
        .required("Please Enter the State name"),
      city: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "City Name should contain only letters")
        .required("Please Enter City name"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const selectedRole = subdetails.roleOptions.label;
      // const selecteddepartmentId = subdetails.departmentId.value;
      // if (!maritalStatus) {
      //   // Handle error, e.g., display an error message
      //   // alert("Please select material status.");
      //   console.log("Please select material status.");
      //   return;
      // }
      const apiEndpoint =
        selectedRole === "Manager"
          ? "api/Manager/CreateManager"
          : "api/Employee/CreateEmployee";
      try {
        const detailsresponse = await postApiData(
          apiEndpoint,
          JSON.stringify(subdetails)
        );
        console.log("Newly added emp/manager details" + detailsresponse);
        // const mappedResponse = detailsresponse.data.map((item, index) => ({
        //   uId: item.uId,
        //   // index: index + 1,
        //   // sno: item.id,
        //   // name: item.firstName,
        //   // email: item.email,
        //   // // email: item.userName,
        //   // department: item.departments,

        //   //console.log("employee details "+response.data);
        // }));
        // setIsUid(mappedResponse||[]);

        if (detailsresponse.success === true) {
          toast.success(
            `${
              selectedRole === "Manager" ? "Manager" : "Employee"
            } Details saved Successfully`,
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
          const uId = detailsresponse.data.uId;
          console.log(uId);

          // const selectedRole = subdetails.roleOptions.label;
          console.log("****" + detailsresponse);
          // setSubdetails({ ...values, email: values.userName });
          const combinedvalues = { ...values, uId };
          const addressresponse = await postApiData(
            "api/Address/CreateAddress",
            JSON.stringify(combinedvalues)
          );
          // const addressresponse = await postApiData(
          //   "api/Address/CreateAddress",
          //   JSON.stringify(values)
          // );
          if (addressresponse.success === true) {
            toast.success(" Address Saved Successfully", {
              position: "top-right",
              autoClose: 3000,
            });

            resetForm();
            toggle();
            // setSubmitting(true);

            newEmpRegValidation.resetForm();
            setActiveTab(1);
            //newly added on 05/0824 to handle error in toggle form
            // getDepartmentDetails();
          } else {
            // toast.error(`${response.message}`,{
            toast.error(`${addressresponse.message}`, {
              position: "top-right",
              autoClose: 3000,
            });
          }

          // Additional actions after successful employee details save (optional)
        } else {
          toast.error(`${detailsresponse.message}`, {
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

  const [activeTab, setActiveTab] = useState(1);
  const handlePrevious = () => {
    setActiveTab(1);
  };

  useEffect(() => {
    console.log(roleOptions.value);
    console.log(newEmpRegValidation.values);
    console.log(newEmpRegValidation.errors);
  }, [newEmpRegValidation.values]);
  useEffect(() => {
    getDepartmentDetails();
    // getNoManagerDeptDetails();
  }, [newEmpRegValidation.values.roleOptions]);

  return (
    <>
      <ToastContainer closeButton={false} limit={1} />

      <Modal
        size="lg"
        isOpen={isOpen}
        // role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          toggle();

          // EmpAddressRegValidation.resetForm();
        }}
        // toggle={toggle}
        onClosed={() => {
          EmpAddressRegValidation.resetForm();
        }}
      >
        <div className="modal-content">
          <ModalHeader
          //  {/* toggle={toggle}*/}
          //changes on 1208 toggle
          // toggle={() => {
          //   toggle();

          // EmpAddressRegValidation.resetForm();
          //  }}
          >
            Employee Registration
            <span
              className="icon close_icon"
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => toggle()}
            >
              X
            </span>
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
                      // className={activeTab === "1" ? "active" : ""}
                      className={classnames({ current: activeTab === 1 })}
                      color={activeTab === 1 ? "primary" : "secondary"}
                      style={{
                        backgroundColor: activeTab === 1 ? "#5e2ced" : "",
                        // backgroundColor: activeTab === 1 ? "#007bff" : "",
                        color: activeTab === 1 ? "#fff" : "",
                      }}
                      onClick={() => setActiveTab(1)}
                      // style={{ backgroundColor: "#9060ff" }}
                      // #5e2ced
                    >
                      EmpDetails
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className={classnames({ current: activeTab === 2 })}
                    mx-20
                  >
                    <NavLink
                      // className={activeTab === "2" ? "active" : ""}
                      className={classnames({ current: activeTab === 2 })}
                      color={activeTab === 2 ? "primary" : "secondary"}
                      style={{
                        backgroundColor: activeTab === 2 ? "#5e2ced" : "",

                        // backgroundColor: activeTab === 2 ? "#007bff" : "",
                        color: activeTab === 2 ? "#fff" : "",
                      }}
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
                            <Label for="roleOptions">Select the Role:</Label>

                            <ReactSelect
                              name="roleOptions"
                              placeholder="Select the Role"
                              id="roleOptions"
                              options={roleOptions}
                              value={newEmpRegValidation.values.roleOptions}
                              // onChange={handleRoleChange}
                              onChange={(selectedOption) => {
                                newEmpRegValidation.setFieldValue(
                                  "roleOptions",
                                  selectedOption
                                );
                              }}
                              invalid={
                                newEmpRegValidation.touched.roleOptions &&
                                newEmpRegValidation.errors.roleOptions
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.values.roleOptions === null &&
                              newEmpRegValidation.touched.roleOptions &&
                              newEmpRegValidation.errors.roleOptions && (
                                <span
                                  className="text-danger"
                                  style={{ fontSize: "80%" }}
                                >
                                  Please Select a Role
                                </span>
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

                            {/*} //   invalid={!!newEmpRegValidation.errors.firstName}
                            // />

                            // {newEmpRegValidation.errors.firstName && (
                            //   <FormFeedback type="invalid">
                            //     {newEmpRegValidation.errors.firstName}
                            //   </FormFeedback>
                            // )}*/}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="middleName">Middle name</Label>
                            {/* <RequiredAsterisk /> */}
                            <Input
                              name="middleName"
                              placeholder="Enter the Middle name"
                              type="text"
                              id="middleName"
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
                              placeholder="Enter the Last name"
                              type="text"
                              id="lastName"
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
                            <RequiredAsterisk />

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
                              value={newEmpRegValidation.values.dob}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.dob}
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
                        {/* <div> */}
                        {/* <Col md="6">
                          <FormGroup className="mb-3">
                            <h2>
                              Maritial Status <RequiredAsterisk />
                            </h2>
                            <br></br>
                            <Label style={{ marginRight: "10px" }}>
                              <Input
                                type="radio"
                                id="maritalStatus"
                                value="single"
                                checked={maritalStatus === "single"}
                                onChange={handleMaritalStatusChange}
                                required
                              />
                              Single
                            </Label>
                            <Label>
                              <Input
                                type="radio"
                                value="married"
                                checked={maritalStatus === "married"}
                                onChange={handleMaritalStatusChange}
                                required
                              />
                              Married
                            </Label>

                            {maritalStatusError && (
                              <span
                                style={{ color: "red", fontWeight: "bold" }}
                              >
                                {maritalStatusError}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        {/* Add more options as needed */}
                        {/* </div> */}
                        {/* <Col md="6">
                          <FormGroup className="mb-3">
                            <h2>
                              Gender <RequiredAsterisk />
                            </h2>
                            <br></br>
                            <Label style={{ marginRight: "10px" }}>
                              <Input
                                type="radio"
                                id="gender"
                                value="male"
                                checked={genderStatus === "male"}
                                onChange={handleGenderStatusChange}
                                required
                              />
                              Male
                            </Label>
                            <Label>
                              <Input
                                type="radio"
                                value="Female"
                                checked={genderStatus === "Female"}
                                onChange={handleGenderStatusChange}
                                required
                              />
                              Female
                            </Label>

                            {genderStatusError && (
                              <span className="error">{genderStatusError}</span>
                            )}
                          </FormGroup>
                        </Col>{" "}
                        */}
                        {/* {role === "Employee" && ( */}
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label for="departmentId">
                              Select the Department:
                            </Label>
                            <RequiredAsterisk />

                            <ReactSelect
                              name="departmentId"
                              placeholder="Select the Department"
                              id="departmentId"
                              // options={deptoptions}
                              options={departDetails}
                              value={newEmpRegValidation.values.departmentId}
                              // onChange={handleDepartmentChange}
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

                        {/* {role === "Manager" && (
                          <Col md="6">
                            <FormGroup className="mb-3">
                              <Label for="departmentId">
                                Select the Department:
                              </Label>
                              <RequiredAsterisk />

                              <ReactSelect
                                name="departmentId"
                                placeholder="Select the Department"
                                id="departmentId"
                                // options={deptoptions}
                                options={noManDeptDetails}
                                value={newEmpRegValidation.values.departmentId}
                                // onChange={handleDepartmentChange}
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
                              />
                              {newEmpRegValidation.values.departmentId ===
                                null &&
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
                        )} */}
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
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="userName">UserName</Label>
                            <RequiredAsterisk />
                            <Input
                              name="userName"
                              placeholder="Enter the UserEmailID"
                              type="email"
                              id="userName"
                              value={newEmpRegValidation.values.userName}
                              onChange={newEmpRegValidation.handleChange}
                              onBlur={newEmpRegValidation.handleBlur}
                              invalid={
                                newEmpRegValidation.touched.userName &&
                                newEmpRegValidation.errors.userName
                                  ? true
                                  : false
                              }
                            />
                            {newEmpRegValidation.touched.userName &&
                            newEmpRegValidation.errors.userName ? (
                              <FormFeedback type="invalid">
                                {newEmpRegValidation.errors.userName}
                              </FormFeedback>
                            ) : null}
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
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          type="submit"
                          style={{ backgroundColor: "#5e2ced" }}
                          // color="primary"
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
                              value={EmpAddressRegValidation.values.homeNo}
                              onBlur={EmpAddressRegValidation.handleBlur}
                              onChange={EmpAddressRegValidation.handleChange}
                              invalid={
                                EmpAddressRegValidation.touched.homeNo &&
                                EmpAddressRegValidation.errors.homeNo
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.homeNo &&
                            EmpAddressRegValidation.errors.homeNo ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.homeNo}
                              </FormFeedback>
                            ) : null}
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
                              invalid={
                                EmpAddressRegValidation.touched.street &&
                                EmpAddressRegValidation.errors.street
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.street &&
                            EmpAddressRegValidation.errors.street ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.street}
                              </FormFeedback>
                            ) : null}
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
                              invalid={
                                EmpAddressRegValidation.touched.city &&
                                EmpAddressRegValidation.errors.city
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.city &&
                            EmpAddressRegValidation.errors.city ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.city}
                              </FormFeedback>
                            ) : null}
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
                              invalid={
                                EmpAddressRegValidation.touched.state &&
                                EmpAddressRegValidation.errors.state
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.state &&
                            EmpAddressRegValidation.errors.state ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.state}
                              </FormFeedback>
                            ) : null}
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
                              invalid={
                                EmpAddressRegValidation.touched.country &&
                                EmpAddressRegValidation.errors.country
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.country &&
                            EmpAddressRegValidation.errors.country ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.country}
                              </FormFeedback>
                            ) : null}
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
                              value={EmpAddressRegValidation.values.postalCode}
                              onBlur={EmpAddressRegValidation.handleBlur}
                              onChange={EmpAddressRegValidation.handleChange}
                              invalid={
                                EmpAddressRegValidation.touched.postalCode &&
                                EmpAddressRegValidation.errors.postalCode
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.postalCode &&
                            EmpAddressRegValidation.errors.postalCode ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.postalCode}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup className="mb-3">
                            <Label htmlFor="landMark"> LandMark</Label>
                            {/* <RequiredAsterisk /> */}
                            <Input
                              name="landMark"
                              placeholder="Enter the LandMark Name"
                              type="text"
                              id="landMark"
                              value={EmpAddressRegValidation.values.landMark}
                              onBlur={EmpAddressRegValidation.handleBlur}
                              onChange={EmpAddressRegValidation.handleChange}
                              invalid={
                                EmpAddressRegValidation.touched.landMark &&
                                EmpAddressRegValidation.errors.landMark
                                  ? true
                                  : false
                              }
                            />
                            {EmpAddressRegValidation.touched.landMark &&
                            EmpAddressRegValidation.errors.landMark ? (
                              <FormFeedback type="invalid">
                                {EmpAddressRegValidation.errors.landMark}
                              </FormFeedback>
                            ) : null}
                          </FormGroup>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          // color="primary"
                          // type="submit"
                          style={{ backgroundColor: "#5e2ced" }}
                          disabled={activeTab === 1}
                          onClick={handlePrevious}
                          className="mx-1"
                        >
                          Previous
                        </Button>
                        <Button
                          onClick={EmpAddressRegValidation.handleSubmit}
                          style={{ backgroundColor: "#5e2ced" }}
                          type="submit"
                          // color="primary"
                          className="mx-1"
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

export default AddEmployee;

// export default EmpRegNav;

// import React from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormFeedback,
//   Row,
//   Col,
// } from "reactstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const AddEmployee = ({ isOpen, toggle }) => {
//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("Please Enter First Name"),
//     middleName: Yup.string(),
//     lastName: Yup.string().required("Please Enter Last Name"),
//     email: Yup.string()
//       .email("Invalid Email Address")
//       .required("Please Enter Email"),
//     mobileNumber: Yup.string()
//       .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number")
//       .required("Please Enter Mobile Number"),
//     country: Yup.string().required("Please Enter Country"),
//     city: Yup.string().required("Please Enter City"),
//     state: Yup.string().required("Please Enter State"),
//     dob: Yup.date().required("Please Enter Date of Birth"),
//     dateOfJoining: Yup.date().required("Please Enter Date of Joining"),
//     address: Yup.string().required("Please Enter Address"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters long")
//       .required("Please Enter Password"),
//   });

//   const initialValues = {
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     mobileNumber: "",
//     country: "",
//     city: "",
//     state: "",
//     dob: "",
//     dateOfJoining: "",
//     address: "",
//     password: "",
//   };

//   const handleSubmit = (values, { setSubmitting, resetForm }) => {
//     console.log("Employee added:", values);
//     setSubmitting(false);
//     resetForm();
//     toggle();
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: handleSubmit,
//   });

//   return (
//     <Modal isOpen={isOpen} toggle={toggle} centered>
//       <ModalHeader toggle={toggle}>Add Employee</ModalHeader>
//       <ModalBody>
//         <Form onSubmit={formik.handleSubmit}>
//           <Row form>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="firstName">First Name</Label>
//                 <Input
//                   type="text"
//                   id="firstName"
//                   {...formik.getFieldProps("firstName")}
//                   invalid={formik.touched.firstName && formik.errors.firstName}
//                 />
//                 {formik.touched.firstName && formik.errors.firstName && (
//                   <FormFeedback>{formik.errors.firstName}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="lastName">Last Name</Label>
//                 <Input
//                   type="text"
//                   id="lastName"
//                   {...formik.getFieldProps("lastName")}
//                   invalid={formik.touched.lastName && formik.errors.lastName}
//                 />
//                 {formik.touched.lastName && formik.errors.lastName && (
//                   <FormFeedback>{formik.errors.lastName}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row form>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="email">Email</Label>
//                 <Input
//                   type="email"
//                   id="email"
//                   {...formik.getFieldProps("email")}
//                   invalid={formik.touched.email && formik.errors.email}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                   <FormFeedback>{formik.errors.email}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="mobileNumber">Mobile Number</Label>
//                 <Input
//                   type="text"
//                   id="mobileNumber"
//                   {...formik.getFieldProps("mobileNumber")}
//                   invalid={
//                     formik.touched.mobileNumber && formik.errors.mobileNumber
//                   }
//                 />
//                 {formik.touched.mobileNumber && formik.errors.mobileNumber && (
//                   <FormFeedback>{formik.errors.mobileNumber}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row form>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="country">Country</Label>
//                 <Input
//                   type="text"
//                   id="country"
//                   {...formik.getFieldProps("country")}
//                   invalid={formik.touched.country && formik.errors.country}
//                 />
//                 {formik.touched.country && formik.errors.country && (
//                   <FormFeedback>{formik.errors.country}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="city">City</Label>
//                 <Input
//                   type="text"
//                   id="city"
//                   {...formik.getFieldProps("city")}
//                   invalid={formik.touched.city && formik.errors.city}
//                 />
//                 {formik.touched.city && formik.errors.city && (
//                   <FormFeedback>{formik.errors.city}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row form>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="state">State</Label>
//                 <Input
//                   type="text"
//                   id="state"
//                   {...formik.getFieldProps("state")}
//                   invalid={formik.touched.state && formik.errors.state}
//                 />
//                 {formik.touched.state && formik.errors.state && (
//                   <FormFeedback>{formik.errors.state}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="dob">Date of Birth</Label>
//                 <Input
//                   type="date"
//                   id="dob"
//                   {...formik.getFieldProps("dob")}
//                   invalid={formik.touched.dob && formik.errors.dob}
//                 />
//                 {formik.touched.dob && formik.errors.dob && (
//                   <FormFeedback>{formik.errors.dob}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row form>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="dateOfJoining">Date of Joining</Label>
//                 <Input
//                   type="date"
//                   id="dateOfJoining"
//                   {...formik.getFieldProps("dateOfJoining")}
//                   invalid={
//                     formik.touched.dateOfJoining && formik.errors.dateOfJoining
//                   }
//                 />
//                 {formik.touched.dateOfJoining &&
//                   formik.errors.dateOfJoining && (
//                     <FormFeedback>{formik.errors.dateOfJoining}</FormFeedback>
//                   )}
//               </FormGroup>
//             </Col>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="address">Address</Label>
//                 <Input
//                   type="text"
//                   id="address"
//                   {...formik.getFieldProps("address")}
//                   invalid={formik.touched.address && formik.errors.address}
//                 />
//                 {formik.touched.address && formik.errors.address && (
//                   <FormFeedback>{formik.errors.address}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row form>
//             <Col md={6}>
//               <FormGroup>
//                 <Label for="password">Password</Label>
//                 <Input
//                   type="password"
//                   id="password"
//                   {...formik.getFieldProps("password")}
//                   invalid={formik.touched.password && formik.errors.password}
//                 />
//                 {formik.touched.password && formik.errors.password && (
//                   <FormFeedback>{formik.errors.password}</FormFeedback>
//                 )}
//               </FormGroup>
//             </Col>
//           </Row>
//         </Form>
//       </ModalBody>
//       <ModalFooter>
//         <Button
//           color="primary"
//           onClick={formik.handleSubmit}
//           disabled={formik.isSubmitting}
//         >
//           Add Employee
//         </Button>
//         <Button color="secondary" onClick={toggle}>
//           Cancel
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default AddEmployee;
