import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Label,
  Row,
  Container,
  CardBody,
  FormFeedback,
  FormGroup,
} from "reactstrap";
import RequiredAsterisk from "../../Common/components/RequiredAsterisk";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { getApiData, postApiData } from "../../Common/helpers/axiosHelper";
import Select from "react-select";
import { useLeaveTypes } from "../../Common/common/commonFunctions.js";
import { userRole } from "../../Common/common/commonFunctions.js";

const ApplyLeaveModal = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveTypeOptions, setLeaveTypeOptions] = useState([]);
  const [uNameOptions, setuNameOptions] = useState([]);
  const navigate = useNavigate();
  const { leaveTypes, getLeaveTypes } = useLeaveTypes();
  const [docIsValid, setDocIsValid] = useState(true);
  const [docFormat, setDocFormat] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isEmp, setIsEmp] = useState(false);

  const leaveValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      uId: 0,
      leaveTypeId: null,
      fromDate: "",
      toDate: "",
      reason: "",
      // proof: null,
    },
    validationSchema: Yup.object({
      uId: Yup.object().shape({
        label: Yup.string().required("Please Select a userName"),
        value: Yup.string().required("Please Select a userName"),
      }),
      leaveTypeId: Yup.object().shape({
        label: Yup.string().required("Please Select a leaveType"),
        value: Yup.string().required("Please Select a leaveType"),
      }),
      fromDate: Yup.string().required("Please select the leave start date"),
      toDate: Yup.string().required("Please select the leave end date"),
      reason: Yup.string().required("Please provide the reason for the leave"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("button clicked");
      const leaveTypeValue = values.leaveTypeId && values.leaveTypeId.value;
      const uIdValue = values.uId && values.uId.value;

      // setIsLoading(true);
      const combinedValues = {
        ...values,
        uId: uIdValue,
        leaveTypeId: leaveTypeValue,
      };
      const response = await postApiData(
        "api/Leave/ApplyLeave",
        JSON.stringify(combinedValues)
      );
      if (response.success === true) {
        if (fileData !== null) {
          const docValues = {
            leaveId: response.data.leaveId,
            document: fileData,
            contentType: docFormat,
          };
          const docResponse = await postApiData(
            "api/LeaveDocuments",
            JSON.stringify(docValues)
          );
          if (docResponse.success === true) {
            toast.success("Leave Request Submitted", {
              position: "top-right",
              autoClose: 2000,
            });
            setIsLoading(false);
            resetForm();
          } else if (docResponse.success === false) {
            toast.error("Document upload failed, please retry", {
              position: "top-right",
              autoClose: 2000,
            });
          } else {
            toast.error(response.message, {
              position: "top-right",
              autoClose: 2000,
            });
          }
        } else {
          toast.success("Leave Request Submitted", {
            position: "top-right",
            autoClose: 2000,
          });
          setIsLoading(false);
          resetForm();
        }
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 2000,
        });
        resetForm();
        setIsLoading(false);
      }
      const timer = setTimeout(() => {
        navigate("/admin-dashboard");
      }, 3000);
    },
  });

  const uploadDoc = async (docValues) => {
    const docResponse = await postApiData(
      "api/LeaveDocuments",
      JSON.stringify(docValues)
    );
    console.log("document upload" + docResponse.success);
  };

  // const getLeaveTypes = async () => {
  //   setIsLoading(true);
  //   const response = await getApiData(`api/LeaveType`);
  //   setIsLoading(false);
  //   console.log("leave details " + response.data);
  //   const leaveTypesList = response.data.map((item, key) => ({
  //     value: item.leaveTypeId,
  //     label: item.name,
  //   }));
  //   console.log(leaveTypesList);
  //   setLeaveTypeOptions(leaveTypesList);
  // };

  const getUserList = async () => {
    setIsLoading(true);
    const response = await getApiData(`api/Employee/GetAllEmployees`);
    setIsLoading(false);
    console.log("emp details " + response.data);
    const mappedResponse = response.data.map((item, key) => ({
      value: item.uId,
      label: item.firstName + " " + item.lastName + "(" + item.userName + ")",
    }));
    const newList = [{ value: 0, label: "Self" }, ...mappedResponse];
    console.log(newList);
    setuNameOptions(newList);
  };

  const getCurrentUserType = async () => {
    const authUser = await JSON.parse(sessionStorage.getItem("authUser"));
    const userType = authUser?.userType;
    switch (userType) {
      case 1:
        setIsAdmin(true);
      case 2:
        setIsManager(true);
      case "jpeg":
        setIsEmp(true);
    }
  };

  useEffect(() => {
    getCurrentUserType();
    getLeaveTypes();
    getUserList();
  }, []);

  function handleFileChange(e) {
    setDocIsValid(true);
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5000 * 1024) {
      toast.error("File Size Should be less than 5MB", {
        position: "top-right",
        autoClose: 3000,
      });
      // leaveValidation.resetForm();
      setDocIsValid(false);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const type = reader.result.split(";")[0];
      const docType = type.split("/")[1];
      let base64String = "";
      const indexOfComma = reader.result.indexOf(",");
      if (indexOfComma !== -1) {
        base64String = reader.result.substring(indexOfComma + 1);
      }
      setDocFormat(docType);
      setFileData(base64String);
    };
    reader.readAsDataURL(file);
  }

  const getFileType = (contentType) => {
    switch (contentType) {
      case "png":
        return "image/png";
      case "jpg":
        return "image/jpg";
      case "jpeg":
        return "image/jpeg";
      case "pdf":
        return "application/pdf";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      default:
        return "application/octet-stream";
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    leaveValidation.setFieldValue(name, value);
  };

  const handleclick = (event) => {
    console.log("clicked");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluId>
          <ToastContainer closeButton={false} limit={1} />
          <Card className="overflow-hidden mt-7 mb-3">
            <CardBody>
              <div className="modal-header d-flex justify-content-between">
                <h1 className="mt-0 mb-3 fw-bold">Leave Application Form</h1>
              </div>

              <Card className="overflow-hidden">
                <div className="form-body">
                  <Form
                    className="needs-validation pt-4 pb-2 px-3"
                    onSubmit={leaveValidation.handleSubmit}
                  >
                    <Row>
                      {isAdmin && (
                        <Col lg="6">
                          <div className="mb-3">
                            <Label for="empID">
                              Username
                              <RequiredAsterisk />
                            </Label>
                            <Select
                              name="uId"
                              id="empID"
                              onChange={(selectedOption) => {
                                leaveValidation.setFieldValue(
                                  "uId",
                                  selectedOption
                                );
                              }}
                              onBlur={() =>
                                leaveValidation.setFieldTouched("uId", true)
                              }
                              disabled={isLoading}
                              value={leaveValidation.values.uId}
                              invalid={!!leaveValidation.errors.uId}
                              options={uNameOptions}
                            />
                            {leaveValidation.touched.uId &&
                            leaveValidation.errors.uId ? (
                              <FormFeedback type="invalid">
                                {leaveValidation.errors.uId}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      )}
                      <Col lg="6">
                        <div className="mb-3">
                          <Label for="leaveType">
                            Leave Type
                            <RequiredAsterisk />
                          </Label>
                          <Select
                            name="leaveType"
                            id="leaveTypeId"
                            onChange={(selectedOption) => {
                              leaveValidation.setFieldValue(
                                "leaveTypeId",
                                selectedOption
                              );
                            }}
                            onBlur={() =>
                              leaveValidation.setFieldTouched(
                                "leaveTypeId",
                                true
                              )
                            }
                            disabled={isLoading}
                            value={leaveValidation.values.leaveTypeId}
                            invalid={!!leaveValidation.errors.leaveTypeId}
                            options={leaveTypes}
                          />
                          {leaveValidation.touched.leaveTypeId &&
                          leaveValidation.errors.leaveTypeId ? (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.leaveTypeId}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label for="startDate" className="text-left">
                            Leave start Date
                            <RequiredAsterisk />
                          </Label>
                          <Input
                            type="date"
                            name="fromDate"
                            id="startDate"
                            onBlur={leaveValidation.handleBlur}
                            disabled={isLoading}
                            onChange={handleInputChange}
                            value={leaveValidation.values.fromDate || ""}
                            invalid={!!leaveValidation.errors.fromDate}
                          />
                          {leaveValidation.touched.fromDate &&
                          leaveValidation.errors.fromDate ? (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.fromDate}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label for="endDate" className="text-left">
                            Leave End Date
                            <RequiredAsterisk />
                          </Label>
                          <Input
                            type="date"
                            name="toDate"
                            id="endDate"
                            onBlur={leaveValidation.handleBlur}
                            disabled={isLoading}
                            value={leaveValidation.values.toDate || ""}
                            onChange={handleInputChange}
                            invalid={!!leaveValidation.errors.toDate}
                          />
                          {leaveValidation.touched.toDate &&
                          leaveValidation.errors.toDate ? (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.toDate}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label for="reason">
                            Reason for Leave
                            <RequiredAsterisk />
                          </Label>
                          <Input
                            type="textarea"
                            name="reason"
                            id="reason"
                            rows={5}
                            placeholder="Provide the reason for leave"
                            onBlur={leaveValidation.handleBlur}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            value={leaveValidation.values.reason || ""}
                            invalid={!!leaveValidation.errors.reason}
                          />
                          {leaveValidation.touched.reason &&
                          leaveValidation.errors.reason ? (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.reason}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg="6">
                        <div className="mb-3">
                          <Label for="leaveDocs">Upload Supporting Docs</Label>
                          <div className="col-md-12">
                            <Input
                              type="file"
                              id="document"
                              aria-label="Upload"
                              accept=".png, .jpg, .jpeg, .pdf"
                              aria-describedby="inputGroupFileAddon04"
                              onChange={(e) => {
                                handleFileChange(e);
                                leaveValidation.handleChange(e);
                              }}
                              onBlur={leaveValidation.handleBlur}
                              invalid={
                                leaveValidation.touched.proof &&
                                leaveValidation.errors.proof
                                  ? true
                                  : false
                              }
                            />
                            {leaveValidation.touched.proof &&
                            leaveValidation.errors.proof ? (
                              <FormFeedback type="invalid">
                                {leaveValidation.errors.proof}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                  <Row>
                    <div className="mt-4 mb-3 text-center">
                      <Button
                        // type="submit"
                        style={{
                          backgroundColor: "#5e2ced",
                          color: "white",
                          border: "none",
                        }}
                        onClick={() => {
                          leaveValidation.handleSubmit();
                        }}
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
  );
};

export default ApplyLeaveModal;
