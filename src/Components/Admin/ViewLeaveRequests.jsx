import React, { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import Loader from '../../components/Common/Loader'
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  Row,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import Select from "react-select";
import { useFormik } from "formik";
import TableContainer from "../../Common/components/TableContainer";
import { getApiData, putApiData } from "../../Common/helpers/axiosHelper";
import {
  edit,
  view,
  deactivate,
  download,
  trash,
} from "../../Common/common/icons.js";
import { useLeaveTypes } from "../../Common/common/commonFunctions.js";

const LeaveRequestsDashboard = () => {
  const [allLeaveRequests, setAllLeaveRequests] = useState(null);
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState([]);
  const [docIsValid, setDocIsValid] = useState(false);
  const [docFormat, setDocFormat] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal_viewLeaveRequest, setModal_viewLeaveRequest] = useState(false);
  const [currentLeaveReqId, setCurrentLeaveReqId] = useState("");
  const [viewMode, setViewMode] = useState(false);
  const [proofDoc, setproofDoc] = useState(null);
  const [docDetails, setDocDetails] = useState([]);
  const { leaveTypes, getLeaveTypes } = useLeaveTypes();

  const getPendingLeaveDetails = async () => {
    setIsLoading(true);
    const response = await getApiData(
      `api/Leave/GetleavesByStatus?leaveStatus=1`
    );
    setIsLoading(false);
    console.log("leave details " + response.data);
    const mappedResponse = response.data.map((item, key) => ({
      index: key + 1,
      leaveId: item.leaveId,
      uId: item.uId,
      firstName: item.firstName + " " + item.lastName,
      leaveTypeId: item.leaveTypeId,
      userName: item.userName,
      leaveTypeName: item.leaveTypeName,
      fromDate: item.fromDate,
      toDate: item.toDate,
      status: item.status,
      proof: item.proof,
      reason: item.reason,
    }));
    console.log(mappedResponse);
    // setAllLeaveRequests(mappedResponse);
    // const pendingStatus = mappedResponse.filter((item) => item.status === 0);
    setPendingLeaveRequests(mappedResponse);
  };
  function tog_leaveReq() {
    setModal_viewLeaveRequest(!modal_viewLeaveRequest);
  }

  const handleClose = (event) => {
    event.stopPropagation(); // Prevent event bubbling if needed
    tog_leaveReq();
  };

  const viewLeaveRequestDetails = async (leaveReqId) => {
    try {
      if (leaveReqId != null) {
        const response = await getApiData(
          `api/Leave/GetLeaveById/${leaveReqId}`
        );
        setLeaveRequest(response.data);
      }
      tog_leaveReq();
    } catch (error) {
      alert(error);
    }
  };

  const leaveValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      leaveId: leaveRequest?.leaveId || null,
      uId: leaveRequest?.uId || null,
      uName: leaveRequest?.userName || null,
      // leaveTypeName: leaveRequest?.leaveTypeName || null,
      // leaveTypeName: leaveTypes.find(
      //   (option) => option.value === leaveRequest?.leaveTypeId
      // ),
      leaveTypeId:
        leaveTypes.find(
          (option) => option.value === leaveRequest?.leaveTypeId
        ) || null,
      fromDate: leaveRequest?.fromDate || "",
      toDate: leaveRequest?.toDate || "",
      reason: leaveRequest?.reason || "",
      comments: "",
      proof: leaveRequest?.proof || "",
    },
    validationSchema: Yup.object({
      // comments: Yup.string().required("Please enter a valid comment"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("button clicked");
      if (values.leaveId > 0) {
        if (
          JSON.stringify(values) ===
          JSON.stringify(leaveValidation.initialValues)
        ) {
          toast.info("No changes to save", {
            position: "top-right",
            autoClose: 1000,
          });
          resetForm();
          tog_leaveReq();
          window.location.reload();
          return;
        }
        try {
          setIsLoading(true);
          const leaveTypeValue = values.leaveTypeId && values.leaveTypeId.value;
          // const uIdValue = values.uId && values.uId.value;
          const combinedValues = {
            ...values,
            leaveId: leaveRequest.leaveId,
            leaveTypeId: leaveTypeValue,
            proof: fileData,
          };
          const response = await putApiData(
            `api/Leave/UpdateLeave/${leaveRequest.leaveId}`,
            JSON.stringify(combinedValues)
          );
          if (response.success === true) {
            toast.success("Leave Request Updated", {
              position: "top-right",
              autoClose: 1000,
            });
            setIsLoading(false);
            resetForm();
            tog_leaveReq();
            const timer = setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch (error) {
          console.error("Error updating leave request", error);
          toast.error("Failed to update leave request", {
            position: "top-right",
            autoClose: 2000,
          });
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  const getDocDetails = async (leaveReqId, proof) => {
    try {
      if (leaveReqId !== null) {
        const response = await getApiData(
          `api/LeaveDocuments/GetDocByLeaveId/${leaveReqId}`
        );
        console.log(response.data);
        if (response.data !== null) {
          setDocDetails(response.data);
          setDocFormat(response.data.contentType);
          if (proof !== null && docDetails !== null) {
            setproofDoc(true);
            setFileData(proof);
          } else {
            setproofDoc(false);
          }
        } else {
          setDocDetails([]);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

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

  const viewDoc = (base64String, contentType = "png") => {
    //  const data = viewResponse[index];
    const docData = {
      contentType: contentType,
      document: base64String,
      documentName: "test",
    };
    handleDownloadFile(docData, false);
  };

  const handleDownloadFile = (data, bDownload) => {
    // const data = viewResponse[index];
    const byteChars = atob(data.document);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);

    if (bDownload) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `${data.documentName}.${
        data.contentType !== null ? data.contentType : "png"
      }`;
      link.click();
    } else {
      window.open(imageUrl, "_blank");
    }

    URL.revokeObjectURL(imageUrl);
  };

  useEffect(() => {
    getLeaveTypes();
    getPendingLeaveDetails();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Employee Name",
        accessor: "firstName",
        filterable: false,
        disableFilters: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : "";
        },
      },
      {
        Header: "UserName",
        accessor: "userName",
        filterable: false,
        disableFilters: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : "";
        },
      },
      {
        Header: "LeaveType",
        accessor: "leaveTypeName",
        filterable: false,
        disableFilters: true,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : "";
        },
      },
      {
        Header: "Leave Start Date",
        accessor: "fromDate",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : "";
        },
      },
      {
        Header: "Leave End Date",
        accessor: "toDate",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return cellProps.value ? cellProps.value : "";
        },
      },
      //   {
      //     Header: "Reason",
      //     accessor: "reason",
      //     disableFilters: true,
      //     filterable: false,
      //     Cell: (cellProps) => {
      //       return cellProps.value ? cellProps.value : "";
      //     },
      //   },
      //   {
      //     Header: "Supporting Docs",
      //     accessor: "proof",
      //     disableFilters: true,
      //     filterable: false,
      //     Cell: (cellProps) => {
      //       return cellProps.value ? cellProps.value : "";
      //     },
      //   },
      {
        Header: "Action",
        accessor: "status",
        disableFilters: true,
        filterable: false,
        Cell: (cellProps) => {
          return (
            <>
              <Button
                type="button"
                color="primary"
                className="btn-sm btn-rounded"
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={() => {
                  setViewMode(true);
                  console.log("View Mode " + viewMode);
                  setLeaveRequest(cellProps.row.original);
                  getDocDetails(
                    cellProps.row.original.leaveId,
                    cellProps.row.original.proof
                  );

                  tog_leaveReq();
                  // viewLeaveRequestDetails(cellProps.row.original.leaveId);
                }}
              >
                {view()}
              </Button>
              <Button
                type="button"
                color="success"
                className="btn-sm btn-rounded"
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={() => {
                  console.log("View Mode before edit " + viewMode);
                  setViewMode(false);
                  console.log("View Mode " + viewMode);
                  setLeaveRequest(cellProps.row.original);
                  tog_leaveReq();
                  // viewLeaveRequestDetails(cellProps.row.original.leaveId);
                }}
              >
                {edit()}
              </Button>
            </>
          );
        },
      },
    ],
    []
  );

  const approveOrRejectLeave = async (flag, currentLeaveReqId) => {
    try {
      const data = { status: flag };
      // console.log("Agent ID to approve " + approveAgentUid);
      const response = await putApiData(
        `api/Leave/Approve_Reject/${currentLeaveReqId}`,
        JSON.stringify(data)
      );
      if (response.success === true) {
        if (flag === "2") {
          toast.success("Leave Request approved", {
            position: "top-right",
            autoClose: 2000,
          });
          tog_leaveReq();
          getPendingLeaveDetails();
          const timer = setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } else {
        toast.success("Leave Request Rejected", {
          position: "top-right",
          autoClose: 2000,
        });
        tog_leaveReq();
        getPendingLeaveDetails();
        const timer = setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer closeButton={false} limit={1} />
          <div className="page-title-box p-4">
            <h4 className="mb-sm-0 font-size-18">Leave Requests</h4>
          </div>
          <Modal
            isOpen={modal_viewLeaveRequest}
            toggle={() => {
              tog_leaveReq();
            }}
            name="Apply Leave"
            size="lg"
          >
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title mt-0" id="myModalLabel">
                View the leave Requests
              </h5>
            </div>
            <Card className="overflow-hidden">
              <div className="modal-body">
                <Form
                  className="needs-validation"
                  onSubmit={leaveValidation.handleSubmit}
                >
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="uName">UserName</Label>
                        <Input
                          type="input"
                          name="userName"
                          id="userName"
                          value={leaveValidation.values.uName}
                          disabled={true}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.uName}
                        >
                          {leaveValidation.errors.uName && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.uName}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="leaveTypeId">Leave Type</Label>
                        <Select
                          name="leaveTypeId"
                          id="leaveTypeId"
                          value={leaveValidation.values.leaveTypeId}
                          onChange={(selectedOption) => {
                            leaveValidation.setFieldValue(
                              "leaveTypeId",
                              selectedOption
                            );
                          }}
                          options={leaveTypes}
                          isDisabled={viewMode}
                        ></Select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3"></div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="fromDate" className="text-left">
                          Leave start Date
                        </Label>
                        <Input
                          type="date"
                          name="fromDate"
                          id="fromDate"
                          value={leaveValidation.values.fromDate}
                          disabled={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.fromDate}
                        >
                          {leaveValidation.errors.fromDate && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.fromDate}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="toDate" className="text-left">
                          Leave End Date
                        </Label>
                        <Input
                          type="date"
                          name="toDate"
                          id="toDate"
                          value={leaveValidation.values.toDate}
                          disabled={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.toDate}
                        >
                          {leaveValidation.errors.toDate && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.toDate}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="reason">Reason for Leave</Label>
                        <Input
                          type="textarea"
                          name="reason"
                          id="reason"
                          rows={5}
                          placeholder="Provide the reason for leave"
                          value={leaveValidation.values.reason}
                          disabled={viewMode}
                          onBlur={leaveValidation.handleBlur}
                          onChange={leaveValidation.handleChange}
                          invalid={!!leaveValidation.errors.reason}
                        >
                          {leaveValidation.errors.reason && (
                            <FormFeedback type="invalid">
                              {leaveValidation.errors.reason}
                            </FormFeedback>
                          )}
                        </Input>
                      </div>
                    </Col>
                    <Col lg="6">
                      <div className="mb-3">
                        <Label for="leaveDocs" hidden={viewMode}>
                          Upload Supporting Docs
                        </Label>
                        <div className="col-md-12">
                          <Input
                            hidden={viewMode}
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

                      <div className="mb-3">
                        {proofDoc && (
                          <Label for="viewleaveDocs" hidden={!viewMode}>
                            Supporting Docs:
                            <div className="mt-3">
                              <p>
                                <small>
                                  Click to view/download the document(s)
                                </small>
                              </p>
                              <Row>
                                <div>
                                  <a
                                    href=""
                                    onClick={() => viewDoc(fileData, false)}
                                  >
                                    Document 1
                                  </a>
                                  <i
                                    class="icon"
                                    className="m-2"
                                    style={{ color: "green" }}
                                    onClick={() => viewDoc(fileData, true)}
                                  >
                                    {download()}
                                  </i>
                                  <i
                                    class="icon"
                                    className="m-2"
                                    style={{ color: "red" }}
                                  >
                                    {trash()}
                                  </i>
                                  {/* <Button
                                    type="button"
                                    color="primary"
                                    className="btn-sm btn-rounded mx-2 ml-2"
                                    onClick={() => viewDoc(fileData, true)}
                                  >
                                    {download()}
                                  </Button> */}
                                </div>
                              </Row>
                            </div>
                          </Label>
                        )}
                      </div>
                    </Col>
                    <div className="mb-3">
                      <Label for="comments" hidden={!viewMode}>
                        {" "}
                        Approver Comments
                      </Label>
                      <Input
                        type="textarea"
                        name="comments"
                        id="comments"
                        rows={2}
                        placeholder="Please provide comments if any!"
                        value={leaveValidation.values.comments || null}
                        hidden={!viewMode}
                        // value={formData.reason}
                        // onChange={handleChange}
                      />
                    </div>
                  </Row>
                </Form>
                <Row>
                  <div className="d-flex justify-content-center">
                    <Button
                      type="button"
                      className="btn m-3"
                      style={{
                        backgroundColor: "#5e2ced",
                        color: "white",
                        border: "none",
                      }}
                      hidden={!viewMode}
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log("Approve button clicked");
                        approveOrRejectLeave("2", leaveRequest.leaveId);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      className="btn m-3"
                      style={{
                        backgroundColor: "#5e2ced",
                        color: "white",
                        border: "none",
                      }}
                      hidden={!viewMode}
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log("Reject button clicked");
                        approveOrRejectLeave("3", leaveRequest.leaveId);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      // type="submit"
                      className="btn m-3"
                      style={{
                        backgroundColor: "#5e2ced",
                        color: "white",
                        border: "none",
                      }}
                      hidden={viewMode}
                      onClick={() => {
                        // event.stopPropagation();
                        console.log("Save Changes clicked");
                        leaveValidation.handleSubmit();
                      }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      className="btn m-3"
                      style={{
                        backgroundColor: "#5e2ced",
                        color: "white",
                        border: "none",
                      }}
                      onClick={handleClose}
                      // hidden={viewMode}
                      // disabled={staffValidation.isSubmitting}
                    >
                      Close
                    </Button>
                  </div>
                </Row>
              </div>
            </Card>
          </Modal>

          <Card>
            <CardBody>
              <TableContainer
                columns={columns}
                data={pendingLeaveRequests}
                isGlobalFilter={true}
                customPageSize={10}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default LeaveRequestsDashboard;
