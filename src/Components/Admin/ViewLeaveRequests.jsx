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
  const [docIsValid, setDocIsValid] = useState(false);
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
      // setAllLeaveRequests(mappedResponse);
      // const pendingStatus = mappedResponse.filter((item) => item.status === 0);
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

      // getUserList(userType);
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

  const leaveValidation = useFormik({
    enableReinitialize: true,
    initialValues: {
      leaveId: leaveRequest?.leaveId || null,
      uId: leaveRequest?.uId || null,
      uName: leaveRequest?.userName || null,
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
          // if (proof !== null && docDetails !== null) {

          //   setFileData(proof);
          // } else {
          //   setproofDoc(false);
          // }
        } else {
          setproofDoc(false);
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

  const delDoc = async (index) => {
    const data = docDetails[index];
    const response = await putApiData(
      `api/LeaveDocuments/ActivateDeactivate/${data.docId}?isActive=false`
    );
  };
  const viewDoc = (index, bDownbload) => {
    const data = docDetails[index];
    handleDownloadFile(data, bDownbload);
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
      link.download = `${data.documentName || "document"}.${
        data.contentType !== null ? data.contentType : "png"
      }`;
      link.click();
    } else {
      window.open(imageUrl, "_blank");
    }

    URL.revokeObjectURL(imageUrl);
  };

  useEffect(() => {
    getCurrentUserType();
    getLeaveTypes();
    getPendingLeaveDetails();
  }, []);

  useEffect(() => {
    console.log("leave Request: ", leaveRequest); //[Avengers, Fast X, Batman]
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
                color="primary"
                className="btn-sm btn-rounded"
                style={{ marginRight: "5px", marginBottom: "5px" }}
                onClick={() => {
                  setViewMode(true);
                  console.log("View Mode " + viewMode);
                  viewLeaveRequestDetails(cellProps.row.original.leaveId);
                  // setLeaveRequest(cellProps.row.original);
                  getDocDetails(cellProps.row.original.leaveId);

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
                  viewLeaveRequestDetails(cellProps.row.original.leaveId);
                  getDocDetails(
                    cellProps.row.original.leaveId,
                    cellProps.row.original.proof
                  );
                  // setLeaveRequest(cellProps.row.original);
                  // tog_leaveReq();
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ToastContainer closeButton={false} limit={1} />
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

          <LeaveRequestModal
            isOpen={isLeaveReqModalOpen}
            toggle={tog_leaveReq}
            viewMode={viewMode}
            leaveRequest={leaveRequest}
            proofDoc={proofDoc}
            docDetails={docDetails}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};
export default LeaveRequestsDashboard;
