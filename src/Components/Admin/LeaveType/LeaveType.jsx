import React, { useState, useEffect } from "react";
import { Button, Card, Container, CardBody, CardTitle } from "reactstrap";
import TableContainer from "../../../Common/components/TableContainer.jsx";
import Loader from "../../../Common/components/Loader.jsx";
import { ToastContainer, toast } from "react-toastify";
import { getApiData } from "../../../Common/helpers/axiosHelper.js";
import { edit, trash, view } from "../../../Common/common/icons";
import LeaveTypeForm from "./LeaveTypeForm.jsx";
import axios from "axios";
import Swal from "sweetalert2";

const LeaveType = () => {
  const [leaveState, setLeaveState] = useState({
    leaveTypes: [],
    isLoading: false,
    isModalOpen: false,
    modalMode: "",
    leaveTypeDetail: null,
  });

  const toggle = () => {
    setLeaveState((prevState) => ({
      ...prevState,
      isModalOpen: !leaveState.isModalOpen,
    }));
  };

  const fetchLeaveTypes = async () => {
    const response = await getApiData("api/LeaveType");
    const mappedResponse = response.data.map((data) => ({
      leaveTypeId: data.leaveTypeId,
      name: data.name,
      noOfDays: data.noOfDays,
      active: data.active,
    }));
    setLeaveState((prevState) => ({
      ...prevState,
      leaveTypes: mappedResponse,
    }));
  };

  const openModal = async (leaveTypeId, mode) => {
    const response = await getApiData(`${leaveTypeId}`);
    setLeaveState((prevState) => ({
      ...prevState,
      leaveTypeDetail: response.data,
      modalMode: mode,
      isModalOpen: true,
    }));
  };

  const changeDeactivate = async (leaveTypeId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#5e2ced",
      cancelButtonColor: "#eb3b3b",
      confirmButtonText: "Yes Deactivate",
      cancelButtonText: "cancel",
      width: "300px",
    });

    if (result.isConfirmed) {
      const response = await axios.delete(`api/LeaveType/${leaveTypeId}`);
      if (response.data.success) {
        toast.success("Leave successfully deactivated", {
          position: "top-right",
          autoClose: 2000,
        });
        fetchLeaveTypes();
      } else {
        toast.error(`${response.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const handleAdd = () => {
    setLeaveState((prevState) => ({
      ...prevState,
      leaveTypeDetail: null,
      modalMode: "add",
      isModalOpen: true,
    }));
  };

  const columns = [
    {
      Header: "Leave Name",
      accessor: "name",
    },
    {
      Header: "No of Days",
      accessor: "noOfDays",
    },
    {
      Header: "Actions",
      disableFilters: true,
      accessor: "actions",
      Cell: ({ row }) => {
        const leaveType = row.original;

        return (
          <>
            <Button
              type="button"
              style={{ background: "#5e2ced", borderColor: "#5e2ced" }}
              aria-label="view"
              className="btn-sm btn-rounded mr-1 mb-1"
              onClick={() => {
                openModal(leaveType.leaveTypeId, "view");
              }}
            >
              {view()}
            </Button>
            <Button
              type="button"
              color="success"
              className="btn-sm btn-rounded mr-1 mb-1"
              onClick={() => openModal(leaveType.leaveTypeId, "edit")}
            >
              {edit()}
            </Button>
            <Button
              type="button"
              color="danger"
              className="btn-sm btn-rounded mr-1 mb-1"
              onClick={() => changeDeactivate(leaveType.leaveTypeId)}
            >
              {trash()}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Container fluid>
      <LeaveTypeForm
        toggle={toggle}
        leaveState={leaveState}
        getAllLeaveTypes={fetchLeaveTypes}
      />
      <Card style={{ marginTop: "20px" }}>
        <CardBody>
          <div className="mb-4 h4 mt-4 card-title">Leave Types</div>
          <div className="text-sm-end mb-2">
            <Button
              type="button"
              style={{
                backgroundColor: "#5e2ced",
                color: "white",
                border: "none",
              }}
              onClick={handleAdd}
            >
              Add Leave Type
            </Button>
          </div>

          {leaveState.isLoading ? (
            <Loader />
          ) : (
            <>
              <TableContainer
                columns={columns}
                data={leaveState.leaveTypes}
                isGlobalFilter={true}
                customPageSize={10}
              />
              {leaveState.leaveTypes.length < 1 && (
                <div>
                  <p>No Records to Show</p>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default LeaveType;
