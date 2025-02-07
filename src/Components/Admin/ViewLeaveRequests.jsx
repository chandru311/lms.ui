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
  ModalHeader,
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
import LeaveRequestModal from "./LeaveRequestModal.jsx";

const LeaveRequestsDashboard = () => {
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [isLeaveReqModalOpen, setIsLeaveReqModalOpen] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState(null);
  const [docFormat, setDocFormat] = useState("");
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [proofDoc, setproofDoc] = useState(null);
  const [docDetails, setDocDetails] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isEmp, setIsEmp] = useState(false);
  const { leaveTypes, getLeaveTypes } = useLeaveTypes();

  const getPendingLeaveDetails = async () => {
    try {
      const authUser = await JSON.parse(sessionStorage.getItem("authUser"));
      const userType = authUser?.userType;
      const apiEndpoint =
        userType === 2
          ? "api/Leave/GetLeavesByManager?leaveStatus=1"
          : "api/Leave/GetleavesByStatus?leaveStatus=1";
      setIsLoading(true);
      const response = await getApiData(apiEndpoint);
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
      setPendingLeaveRequests(mappedResponse);
    } catch (error) {
      console.error("Error fetching pending leaves:", error);
    }
  };

  const tog_leaveReq = () => setIsLeaveReqModalOpen(!isLeaveReqModalOpen);

  const getCurrentUserType = async () => {
    try {
      const authUser = await JSON.parse(sessionStorage.getItem("authUser"));
      const userType = authUser?.userType;
      const bAdmin = userType === 1;
      const bManager = userType === 2;
      const bEmp = userType === 3;
      setIsAdmin(bAdmin);
      setIsManager(bManager);
      setIsEmp(bEmp);
    } catch (error) {
      console.error("Error getting user type:", error);
    }
  };

  const viewLeaveRequestDetails = async (leaveReqId) => {
    try {
      if (leaveReqId !== null) {
        const response = await getApiData(
          `api/Leave/GetLeaveById/${leaveReqId}`
        );
        let mappedResponse = {
          leaveId: response.data?.leaveId || "",
          uId: response.data?.uId || "",
          uName: response.data?.userName || "",
          leaveTypeId: response.data?.leaveTypeId || "",
          fromDate: response.data?.fromDate || "",
          toDate: response.data?.toDate || "",
          reason: response.data?.reason || "",
          comments: "",
          proof: response.data?.proof || "",
        };
        console.log("Mapped response " + JSON.stringify(mappedResponse));
        setLeaveRequest(mappedResponse);
        getDocDetails(leaveReqId);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getDocDetails = async (leaveReqId) => {
    try {
      if (leaveReqId !== null) {
        const response = await getApiData(
          `api/LeaveDocuments/GetDocByLeaveId/${leaveReqId}`
        );
        console.log(response.data);
        if (response.data !== null) {
          setDocDetails(response.data);
          setDocFormat(response.data.contentType);
          if (response.data.length === 0) {
            setproofDoc(false);
          } else {
            setproofDoc(true);
          }
        } else {
          setproofDoc(false);
          setDocDetails([]);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getCurrentUserType();
    getLeaveTypes();
    getPendingLeaveDetails();
  }, []);

  useEffect(() => {
    console.log("leave Request: ", leaveRequest);
    if (leaveRequest) tog_leaveReq();
  }, [leaveRequest]);

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
                className="btn-sm btn-rounded"
                style={{
                  marginRight: "5px",
                  marginBottom: "5px",
                  backgroundColor: "#5e2ced",
                  border: "none",
                  color: "white",
                }}
                onClick={() => {
                  setViewMode(true);
                  console.log("View Mode " + viewMode);
                  viewLeaveRequestDetails(cellProps.row.original.leaveId);
                  getDocDetails(cellProps.row.original.leaveId);
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
                  viewLeaveRequestDetails(cellProps.row.original.leaveId);
                  getDocDetails(
                    cellProps.row.original.leaveId,
                    cellProps.row.original.proof
                  );
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer
            containerId="container1"
            closeButton={false}
            limit={1}
          />
          <div className="page-title-box p-4">
            <h4 className="mb-sm-0 font-size-18">Leave Requests</h4>
          </div>

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

          {isLeaveReqModalOpen && (
            <LeaveRequestModal
              isOpen={isLeaveReqModalOpen}
              toggle={tog_leaveReq}
              viewMode={viewMode}
              leaveRequest={leaveRequest}
              proofDoc={proofDoc}
              docDetails={docDetails}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};
export default LeaveRequestsDashboard;
