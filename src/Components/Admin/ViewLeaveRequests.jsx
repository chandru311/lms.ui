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
import { edit, view, deactivate } from "../../Common/common/icons.js";
import { useLeaveTypes } from "../../Common/common/commonFunctions.js";

const LeaveRequestsDashboard = () => {
  const [allLeaveRequests, setAllLeaveRequests] = useState(null);
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState([]);
  //   {
  //   uId: null,
  //   userName: null,
  //   leaveTypeName: null,
  //   leaveTypeId: null,
  //   fromDate: null,
  //   toDate: null,
  //   reason: "",
  // });
  const [isLoading, setIsLoading] = useState(false);
  const [modal_viewLeaveRequest, setModal_viewLeaveRequest] = useState(false);
  const [currentLeaveReqId, setCurrentLeaveReqId] = useState("");
  const [viewMode, setViewMode] = useState(false);
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
      leaveTypeName: leaveTypes.find(
        (option) => option.value === leaveRequest?.leaveTypeId
      ),
      leaveTypeId:
        leaveTypes.find(
          (option) => option.value === leaveRequest?.leaveTypeId
        ) || null,
      fromDate: leaveRequest?.fromDate || null,
      toDate: leaveRequest?.toDate || null,
      reason: leaveRequest?.reason || null,
      comments: "",
    },
    validationSchema: Yup.object({
      comments: Yup.string().required("Please enter a valid comment"),
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
            autoClose: 3000,
          });
          return;
        }
        try {
          setIsLoading(true);
          const leaveTypeValue = values.leaveTypeId && values.leaveTypeId.value;
          const uIdValue = values.uId && values.uId.value;
          const combinedValues = {
            ...values,
            leaveId: leaveRequest.leaveId,
            uId: uIdValue,
            leaveTypeId: leaveTypeValue,
          };
          const response = await putApiData(
            "api/Leave/UpdateLeave",
            JSON.stringify(combinedValues)
          );
        } catch (error) {
          console.error("Error updating Agent data:", error);
          toast.error("Failed to update Agent details", {
            position: "top-right",
            autoClose: 2000,
          });
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

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

  const approveOrRejectLeave = async (flag) => {
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
          getPendingLeaveDetails();
        } else {
          toast.success("Leave Request Rejected", {
            position: "top-right",
            autoClose: 2000,
          });
          getPendingLeaveDetails();
        }
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
                  onSubmit={(e) => {
                    leaveValidation.handleSubmit();
                  }}
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
                        <Label for="leaveType">Leave Type</Label>
                        <Select
                          name="leaveTypeId"
                          id="leaveTypeId"
                          value={leaveValidation.values.leaveTypeName}
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
                        <Label for="startDate" className="text-left">
                          Leave start Date
                        </Label>
                        <Input
                          type="date"
                          name="startDate"
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
                        <Input
                          type="file"
                          //   onChange={FileUpload}
                          className="mb-3"
                          disabled={viewMode}
                          hidden={viewMode}
                        />
                      </div>
                      <div className="mb-3">
                        <Label for="viewleaveDocs" hidden={!viewMode}>
                          Supporting Docs:
                        </Label>
                      </div>
                      <div hidden={!viewMode}>
                        <p>Document Name: {leaveValidation.values.uName}</p>
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
                          approveOrRejectLeave("2");
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
                          approveOrRejectLeave("3");
                        }}
                      >
                        Reject
                      </Button>
                      <Button
                        type="button"
                        className="btn m-3"
                        style={{
                          backgroundColor: "#5e2ced",
                          color: "white",
                          border: "none",
                        }}
                        hidden={viewMode}
                        onClick={(event) => {
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
                </Form>
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
