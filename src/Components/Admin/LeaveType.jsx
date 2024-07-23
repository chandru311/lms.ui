import React, { useState, useEffect } from "react";
import { Button, Card, Container, CardBody } from "reactstrap";
import TableContainer from "../../Common/components/TableContainer.jsx";
import Loader from "../../Common/components/Loader.jsx";
import { view, edit, deactivate } from "../../Common/common/icons.js";
import AddLeaveType from "../Admin/AddLeaveType.jsx";

const LeaveType = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isAddLeaveTypeModalOpen, setIsAddLeaveTypeModalOpen] = useState(false);
  const [viewLeaveTypeModalOpen, setViewLeaveTypeModalOpen] = useState(false);
  const [deactivateLeaveTypeModalOpen, setDeactivateLeaveTypeModalOpen] =
    useState(false);
  const [editLeaveTypeModalOpen, setEditLeaveTypeModalOpen] = useState(false);
  const [leaveTypeDetails, setLeaveTypeDetails] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  // const fetchLeaveTypes = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await getApiData("api/LeaveType");
  //     setLeaveTypes(response.data);
  //   } catch (error) {
  //     console.error("Error fetching leave types:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchLeaveTypes();
  // }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleAddLeaveTypeModal = () => {
    setIsAddLeaveTypeModalOpen(!isAddLeaveTypeModalOpen);
  };

  const toggleViewLeaveTypeModal = () => {
    setViewLeaveTypeModalOpen(!viewLeaveTypeModalOpen);
  };

  const toggleEditLeaveTypeModal = () => {
    setEditLeaveTypeModalOpen(!editLeaveTypeModalOpen);
  };

  const toggleDeactivateLeaveTypeModal = () => {
    setDeactivateLeaveTypeModalOpen(!deactivateLeaveTypeModalOpen);
  };

  const handleView = (leaveTypeDetails) => {
    setLeaveTypeDetails(leaveTypeDetails);
    toggleViewLeaveTypeModal();
  };

  const handleEdit = (leaveTypeDetails) => {
    setLeaveTypeDetails(leaveTypeDetails);
    toggleEditLeaveTypeModal();
  };

  const handleDeactivate = (leaveTypeDetails) => {
    setLeaveTypeDetails(leaveTypeDetails);
    toggleDeactivateLeaveTypeModal();
  };

  const handleDeactivateConfirm = (leaveTypeDetails) => {
    console.log("Deactivating leave type:", leaveTypeDetails);
  };

  const handleSave = (updatedLeaveType) => {
    console.log("Updated leave type:", updatedLeaveType);
  };

  const data = [
    { leavename: "Casual Leave", noofdays: "3" },
    { leavename: "Sick Leave", noofdays: "5" },
  ];

  const columns = [
    {
      Header: "Leave Name",
      accessor: "leavename",
      filterable: false,
      disableFilters: true,
    },
    {
      Header: "No of Days",
      accessor: "noofdays",
      filterable: false,
      disableFilters: true,
    },
    {
      Header: "Actions",
      disableFilters: true,
      accessor: "actions",
      Cell: (cellProps) => (
        <React.Fragment>
          <Button
            type="button"
            color="primary"
            className="btn-sm btn-rounded"
            title="View"
            style={{ marginRight: "5px" }}
            aria-label="view"
            onClick={() => handleView(cellProps.row.original)}
          >
            {view()}
          </Button>

          <Button
            type="button"
            color="success"
            className="btn-sm btn-rounded"
            title="Edit"
            style={{ marginRight: "5px" }}
            onClick={() => handleEdit(cellProps.row.original)}
          >
            {edit()}
          </Button>

          <Button
            type="button"
            color="danger"
            className="btn-sm btn-rounded"
            title="Deactivate"
            onClick={() => handleDeactivate(cellProps.row.original)}
          >
            {deactivate()}
          </Button>
        </React.Fragment>
      ),
    },
  ];

  return (
    <Container fluid>
      <div className="page-title-box p-4">
        <h4 className="mb-sm-0 font-size-18">Leave Type</h4>
      </div>
      <Card>
        <CardBody>
          <div className="text-sm-end mb-3">
            <Button
              type="button"
              color="primary"
              onClick={toggleAddLeaveTypeModal}
              className="me-2"
            >
              Add Leave Type
            </Button>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <TableContainer
              columns={columns}
              data={data}
              isGlobalFilter={true}
              isAddOptions={false}
              customPageSize={10}
              isPageSelect={false}
            />
          )}

          <AddLeaveType
            isOpen={isAddLeaveTypeModalOpen}
            toggle={toggleAddLeaveTypeModal}
          />
        </CardBody>
      </Card>
    </Container>
  );
};

export default LeaveType;
